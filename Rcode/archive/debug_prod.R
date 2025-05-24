library(data.table)
library(dplyr)
library(tidyr)

checkClusterPerformance <- function(answerFileName,resultFileName,jsonFile,clusterPerformanceOutputFile){
  
}

answerFileName <- "data/output/answers_event_71.csv"
resultFileName <- "data/output/results_eventteamset_63UHG.csv"
clusterPerformanceOutputFile <- "data/output/GroupResultValidation.csv"
jsonFile <- "data/output/json_63.txt"

dat <- fread(answerFileName,data.table = F)
dat <- dat %>% select(eventId=event_id,memberId=attendie_id,questionId=question_id,answer=tags)
dat <- spread(data = dat,key = questionId,value = answer)
names(dat) <- c(names(dat)[1:2],paste0("quest",names(dat)[3:ncol(dat)]))
res <- fread(resultFileName,data.table = F)

dat <- dat %>% inner_join(res,by=c("memberId"="member_id")) %>% 
  select(-eventId,-id,-event_teamset_id)

custInput <- fromJSON(txt = jsonFile)
colTypes <- identifyColumnTypes(answerDat)
colTypes <- unlist(colTypes)
weight <- as.integer(custInput$q_weights$qwValue)
names(weight) <- paste0("quest",custInput$q_weights$q_id)
groupSize <- as.integer(custInput$groupSize)
numberOfGroup <- floor(nrow(dat)/groupSize)
weight <- weight[weight!=0]
colTypes <- colTypes[names(weight)]
weight <- getAlgoWeights(weight)
clusInfo <- list(weight=weight,colTypes=colTypes,numberOfGroup=numberOfGroup,
                 idealClusterSize=groupSize,datColNames=names(dat),distanceType="SimilarityBased")
dat <- setupTimeZoneColumn(dat,clusInfo)
dat <- setupDocumentTermFrequencyForTextCols(dat,clusInfo)
clusInfo$columnTermFrequencyColumnMapping <- getColumnTermFrequencyColumnMapping(dat,clusInfo)
clusInfo$clusterNumbers <- dat$team_id

clusterPerf <- getClusteringPerformance(dat,clusInfo)
write.csv(clusterPerf,clusterPerformanceOutputFile)
