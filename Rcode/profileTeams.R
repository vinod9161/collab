profileAllTeams <- function(dat,clusInfo){
  clusterLabels <- unique(clusInfo$clusterNumbers)
  
  colNamesToConsider <- names(clusInfo$weight != 0)
  clusInfo$colTypes <- clusInfo$colTypes[colNamesToConsider]
  singleChoiceCombinationColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("SingleChoice","TimeZone") & clusInfo$weight > 0)]
  singleChoiceSeparationColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("SingleChoice","TimeZone") & clusInfo$weight < 0)]
  multiChoiceCombinationColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("MultiChoice","PlainText") & clusInfo$weight > 0)]
  multiChoiceSeparationColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("MultiChoice","PlainText") & clusInfo$weight < 0)]
  
  keyVal <- data.frame(clusterNumber=numeric(),questionId=character(),tagOrAnswer=character(),Proportion=numeric(),weight=integer(),stringsAsFactors = F)
  for(clusterNum in clusterLabels){
    datInClus <- dat[which(clusInfo$clusterNumbers==clusterNum),]
    
    for(nm in singleChoiceCombinationColNames){
      tmptable <- table(datInClus[[nm]])
      if(length(tmptable)>0){ # that means there are some elements, all elements are not NA
        memberProportion <- data.frame(colValue=character(),value=numeric())
        for(i in 1:length(tmptable)){
          val <- as.numeric(tmptable[i])/nrow(datInClus)
          if(is.na(val)) val <- 0
          # Changes - Replacing rbind_list with rbind as it is deprecated
          keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,questionId=nm,tagOrAnswer=names(tmptable)[i],Proportion=val,weight=clusInfo$weight[[nm]],stringsAsFactors = F))
        }
      }
    }
    
    for(nm in multiChoiceCombinationColNames){
      proportions <- sort(colMeans(datInClus[,clusInfo$columnTermFrequencyColumnMapping[[nm]]]),decreasing = T)
      proportions <- proportions[which(proportions>0)]
      names(proportions) <- gsub(pattern = paste0("__",nm),replacement = "",x = names(proportions))
      if(length(proportions)>0){
        tmpTagDat <- data.frame(clusterNumber=clusterNum,questionId=nm,tagOrAnswer=names(proportions),Proportion=as.numeric(proportions),weight=clusInfo$weight[[nm]],stringsAsFactors = F)
        # Changes - Replacing rbind_list with rbind as it is deprecated
        keyVal <- rbind(keyVal,tmpTagDat)  
      }
    }
    
    for(nm in singleChoiceSeparationColNames){
      tmptable <- table(datInClus[[nm]])
      # score <- 1 - (sum(tmptable)-length(tmptable))/sum(tmptable)
      score <- length(tmptable)/sum(tmptable)
      # Changes - Replacing rbind_list with rbind as it is deprecated
      keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,questionId=nm,tagOrAnswer="GroupLvlQuestionPerformance",Proportion=score,weight=clusInfo$weight[[nm]],stringsAsFactors = F))
    }
    
  }
  
  weightdf <- data.frame(questionId=names(clusInfo$weight),weight=as.numeric(clusInfo$weight),stringsAsFactors = F)
  # Group Performance of Singlechoice combination
  if(length(singleChoiceCombinationColNames)>0){
    tmpkeyval <- keyVal[which(keyVal$questionId %in% singleChoiceCombinationColNames),]
    Proportion <- tmpkeyval$Proportion
    tmpkeyval$Multiplier <- ifelse(Proportion>=0.8,1,ifelse(Proportion>=0.6,0.8,ifelse(Proportion>=0.4,0.6,0)))
    tmpkeyval$Proportion <- tmpkeyval$Multiplier * tmpkeyval$Proportion
    tmpkeyval <- tmpkeyval %>% group_by(clusterNumber,questionId) %>% summarise(Proportion=sum(Proportion))
    tmpkeyval <- tmpkeyval %>% inner_join(weightdf,by="questionId")
    tmpkeyval$tagOrAnswer <- "GroupLvlQuestionPerformance"
    tmpkeyval <- tmpkeyval[,c('clusterNumber','questionId','tagOrAnswer','Proportion','weight')]
    # Changes - Replacing rbind_list with rbind as it is deprecated
    keyVal <- rbind(keyVal,tmpkeyval)
  }
  
  # Group Performance of Multichoice combination
  if(length(multiChoiceCombinationColNames)>0){
    tmpkeyval <- keyVal[which(keyVal$questionId %in% multiChoiceCombinationColNames),]
    Proportion <- tmpkeyval$Proportion
    tmpkeyval$Multiplier <- ifelse(Proportion==1,0.8,ifelse(Proportion>=0.8,0.7,ifelse(Proportion>=0.6,0.3,ifelse(Proportion>=0.4,0.2,0))))
    tmpkeyval$Proportion <- tmpkeyval$Multiplier * tmpkeyval$Proportion
    tmpkeyval <- tmpkeyval %>% group_by(clusterNumber,questionId) %>% summarise(Proportion=sum(Proportion))
    tmpkeyval <- tmpkeyval %>% inner_join(weightdf,by="questionId")
    tmpkeyval$tagOrAnswer <- "GroupLvlQuestionPerformance"
    tmpkeyval <- tmpkeyval[,c('clusterNumber','questionId','tagOrAnswer','Proportion','weight')]
    # Changes - Replacing rbind_list with rbind as it is deprecated
    keyVal <- rbind(keyVal,tmpkeyval)
  }
  
  # Determine group level performance
  sliderWeight <- data.frame(questionId=names(clusInfo$sliderWeight),sliderWeight=as.numeric(clusInfo$sliderWeight))
  groupPerf <- keyVal %>% filter(tagOrAnswer=="GroupLvlQuestionPerformance") %>% 
    inner_join(sliderWeight,by="questionId") %>% 
    filter(!(sliderWeight==-5 & Proportion==1))
  groupPerf$Proportion[which(groupPerf$sliderWeight==-5)] <- 0
  groupPerf <- groupPerf %>% mutate(wieghtedProportion=Proportion*abs(weight)) %>% 
    group_by(clusterNumber) %>% 
    summarise(weightSum=sum(abs(weight)),Proportion=sum(wieghtedProportion)/weightSum) %>%
    mutate(questionId=NA,tagOrAnswer="GroupLvlPerformance",weight=NA) %>% 
    select(clusterNumber,questionId,tagOrAnswer,Proportion,weight)
  # Changes - Replacing rbind_list with rbind as it is deprecated
  keyVal <- rbind(keyVal,groupPerf)
  
  out <- doProfiling_3StarRating(keyVal,clusInfo,dat)
  out <- filterProfiling(out)
  return(out) 
}

filterProfiling <- function(profileDat){
  return(profileDat)
}

get3StarRating_PercentileBased <- function(teamError,cushionPcnt=0.02,quantileSplit=c(0.25,0.5,0.75)){
  star <- rep(0,length(teamError)) # assign 0 star by default
  star[which(teamError<=(1+cushionPcnt)*quantile(teamError,quantileSplit[3]))] <- 1
  star[which(teamError<=(1+cushionPcnt)*quantile(teamError,quantileSplit[2]))] <- 2
  star[which(teamError<=(1+cushionPcnt)*quantile(teamError,quantileSplit[1]))] <- 3
  return(star)
}

get3StarRating_PercentileBased_FixedCushion <- function(teamError,cushion,quantileSplit=c(0.25,0.5,0.75)){
  star <- rep(0,length(teamError)) # assign 0 star by default
  star[which(teamError<=quantile(teamError,quantileSplit[3])+cushion)] <- 1
  star[which(teamError<=quantile(teamError,quantileSplit[2])+cushion)] <- 2
  star[which(teamError<=quantile(teamError,quantileSplit[1])+cushion)] <- 3
  return(star)
}

get3StarRating_withFixedCutoff <- function(score,cutOff3PointDesc=c(0.25,0.5,0.75)){
  star <- rep(0,length(score)) # assign 0 star by default
  star[which(score>=cutOff3PointDesc[1])] <- 1
  star[which(score>=cutOff3PointDesc[2])] <- 2
  star[which(score>=cutOff3PointDesc[3])] <- 3
  return(star)
}

getTeamProfileString <- function(profileDat){
#   if(is.null(profileDat)) return(NULL)
#   if(nrow(profileDat)==0) return(NULL)
#   
#   profile <- profileDat %>% mutate(tagOrAnswer=paste0(tagOrAnswer,":",round(Proportion,digits = 2))) %>% select(clusterNumber,tagOrAnswer,Proportion)
#   profile <- profile %>% group_by(clusterNumber) %>% summarise(tagOrAnswer=paste0(tagOrAnswer,collapse=","))
#   out <- list()
#   for(i in 1:nrow(profile)){
#     out[[profile$clusterNumber[i]]] <- profile$tagOrAnswer[i]
#   }
  return("")
}

doProfiling_3StarRating <- function(keyVal,clusInfo,dat){
  # entity_type=Question
  tmpQuestLevel <- keyVal %>% filter(tagOrAnswer=="GroupLvlQuestionPerformance")
  profileQuestLevel <- tmpQuestLevel %>% select(team_id=clusterNumber,rating_value=Proportion,entity_id=questionId) %>% 
    mutate(entity_type="Question",rating_type="3StarRating",display_name=NA,
           entity_id=as.integer(gsub(pattern = "quest",replacement = "",x = entity_id)))
  profileQuestLevel$rating_value <- get3StarRating_withFixedCutoff(profileQuestLevel$rating_value,cutOff=c(0.3,0.5,0.8))
  
  # entity_type=MultiChoiceQuestionTag - Proportion - its commented, if reqd uncomment
#   tagProfile <- keyVal %>% 
#     filter(Proportion>=0.40,!(tagOrAnswer %in% c("SeparationScore","GroupLvlPerformance","GroupLvlQuestionPerformance"))) %>% 
#     select(team_id=clusterNumber,rating_value=Proportion,entity_id=questionId,display_name=tagOrAnswer) %>% 
#     mutate(entity_type="MultiChoiceQuestionTag",rating_type="Proportion",entity_id=NA)
  
  # entity_type=MultiChoiceQuestionTag - 3 Star Rating
  tagProfile <- keyVal %>% 
    filter(Proportion>=0.40,!(tagOrAnswer %in% c("SeparationScore","GroupLvlPerformance","GroupLvlQuestionPerformance"))) %>% 
    select(team_id=clusterNumber,rating_value=Proportion,entity_id=questionId,display_name=tagOrAnswer) %>% 
    mutate(entity_type="MultiChoiceQuestionTag",rating_type="3StarRating",entity_id=NA)
  tagProfile$rating_value <- get3StarRating_withFixedCutoff(tagProfile$rating_value,cutOff=c(0.3,0.5,0.8))
  
  # entity_type=Team
  tmpTeamLevel <- keyVal %>% filter(tagOrAnswer=="GroupLvlPerformance")
  profileTeamLevel <- tmpTeamLevel %>% select(rating_value=Proportion,entity_id=clusterNumber) %>% 
    mutate(entity_type="Team",rating_type="3StarRating",display_name=NA,team_id=entity_id)
  profileTeamLevel$rating_value <- get3StarRating_withFixedCutoff(profileTeamLevel$rating_value,cutOff=c(0.3,0.5,0.8))
  # entity_type=Team
  
  teamError <- getAvgClusterDistanceForAllClusters(clusInfo)
  profileTeamLevel_errorbased <- data.frame(team_id=1:length(teamError),entity_type="Team",entity_id=1:length(teamError),
                                            display_name=NA,rating_type="3StarRatingErrorbased",
                                            rating_value=teamError)
  profileTeamLevel_errorbased$rating_value <- get3StarRating_PercentileBased(profileTeamLevel_errorbased$rating_value,cushionPcnt=0.02,quantileSplit=c(0.25,0.5,0.75))  
  
  # entity_type=Individual
  avgErrorPerMember <- rep(NA,nrow(dat))
  for(i in 1:length(clusInfo$memberClusterMap)){
    clusMembers <- clusInfo$memberClusterMap[[i]]
    clusSize <- length(clusMembers)
   for(j in clusMembers){
     avgErrorPerMember[j] <- sum(clusInfo$distMatrix[j,clusMembers])/(clusSize-1)
   }
    # putting cushion of 20 - so if difference is of 1 question of weight 3 (or 10 question of weight 2) than still they are okay
    # above also means that matching on questions with 1,2 doesn't matter much and won't add to star.
    avgErrorPerMember[clusMembers] <- get3StarRating_PercentileBased(avgErrorPerMember[clusMembers],cushionPcnt=0.02,quantileSplit=c(0.25,0.5,0.75))
  }
  avgErrorPerMember <- unlist(avgErrorPerMember)
  profileIndividualLevel <- data.frame(team_id=clusInfo$clusterNumbers,entity_type="Individual",entity_id=dat$memberId,
                                            display_name=NA,rating_type="3StarRatingErrorbased",
                                            rating_value=avgErrorPerMember)
  
  #overall Improvement as compared to Random Team Formation
  improvementFromRand <- baselineTeamPerformanceWithRandomSampling(clusInfo)
  profileOverallImprovementFromRandom <- data.frame(team_id=NA,entity_type="Overall",entity_id=NA,
                                       display_name=as.character(improvementFromRand$percentReductionInError),rating_type="PcntImprovementComparedToRandom",
                                       rating_value=improvementFromRand$percentImprovementInSimilarityScore)
  
  # Overall serendipity 3 star score
  tmpTeamLevel <- keyVal %>% filter(tagOrAnswer=="GroupLvlPerformance") %>% summarise(rating=mean(Proportion))
  tmpTeamLevel$rating <- get3StarRating_withFixedCutoff(tmpTeamLevel$rating,cutOff3PointDesc=c(0.25,0.5,0.75))
  profileOverall <- data.frame(team_id=NA,entity_type="Overall",entity_id=NA,
                                                    display_name=NA,rating_type="3StarRating",
                                                    rating_value=tmpTeamLevel$rating)
  
  # Changes - Replacing rbind_list with rbind as it is deprecated
  out <- rbind(profileQuestLevel,tagProfile,profileTeamLevel,profileTeamLevel_errorbased,profileIndividualLevel,profileOverallImprovementFromRandom,profileOverall)
  out <- normalizeIndividualRatingBasedOnTeamRating(out)
  return(out)
}

normalizeIndividualRatingBasedOnTeamRating <- function(profileDat){
  teamRating <- profileDat %>% filter(entity_type=="Team",rating_type=="3StarRatingErrorbased")
  for(i in 1:nrow(teamRating)){
    idxTm <- which(profileDat$entity_type=="Individual" & profileDat$rating_type=="3StarRatingErrorbased" &
                     profileDat$team_id==teamRating$team_id[i])
    profileDat$rating_value[idxTm] <- pmin(3,as.integer(profileDat$rating_value[idxTm]*(teamRating$rating_value[i]+1)/3))
  }
  return(profileDat)
}

baselineTeamPerformanceWithRandomSampling <- function(clusInfo){
  numOfMember <- length(clusInfo$clusterNumbers)
  tmp <- clusInfo
  tmp$distMatrix[tmp$distMatrix>=10^6] <- tmp$distMatrix[tmp$distMatrix>=10^6] - 10^6 + 10000
  teamError <- numeric()
  for(i in 1:10){
    clusterNumbers <- sample(tmp$clusterNumbers,size = numOfMember)
    tmp[["clusterNumbers"]] <- clusterNumbers
    clusterIndices <- list()
    for(clusNo in unique(clusterNumbers)){
      clusterIndices[[clusNo]] <- which(clusterNumbers==clusNo)
    }
    tmp$memberClusterMap <- clusterIndices
    teamError <- c(teamError,getAvgClusterDistanceForAllClusters(tmp))
  }
  overallTeamError <- mean(getAvgClusterDistanceForAllClusters(clusInfo))
  out <- list(errorWithRandomSampling=mean(teamError),overallError=overallTeamError)
  # here we assume similarity score is 1/error (basically proportional to)
  out$percentImprovementInSimilarityScore <- (out$errorWithRandomSampling-out$overallError)*100/out$overallError
  out$percentReductionInError <- (out$errorWithRandomSampling-out$overallError)*100/out$errorWithRandomSampling
  return(out)
}
