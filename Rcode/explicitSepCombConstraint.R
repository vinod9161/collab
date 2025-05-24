balanceExplicitCombConstraint <- function(clusInfo){
  # separation constraint will be taken care of because of high distance
  # So now only bother about combination constraint
  # No need to bother about entries with only one member id, since that is for separation
  
  # combine for two separately - just swap
  # For three - do a optimal swap for first two and than start putting all three together
  #if(is.null(clusInfo$hardSepComb) || length(clusInfo$hardSepComb)==0 || clusInfo$hardSepComb=="") return(clusInfo)
  clusterLabels <- 1:length(clusInfo$memberClusterMap)
  clusdists <- getAllMemberAvgDistancesFromGivenClusters(clusterLabels,clusInfo)
  membersNotToBeMoved <- integer()
  # try satisfying constraint for groups with highest number of members specified (most constrained) and than lower ones
  idxClusOrder <- order(sapply(clusInfo$hardSepComb,length),decreasing = T)
  clustersAlreadyMade <- integer()
  for(i in idxClusOrder){
    # if(i==5) browser()
    tmpcomb <- clusInfo$hardSepComb[[i]]
    if(length(tmpcomb)==2){
      #consider both the swaps and choose the one with lowest error
      membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb)
      clusInfo <- bringTwoMembersTogetherBySwap(tmpcomb,membersNotToBeMoved,clusdists,clusInfo)
      clustersToSwap <- clusInfo$clusterNumbers[tmpcomb[c(1,2)]]
      clusdists <- updateMemberAvgDistancesFromGivenClusters(clustersToSwap,clusdists,clusInfo)
      # membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb)
    }
    else if(length(tmpcomb)>2){
      # Very unoptimal way, hack!! for now
      # Try to find cluster which have highest number of these members
      availClus4Nucleus <- clusInfo$clusterNumber[tmpcomb]
      availClus4Nucleus <- availClus4Nucleus[which(!(availClus4Nucleus %in% clustersAlreadyMade))]
      tmpfreq <- table(availClus4Nucleus)
      if(max(tmpfreq)>1){
        rightClusterNo <- as.integer(names(tmpfreq)[which.max(tmpfreq)])
        memberRemaining <- tmpcomb[!(tmpcomb %in% clusInfo$memberClusterMap[[rightClusterNo]])]
        membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb[(tmpcomb %in% clusInfo$memberClusterMap[[rightClusterNo]])])
      } else {
        membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb[c(1,2)])
        clusInfo <- bringTwoMembersTogetherBySwap(tmpcomb[c(1,2)],membersNotToBeMoved,clusdists,clusInfo)
        clustersToSwap <- clusInfo$clusterNumbers[tmpcomb[c(1,2)]]
        clusdists <- updateMemberAvgDistancesFromGivenClusters(clustersToSwap,clusdists,clusInfo)
        
        rightClusterNo <- clusInfo$clusterNumbers[tmpcomb[1]]
        # membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb[c(1,2)])
        memberRemaining <- tmpcomb[3:length(tmpcomb)]
      }
      clustersAlreadyMade <- c(clustersAlreadyMade,rightClusterNo)
      # membersNotToBeMoved <- c(membersNotToBeMoved,tmpcomb[3:length(tmpcomb)])
      
      for(memberId in memberRemaining){
        leftClusterNo <- clusInfo$clusterNumbers[memberId]
        clustersToSwap <- c(rightClusterNo,leftClusterNo)
        rightClusterMember <- clusInfo$memberClusterMap[[rightClusterNo]]
        rightClusterMember <- rightClusterMember[!(rightClusterMember %in% membersNotToBeMoved)]
        if(length(rightClusterMember)>0){
          rightClusterMemberDistDecrease <- clusdists[rightClusterMember,(rightClusterNo+1)]-clusdists[rightClusterMember,(leftClusterNo+1)]
          rightMemberToSwap <- rightClusterMember[which.max(rightClusterMemberDistDecrease)]
          leftMemberToSwap <- memberId
          clusInfo <- performMemberSwap(rightMemberToSwap,leftMemberToSwap,clusInfo)
          clusdists <- updateMemberAvgDistancesFromGivenClusters(clustersToSwap,clusdists,clusInfo)
        }
        membersNotToBeMoved <- c(membersNotToBeMoved,memberId)
      }
    }
  }
  return(clusInfo)
}

bringTwoMembersTogetherBySwap <- function(membersToBeTogether,membersNotTobeConsidered,clusdists,clusInfo){
  # Simply consider both the swaps, right and left
  rightClusterNo <- clusInfo$clusterNumbers[membersToBeTogether[1]]
  leftClusterNo <- clusInfo$clusterNumbers[membersToBeTogether[2]]
  if(rightClusterNo==leftClusterNo) return(clusInfo) # no need to do swap, since both are in same group
  clustersToSwap <- c(rightClusterNo,leftClusterNo)
  
  
  #consider right goes to left
  leftClusterMember <- clusInfo$memberClusterMap[[leftClusterNo]]
  leftClusterMember <- leftClusterMember[!(leftClusterMember %in% membersNotTobeConsidered)]
  if(length(leftClusterMember)>0){
    leftClusterMemberDistDecrease <- clusdists[leftClusterMember,(leftClusterNo+1)]-clusdists[leftClusterMember,(rightClusterNo+1)]
    rightMemberToSwap <- membersToBeTogether[1]
    leftMemberToSwap <- leftClusterMember[which.max(leftClusterMemberDistDecrease)]
    avgErrorBefore <- mean(getAvgClusterDistanceForAllClusters(clusInfo,clustersToSwap))
    tmpright <- performMemberSwap(rightMemberToSwap,leftMemberToSwap,clusInfo)
    avgErrorAfter <- mean(getAvgClusterDistanceForAllClusters(tmpright,clustersToSwap))
    errorIncRight <- avgErrorAfter-avgErrorBefore  
  } else {errorIncRight <- NA}
  
  
  #consider left goes to right
  rightClusterMember <- clusInfo$memberClusterMap[[rightClusterNo]]
  rightClusterMember <- rightClusterMember[!(rightClusterMember %in% membersNotTobeConsidered)]
  if(length(rightClusterMember)>0){
    rightClusterMemberDistDecrease <- clusdists[rightClusterMember,(rightClusterNo+1)]-clusdists[rightClusterMember,(leftClusterNo+1)]
    rightMemberToSwap <- rightClusterMember[which.max(rightClusterMemberDistDecrease)]
    leftMemberToSwap <- membersToBeTogether[2]
    avgErrorBefore <- mean(getAvgClusterDistanceForAllClusters(clusInfo,clustersToSwap))
    tmpleft <- performMemberSwap(rightMemberToSwap,leftMemberToSwap,clusInfo)
    avgErrorAfter <- mean(getAvgClusterDistanceForAllClusters(tmpleft,clustersToSwap))
    errorIncLeft <- avgErrorAfter-avgErrorBefore
  } else {errorIncLeft <- NA}
  
  # atleast one possible moivement happened
  if(!is.na(errorIncRight) || !is.na(errorIncLeft)){
    if(is.na(errorIncRight)) clusInfo <- tmpright
    else if(is.na(errorIncLeft)) clusInfo <- tmpleft
    else if(errorIncRight<errorIncLeft) clusInfo <- tmpright
    else clusInfo <- tmpleft
  }

  return(clusInfo)
}

