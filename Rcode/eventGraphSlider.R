# # Prod config detail ------------------
mySQLUser <- "collab"
mySQLPwd <- "C0ll@2@Br!3k"
mySQLHost <- "localhost"
mySQLDBName <- "collab_prod"
rootFolder <- "/var/www/vhosts/collaboration/development-brickwin-ui/"

event_id <- commandArgs(trailingOnly = T)[1]
id <- commandArgs(trailingOnly = T)[2]
fullgraph <- commandArgs(trailingOnly = T)[3]
questionId <- commandArgs(trailingOnly = T)[4]
maptype <- commandArgs(trailingOnly = T)[5]
attId <- commandArgs(trailingOnly = T)[2]
attIds <- as.integer(unlist(strsplit(attId,",")))
#event_id <- 3597
#id <- NA
#fullgraph <- NA
library(igraph)
library(visNetwork)
library(RNeo4j)
library(rjson)
library(RMySQL)
if(id=='fullgraph'){
	questionId <- commandArgs(trailingOnly = T)[3]
	maptype <- commandArgs(trailingOnly = T)[4]
}

conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
dbSendQuery(conn, "SET NAMES utf8;")
power_score <- NA
graph = startGraph("http://localhost:7474/db/data/", username="neo4j", password="welcome")
	if(!is.na(questionId)){
		query1 <- paste("MATCH (n{event_id:", event_id, "}),(n{question_id:", questionId, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
	}else{
		query1 <- paste("MATCH (n{event_id:", event_id, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
	}
#query1 <- paste("MATCH (n{event_id:", event_id, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
			#if(is.null(id)){
			#	query1 <- paste("MATCH (n{event_id:", event_id, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
			#}else{
			#	query1 <- paste("MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED*2]-(m) where ID(n)=",id," RETURN ID(n) as from, ID(m) as to;")
			#}
			edges <- cypher(graph, query1)
			vector <- c()
			if(!is.na(attIds)){
				query3 <- sprintf("SELECT ga.neo4jId FROM %s as at left join graph_attendies as ga on ga.attendie_id=at.id WHERE at.event_id = %d AND at.id IN(%s) ", "attendies", as.integer(event_id),paste(noquote(attIds), collapse=", "))
				rs3 <- try(dbGetQuery(conn, query3))
				ames <- as.matrix(rs3)
			    for(i in 1:nrow(ames)) {
			        vector <- c(vector, ames[i])
			    }
			}
			for (i in 1:nrow(edges)) {
  
			  	if(edges$from[i] %in% vector){
					# edges$from[i] <- NA
			  	}else{
			  		edges$from[i] <- NA
			  	}
			  	if(edges$to[i] %in% vector){
					# edges$to[i] <- NA
			  	}else{
			  		edges$to[i] <- NA
			  	}
			}
			if(!is.null(edges)){
				edges[is.na(edges)] <- NA
				nodes = data.frame(id=unique(c(edges$from, edges$to)))
				ig <- graph_from_data_frame(edges, directed=TRUE)
				ig <- delete.edges(ig, which(E(ig)$to==NA))
				ig <- delete.vertices(ig, which(V(ig)$name=="NA"))

				V(ig)$between = estimate_betweenness(ig, V(ig), directed = TRUE, cutoff=5)
				V(ig)$eigenc = eigen_centrality(ig, directed = TRUE)$vector
				V(ig)$Outdegree = degree(ig, mode="out")
				V(ig)$Indegree = degree(ig, mode="in")
				# print(V(ig)$Outdegree);
				# print(V(ig)$eigenc);
				# print(V(ig)$between);
				# print(V(ig)$Indegree);
				V(ig)$PI= round((V(ig)$eigenc * V(ig)$between)/V(ig)$Outdegree, 2)
				# print(V(ig)$PI);
				
				PMax= max(V(ig)$PI, na.rm=TRUE)
				PMin= min(V(ig)$PI, na.rm=TRUE)
				V(ig)$power_score= round(((V(ig)$PI*(9/(PMax-PMin)))+1), 1)
				# v(ig)$power_score=c('2', '0', '0', '0', '0', '0', '6', '4', '0', '2', '0', '3', '0')
				# print(V(ig)$power_score);die;
				 # SecondDegree Calculation
				#after simplification
				ig <- as.undirected(ig, mode = "each")
				ig <- simplify(ig, remove.multiple=TRUE, remove.loops=TRUE)
				clusters <- cluster_fast_greedy(ig)
				V(ig)$group = clusters$membership
				V(ig)$label.cex = .5
				## SecondDegree Calculation1
				TotalNodes = gorder(ig)
				TotalEdges = gsize(ig)
				if(!is.na(id) && id!='fullgraph'){
					power_score <- vertex_attr(ig, "power_score", which(V(ig)$name==id))
					inde <- vertex_attr(ig, "Indegree", which(V(ig)$name==id))
					if(length(inde)==0 || is.na(inde)){
						inde <- 0
					}
					if(length(power_score)==0 || is.na(power_score)){		
						power_score <- 0		
					}		
					imageName = paste(event_id, id, sep="")
					if(!is.na(fullgraph) && fullgraph=="SecondDegree"){
						g <- tryCatch({
							neighbors(ig, id)
							}, error = function(err) {
								return(NULL)							
							})
						if(length(g)!=0 && !is.na(g)){
							list_of_edges <- E(ig)[from(g) | to(g)]
							d2 <- induced_subgraph(ig, g)
							d2 <- subgraph.edges(ig, list_of_edges)
							data <- toVisNetworkData(d2)
							
							nz <- match(data$edges$from, id) - .9
							nz[is.na(nz)] <- match(data$edges$to, id) - .9
							nz[is.na(nz)] <- NA
							data$edges$value <- nz
						}else{
							g <- NULL
							d2 <- make_empty_graph() + vertices(id)
							data <- toVisNetworkData(d2)
							data$nodes$value = 0
						}
					}else{
						imageName = event_id
						g <- NA
						data <- toVisNetworkData(ig)
					}
				}else{
					imageName = event_id
					g <- NA
					#lout <- layout.forceatlas2(ig, iterations=2000, plotstep=0)
					#lout <- qgraph.layout.fruchtermanreingold(as_edgelist(ig, names=F), vcount=vcount(ig), area=8*(vcount(ig)^2),repulse.rad=(vcount(ig)^3.1))
					data <- toVisNetworkData(ig)
					#data$nodes$x <- lout[,1]
					#data$nodes$y <- lout[,2]
				}
				query <- paste("MATCH (n) WHERE ID(n) IN [",paste(noquote(data$nodes$id), collapse=", "),"] RETURN n.first_name +' '+ n.last_name as name,n.linkedin_username as lnuser, n.image_path as image_path")
				nodesName <- cypher(graph, query)
				data$nodes$label= nodesName$name
				data$nodes$lnuser= nodesName$lnuser
				if(!is.null(data$nodes$power_score)){
					data$nodes$power_score[is.na(data$nodes$power_score)] <- 0
					data$nodes$power_score[is.infinite(data$nodes$power_score)] <- 0
				}else{
					data$nodes$power_score <- 0
				}
				
				if(!is.na(fullgraph) && fullgraph=="SecondDegree"){
					sz <- match(data$nodes$id, id) + 9 + data$nodes$power_score
					sz[is.na(sz)] <- 5 
					data$nodes$size <- sz + data$nodes$power_score
				}else{
					data$nodes$size <- 5 + data$nodes$power_score
				}
				data$nodes$image= paste0("https://teamsui-staging.collaboration.ai/uploads/attendies/" , nodesName$image_path)
				# select answers for tooltip
				query1 <- sprintf("SELECT a.answers, at.neo4jId, a.attendie_id, q.category_flag, q.id as question_id, e.user_unique_event_id FROM %s as a left join events as e on a.question_id=e.graph_question_id left join attendies as at on at.id=a.attendie_id left join questions as q on a.question_id=q.id WHERE e.id = %d AND at.neo4jId IN(%s)", "answers", as.integer(event_id), paste(noquote(data$nodes$id), collapse=", "))
				rs <- try(dbGetQuery(conn, query1))
				# print(data$nodes);
				Sys.setlocale("LC_ALL", 'en_US.UTF-8')
				if(nrow(rs) > 0){
					data$nodes <- merge(data$nodes, rs, by.x = "id", by.y = "neo4jId", all = TRUE)
				}
				
				if(nrow(rs) == 0){
					query2 <- sprintf("SELECT a.answers, ga.neo4jId, a.attendie_id, q.category_flag, q.id as question_id, e.user_unique_event_id FROM %s as a left join events as e on a.question_id=e.graph_question_id left join attendies as at on at.id=a.attendie_id left join questions as q on a.question_id=q.id  left join graph_attendies as ga on ga.attendie_id=a.attendie_id WHERE e.id = %d AND ga.neo4jId IN(%s)", "answers", as.integer(event_id), paste(noquote(data$nodes$id), collapse=", "))
					#rs1 <- dbSendQuery(conn, query1)
					
					rs <- try(dbGetQuery(conn,query2))
					data$nodes <- merge(data$nodes, rs, by.x = "id", by.y = "neo4jId", all = TRUE)
				}
				# print(data$nodes);
				if(nrow(rs)>0 && rs$category_flag[1]==5){
					#data$nodes$attendie_id <- ifelse(rs$neo4jId == as.integer(data$nodes$id), rs$attendie_id, 0)
					query2 <- sprintf("SELECT group_concat(concat_ws(' ', at.first_name, at.last_name) SEPARATOR ', ') as answers, a.attendie_id FROM %s as a left join attendies as at on FIND_IN_SET(at.id, a.answers) WHERE a.event_id = %d AND a.question_id=%d AND a.attendie_id IN(%s) group by a.attendie_id", "answers", as.integer(event_id), rs$question_id[1], paste(noquote(rs$attendie_id), collapse=", "))
					rs2 <- try(dbGetQuery(conn, query2))
					data$nodes <- merge(data$nodes, rs2, by.x = "attendie_id", by.y = "attendie_id", all = TRUE)
					data$nodes$answers <- substr(data$nodes$answers.y, 1, 80)
					substring(data$nodes$answers, 78) <- c("...") 
				}else if(nrow(rs)>0){
					data$nodes$answers = substr(data$nodes$answers, 1, 80)
					substring(data$nodes$answers, 78) <- c("...") 
				}else{
					query2 <- sprintf("SELECT e.user_unique_event_id FROM %s as e WHERE e.id = %d", "events", as.integer(event_id))
					rs <- try(dbGetQuery(conn, query2))
					data$nodes$answers <- NULL
				}
				# print(data$nodes);
				# die;
				RMySQL::dbDisconnect(conn)
				if(is.null(data$nodes$answers)){
					library(stringr)
					data$nodes$lnuser <- str_replace(gsub("\\s+", " ", str_trim(data$nodes$lnuser)), "B", "b")
					linkedin <- ifelse( data$nodes$lnuser !='' & !is.na(data$nodes$lnuser),paste0("<a href='",data$nodes$lnuser,"' target='_blank'><b>", "View LinkedIn Profile","</b></a><br>"),"")
                    data$nodes$title= paste("<p><a href='https://teamsui-staging.collaboration.ai/display/",rs$user_unique_event_id[1],"/SecondDegree/",data$nodes$id,"/' target='_blank'><b>", data$nodes$label,"</b></a><br> Power Score: ",data$nodes$power_score,"<br>",linkedin,"<span style=font-size:12px;color:black;font-weight:600>","Click name to see more details","</span>","</p>", sep="")

				}else{
                    data$nodes$title= paste("<p><a href='https://teamsui-staging.collaboration.ai/display/",rs$user_unique_event_id[1],"/SecondDegree/",data$nodes$id,"/' target='_blank'><b>", data$nodes$label,"</b></a><br>Power Score: ",data$nodes$power_score,"<br>", data$nodes$answers,"<br>","<span style=font-size:12px;color:black;font-weight:600>","Click name to see more details","</span>","</p>", sep="")
				}
				#data$nodes$title= paste("<p><a href='https://c8.ai/display/",rs$user_unique_event_id[1],"/SecondDegree/",data$nodes$id,"/' target='_blank'><b>", data$nodes$label,"</b></a><br>Power Score: ",data$nodes$power_score,"<br>", data$nodes$answers,"</p>", sep="")
				data$nodes$shape = "circularImage"
				ReturnValue <- list(imageName= imageName, power_score= power_score, TotalNodes= TotalNodes, TotalEdges=TotalEdges)
				print(toJSON(ReturnValue))
				if(is.null(g) || length(g)==0 || TotalNodes==1){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T))  %>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE) %>% visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=FALSE)
				}else if(!is.na(id) && id!='fullgraph' && !is.na(fullgraph) && fullgraph=="SecondDegree" && is.na(maptype) || is.null(maptype)){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visGroups(groupname = "26", color = "#FFD8AE") %>%
					visIgraphLayout(type='full') %>%
					visOptions(nodesIdSelection = list(enabled=TRUE, selected=id), highlightNearest= list(enabled=T))%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), borderWidthSelected = 5, font = list(size = 20))%>%
					visIgraphLayout(type='full') %>% 
					#visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"))
				}else if((id=='fullgraph' || fullgraph=="fullgraph") && !is.na(maptype) && !is.null(maptype) && maptype=="repulsion"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "repulsion", repulsion = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T))  %>%
					visClusteringByConnection(data$nodes)%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), font = list(size = 20))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=TRUE)
				}else if((id=='SecondDegree' || fullgraph=="SecondDegree") && !is.na(maptype) && !is.null(maptype) && maptype=="repulsion"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visGroups(groupname = "26", color = "#FFD8AE") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "repulsion", repulsion = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = list(enabled=TRUE, selected=id), highlightNearest= list(enabled=T))%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), borderWidthSelected = 5, font = list(size = 20))%>% 
					#visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"))
				}else if((id=='fullgraph' || fullgraph=="fullgraph") && !is.na(maptype) && !is.null(maptype) && maptype=="barnesHut"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "barnesHut", barnesHut = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T))  %>%
					visClusteringByConnection(data$nodes)%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), font = list(size = 20))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=TRUE)
				}else if((id=='SecondDegree' || fullgraph=="SecondDegree") && !is.na(maptype) && !is.null(maptype) && maptype=="barnesHut"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visGroups(groupname = "26", color = "#FFD8AE") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "barnesHut", barnesHut = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = list(enabled=TRUE, selected=id), highlightNearest= list(enabled=T))%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), borderWidthSelected = 5, font = list(size = 20))%>% 
					#visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"))
				}else if((id=='fullgraph' || fullgraph=="fullgraph") && !is.na(maptype) && !is.null(maptype) && maptype=="forceAtlas2Based"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T))  %>%
					visClusteringByConnection(data$nodes)%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), font = list(size = 20))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=TRUE)
				}else if((id=='SecondDegree' || fullgraph=="SecondDegree") && !is.na(maptype) && !is.null(maptype) && maptype=="forceAtlas2Based"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visGroups(groupname = "26", color = "#FFD8AE") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = list(enabled=TRUE, selected=id), highlightNearest= list(enabled=T))%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), borderWidthSelected = 5, font = list(size = 20))%>% 
					#visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"))
				}else if((id=='fullgraph' || fullgraph=="fullgraph") && !is.na(maptype) && !is.null(maptype) && maptype=="hierarchicalRepulsion"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "hierarchicalRepulsion", hierarchicalRepulsion = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T))  %>%
					visClusteringByConnection(data$nodes)%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), font = list(size = 20))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=TRUE)
				}else if((id=='SecondDegree' || fullgraph=="SecondDegree") && !is.na(maptype) && !is.null(maptype) && maptype=="hierarchicalRepulsion"){
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					visGroups(groupname = "26", color = "#FFD8AE") %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "hierarchicalRepulsion", hierarchicalRepulsion = list(gravitationalConstant = -10), stabilization = TRUE,maxVelocity = 25, minVelocity = 20)%>%
					visOptions(nodesIdSelection = list(enabled=TRUE, selected=id), highlightNearest= list(enabled=T))%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), borderWidthSelected = 5, font = list(size = 20))%>% 
					#visPhysics(solver = "forceAtlas2Based", forceAtlas2Based = list(gravitationalConstant = -10))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"))
				}else{
					visNetwork(nodes = data$nodes, edges = data$edges, width='100%', height="579") %>%
					visGroups(groupname = "1", color = "#f76565") %>%
					visGroups(groupname = "2", color = "#fff76d") %>%
					visGroups(groupname = "3", color = "#17A4B0") %>%
					visGroups(groupname = "4", color = "#e3a212") %>%
					visGroups(groupname = "5", color = "#00c200") %>%
					visGroups(groupname = "6", color = "#921ecd") %>%
					visGroups(groupname = "7", color = "#BDFF00") %>%
					visGroups(groupname = "8", color = "#B2B120") %>%
					visGroups(groupname = "9", color = "#000080") %>%
					visGroups(groupname = "10", color = "#F38692") %>%
					visGroups(groupname = "11", color = "#F11EEC") %>%
					visGroups(groupname = "12", color = "#B6B481") %>%
					visGroups(groupname = "13", color = "#FFC8DE") %>%
					visGroups(groupname = "14", color = "#1ecd92") %>%
					visGroups(groupname = "15", color = "#06A890") %>%
					visGroups(groupname = "16", color = "#808100") %>%
					visGroups(groupname = "17", color = "#B22020") %>%
					visGroups(groupname = "18", color = "#B09817") %>%
					visGroups(groupname = "19", color = "#311E11") %>%
					visGroups(groupname = "20", color = "#008B86") %>%
					visGroups(groupname = "21", color = "#A9372D") %>%
					visGroups(groupname = "22", color = "#FFBC3D") %>%
					visGroups(groupname = "23", color = "#B2ADA4") %>%
					visGroups(groupname = "24", color = "#C58063") %>%
					visGroups(groupname = "25", color = "#C9FFE5") %>%
					# visIgraphLayout(type='full') %>%
					visEdges(smooth = FALSE)%>%
					visPhysics(solver = "hierarchicalRepulsion", hierarchicalRepulsion = list(gravitationalConstant = -10), stabilization = TRUE)%>%
					visOptions(nodesIdSelection = TRUE, highlightNearest= list(enabled=T)) %>%
					visClusteringByConnection(data$nodes)%>%
					visInteraction(tooltipStyle = 'position: fixed;visibility:hidden;padding: 10px 15px 0px 15px;font-family: Verdana;font-size:14px;font-color:purple;background-color: #fff;border-radius: 24px;box-shadow: 0 4px 12px 4px rgba(240,190,211,.7);text-align:center',navigationButtons=TRUE)%>% 
					visNodes(shapeProperties = list(useBorderWithImage = TRUE), font = list(size = 20))%>%
					visSave(file = paste0(rootFolder,"webroot/uploads/graph/",trimws(imageName),".html"), selfcontained=TRUE)
				}
			}
