library(data.table)
library(dplyr)
library(stringr)
dat <- fread("C:/Users/Mohammed.Jamal/Documents/brickwin/data/output/AlgoResults.csv",data.table = F)
networkColumnName <- "quest5013"
memberNameColumnName <- "memberName"
teamIdColumnName <- "team_id"
group <- unique(dat[,teamIdColumnName])
pcnt <- numeric()
dat$CorrectedNetwork <- NA
for(i in 1:nrow(dat)){
  dat$CorrectedNetwork[i] <- gsub(pattern = dat[i,memberNameColumnName],replacement = "",x = dat[i,networkColumnName])
}
for(i in group){
  # tmp <- dat %>% filter(AlgoTeamSet==i)
  tmp <- dat[which(dat[[teamIdColumnName]]==i),]
  knows <- paste(tmp$CorrectedNetwork,collapse=",",sep="")
  knows <- stringr::str_split(knows,",")[[1]]
  knows <- stringi::stri_trim(knows)
  pcnt[i] <- length(intersect(knows,tmp[,memberNameColumnName]))/nrow(tmp)
}
mean(pcnt)
algoPcnt <- pcnt

# Compare with Random Assignment
dat$AlgoTeamSet <- sample(x = dat$AlgoTeamSet,size = length(dat$AlgoTeamSet))
for(i in group){
  tmp <- dat %>% filter(AlgoTeamSet==i)
  knows <- paste(tmp$CorrectedNetwork,collapse=",",sep="")
  knows <- stringr::str_split(knows,",")[[1]]
  knows <- stringi::stri_trim(knows)
  pcnt[i] <- length(intersect(knows,tmp$memberName))/nrow(tmp)
}
mean(pcnt)