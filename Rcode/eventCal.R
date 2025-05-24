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
}

conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
power_score <- NA
graph = startGraph("http://localhost:7474/db/data/", username="neo4j", password="welcome")
		if(!is.na(questionId)){
			query1 <- paste("MATCH (n{event_id:", event_id, "}),(n{question_id:", questionId, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
		}else{
		    query1 <- paste("MATCH (n{event_id:", event_id, "})-[r:CONNECTED]->(m) WHERE NOT EXISTS(n.connection_type) RETURN ID(n) as from, ID(m) as to;")
			#query1 <- paste("MATCH (n{event_id:", event_id, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
		}
			#if(is.null(id)){
			#	query1 <- paste("MATCH (n{event_id:", event_id, "}) OPTIONAL MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED]->(m) RETURN ID(n) as from, ID(m) as to;")
			#}else{
			#	query1 <- paste("MATCH p=(n{event_id:", event_id, "})-[r:CONNECTED*2]-(m) where ID(n)=",id," RETURN ID(n) as from, ID(m) as to;")
			#}
			edges <- cypher(graph, query1)
			if(!is.null(edges)){
				edges[is.na(edges)] <- NA
				nodes = data.frame(id=unique(c(edges$from, edges$to)))
				ig <- graph_from_data_frame(edges, directed=TRUE)
				ig <- delete.edges(ig, which(E(ig)$to==NA))
				ig <- delete.vertices(ig, which(V(ig)$name=="NA"))
				V(ig)$between = estimate_betweenness(ig, V(ig), directed = TRUE, cutoff=5)
				V(ig)$eigenc = eigen_centrality(ig, directed = TRUE)$vector
				V(ig)$Outdegree = degree(ig, mode="out")
				V(ig)$PI= round((V(ig)$eigenc * V(ig)$between)/V(ig)$Outdegree, 2)
				PMax= max(V(ig)$PI, na.rm=TRUE)
				PMin= min(V(ig)$PI, na.rm=TRUE)
				V(ig)$power_score= round(((V(ig)$PI*(9/(PMax-PMin)))+1), 1)
				distanceTable <- distances(ig)
				V(ig)$maxDistance <- apply(X=distanceTable, MARGIN=1, function(x) max(x[is.finite(x)]))
				diameter <- diameter(ig, directed = FALSE)
				V(ig)$cluster_cofficient <- transitivity(ig, type = c("local"), vids=V(ig))
				V(ig)$degree = degree(ig)
				V(ig)$Indegree = degree(ig, mode="in")
				V(ig)$firstDegree <- neighborhood.size(ig, 1, mode="all")-1
				V(ig)$secondDegree <- neighborhood.size(ig, 2, mode="all")-V(ig)$firstDegree-1
				mutual_edges <- lapply(V(ig), function(x) which_mutual(ig, es = E(ig)[from(x) | to(x)]))
				df <- data.frame(Vertex=names(mutual_edges), 
							 Edges=unlist(lapply(V(ig), function(x) length(E(ig)[from(x)]) )), 
							 no_mutual=unlist(lapply(mutual_edges, function(x) sum(x)/2)))
				Exceldata <- toVisNetworkData(ig)
				Exceldata$nodes$Mutual= df$no_mutual
				Exceldata$nodes$Reciprocity= (df$no_mutual/df$Edges)
				Exceldata$nodes$Help = Exceldata$nodes$Outdegree/Exceldata$nodes$Reciprocity
				#Delete Event Data if already saved
				query <- sprintf("DELETE FROM %s WHERE event_id = %d", "event_nodes", as.integer(event_id))
				rs <- try(dbSendQuery(conn, query))
				query <- sprintf("DELETE FROM %s WHERE event_id = %d", "event_edges", as.integer(event_id))
				rs <- try(dbSendQuery(conn, query))
				#Save Edges to database
				if(nrow(Exceldata$edges)>0){
					edgesOut <- data.frame(event_id=event_id, from_node=Exceldata$edges$from, to_node=Exceldata$edges$to)
					RMySQL::dbWriteTable(conn,name = "event_edges",value = edgesOut,append=T,row.names = F)
				}
				
				#after simplification
				ig <- as.undirected(ig, mode = "each")
				ig <- simplify(ig, remove.multiple=TRUE, remove.loops=TRUE)
				clusters <- cluster_fast_greedy(ig)
				V(ig)$group = clusters$membership
				
				community= data.frame(group=V(ig)$group)
				# Save nodes data to database
				nodeOutput <- data.frame(event_id=event_id, neo4jId=Exceldata$nodes$id, degree=Exceldata$nodes$degree, Indegree=Exceldata$nodes$Indegree, Outdegree=Exceldata$nodes$Outdegree, mutual=Exceldata$nodes$Mutual, betweeness=Exceldata$nodes$between, eigenc=Exceldata$nodes$eigenc, power_score=Exceldata$nodes$power_score, Reciprocity=Exceldata$nodes$Reciprocity, community=community$group, cluster_cofficient=Exceldata$nodes$cluster_cofficient, firstDegree=Exceldata$nodes$firstDegree, secondDegree=Exceldata$nodes$secondDegree, help=Exceldata$nodes$Help, maxDistance=Exceldata$nodes$maxDistance)
				RMySQL::dbWriteTable(conn,name = "event_nodes",value = nodeOutput,append=T,row.names = F)
				
				
				edgeList <- get.edgelist(ig)
				E(ig)$source <- V(ig)[edgeList[,1]]$group
				E(ig)$target <- V(ig)[edgeList[,2]]$group
				remainingTarget = lapply(E(ig)$target, FUN=function(x) which(E(ig)$source!=E(ig)$target))
				if(length(remainingTarget)>0 && length(remainingTarget[[1]]) != 0){
					values= table(E(ig)[remainingTarget[[1]]]$target)
					group= as.data.frame(values, row.names=NULL)
					testData = data.frame(group= levels(group$Var1), count= group$Freq)
					groupData <- testData[rev(order(testData$count)), ]
					remainGroup <- (setdiff(unique(V(ig)$group),as.integer(groupData$group)))
					groupOrder <- c(as.integer(groupData$group), remainGroup)
				}else{
					groupOrder <- c(as.integer(unique(V(ig)$group)))
				}
				query <- "UPDATE events set communityOrder='#communityOrder#', diameter='#diameter#' WHERE id = #event_id#"
				communityOrder <- paste(groupOrder, collapse=",")
				query <- gsub(pattern = "#communityOrder#",replacement = communityOrder,x = query)
				query <- gsub(pattern = "#diameter#",replacement = diameter,x = query)
				query <- gsub(pattern = "#event_id#",replacement = as.integer(event_id),x = query)
				rs <- try(dbSendQuery(conn, query))
				RMySQL::dbDisconnect(conn)
				
				TotalNodes = gorder(ig)
				TotalEdges = gsize(ig)
				ReturnValue <- list(TotalNodes= TotalNodes, TotalEdges=TotalEdges, diameter=diameter, groupOrder=groupOrder)
				print(toJSON(ReturnValue))
				
			}
