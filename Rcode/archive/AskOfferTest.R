library(data.table)
library(dplyr)
library(stringr)
dat <- fread("../brickwin/CollaborationAI/GroupResult.csv",data.table = F)
askOfferColumnName <- "Ask.Combined"
offerColumnName <- "Offer.Combined"
group <- unique(dat$AlgoTeamSet)
pcnt <- numeric()
cnt <- numeric()
for(i in group){
  tmp <- dat %>% filter(AlgoTeamSet==i)
  ask <- paste(tmp[[askOfferColumnName]],collapse=",")
  ask <- unique(str_trim(str_split(ask,",")[[1]]))
  offer <- paste(tmp[[offerColumnName]],collapse=",")
  offer <- unique(str_trim(str_split(offer,",")[[1]]))
  pcnt <- c(pcnt,length(intersect(ask,offer))/length(unique(c(ask,offer))))
  cnt <- c(cnt,length(unique(c(ask,offer))))
}
mean(pcnt)
algoPcnt <- pcnt

#Compare with Random Assignment
group <- unique(dat$AlgoTeamSet)
dat$AlgoTeamSet <- sample(x = dat$AlgoTeamSet,size = length(dat$AlgoTeamSet))
pcnt <- numeric()
cnt <- numeric()
for(i in group){
  tmp <- dat %>% filter(AlgoTeamSet==i)
  ask <- paste(tmp[[askOfferColumnName]],collapse=",")
  ask <- unique(str_trim(str_split(ask,",")[[1]]))
  offer <- paste(tmp[[offerColumnName]],collapse=",")
  offer <- unique(str_trim(str_split(offer,",")[[1]]))
  pcnt <- c(pcnt,length(intersect(ask,offer))/length(unique(c(ask,offer))))
  cnt <- c(cnt,length(unique(c(ask,offer))))
}
mean(pcnt)


# 73% match with community and 
# 86% avg match no constraint