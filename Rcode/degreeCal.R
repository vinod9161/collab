mySQLUser <- "collab"
mySQLPwd <- "C0ll@2@Br!3k"
mySQLHost <- "localhost"
mySQLDBName <- "collab_prod"
rootFolder <- "/var/www/vhosts/collaboration/development-brickwin-ui/Rcode/"

event_id <- commandArgs(trailingOnly = T)[1]
id <- commandArgs(trailingOnly = T)[2]
library(igraph)
library(visNetwork)
library(RNeo4j)
library(rjson)
library(RMySQL)


conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
dbSendQuery(conn, "SET NAMES utf8;")

graph = startGraph("http://localhost:7474/db/data/", username="neo4j", password="welcome")

# query1 <- paste("MATCH (n{event_id:", event_id, "})-[r:CONNECTED]->(m) WHERE NOT EXISTS(n.type) RETURN ID(n) as from, ID(m) as to;")
query1 <- paste("MATCH (n{event_id:", event_id, "})-[r:CONNECTED]->(m) WHERE NOT EXISTS(n.connection_type) RETURN ID(n) as from, ID(m) as to;")

edges <- cypher(graph, query1)

nodes = data.frame(id=unique(c(edges$from, edges$to)))

				ig <- graph_from_data_frame(edges, directed=TRUE)
				ig <- delete.edges(ig, which(E(ig)$to==NA))
				ig <- delete.vertices(ig, which(V(ig)$name=="NA"))

				ig <- as.undirected(ig, mode = "each")
				ig <- simplify(ig, remove.multiple=TRUE, remove.loops=TRUE)
				list <- c()
				loop <-array(c(2,3,4))
                 for (i in loop) {
                   list[i] <-ego(ig, i, nodes = id, mode ="all", mindist=i)
                 }
                       # T <-ego(ig, 3, nodes = id, mode ="all", mindist=3)
                       M <-toJSON(list)
                      print(M);die;
                       # print(class(T));die;

#                        print(T);die;
# 				print(id);
# 				print(g);die;


# print(ig);die;				
# print("hiii");
# print(edges);die;