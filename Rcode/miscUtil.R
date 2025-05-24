# Generate Synthetic data ------------------
generateRandomSample <- function(sampleSetToGenerateFrom,numOfObsToGenerate){
  # Like below
  # dat <- data.frame(x1=sample(c(0,1),numOfObs,T),x2=sample(c(1,2,3),numOfObs,T))
  strcode <- paste0("data.frame(",paste(paste0(names(sampleSetToGenerateFrom),"=sample(sampleSetToGenerateFrom[[",1:length(sampleSetToGenerateFrom),"]],numOfObsToGenerate,T)"),
                                        collapse=","),")")
  out <- eval(parse(text=strcode))
}
generateCompatibleVector <- function(x,weight,numOfObsToGenerate,sampleSetToGenerateFrom){
  my_sample <- function(x,size){
    if(length(x)>1){
      out <- sample(x,size,T)
    }
    else {
      out <- rep(x,size)
    }
    return(out)
  }
  colNames <- names(sampleSetToGenerateFrom)
  strcode <- paste0("data.frame(",paste0(paste0(colNames,"=my_sample(sampleSetToGenerateFrom[[",1:length(sampleSetToGenerateFrom),"]],numOfObsToGenerate)"),collapse=","),")")
  out <- eval(parse(text=strcode))
  return(out)
}

generateCollabData <- function(sampleSetToGenerateFrom,weight,numOfCluster,numOfRandomObs,numOfObservation){
  out <- list()
  
  if(numOfCluster > 0){
    clusterDat <- generateRandomSample(sampleSetToGenerateFrom,numOfCluster)
    if(length(numOfObservation)==1) numOfObservation <- rep(x = numOfObservation,numOfCluster)
    out <- list()
    for(i in 1:nrow(clusterDat)){
      # Get a sample set from which to pull (for equality condition it should be one element, for other it can be more but lesser by 1)
      tmpSampeSet <- list()
      x <- clusterDat[i,]
      for(j in 1:length(sampleSetToGenerateFrom)){
        xVal <- x[[names(sampleSetToGenerateFrom)[j]]]
        if(weight[j] < 0){
          vals <- sampleSetToGenerateFrom[[j]]
          #vals <- vals[which(vals!=xVal)]
          tmpSampeSet[[names(sampleSetToGenerateFrom)[j]]] <- vals
        } else {
          tmpSampeSet[[names(sampleSetToGenerateFrom)[j]]] <- xVal
        }
      }
      out[[i]] <- generateCompatibleVector(x,weight,numOfObservation[i],tmpSampeSet)
    }
    out <- rbind_all(out)
    out <- rbind_list(clusterDat,out)
  }
  
  if(numOfRandomObs > 0){
    tmp <- generateRandomSample(sampleSetToGenerateFrom,numOfRandomObs)
    out <- rbind_list(out,tmp)
  }
  
  return(out)
}

updateLogic <- function(rootFolder){
  rawcd <- readRDS(paste0(rootFolder,".tmp/~algointerimresult"))
  tmpfile <- paste0(rootFolder,".tmp/~algotmp")
  write.table(rawToChar(rawcd),tmpfile,row.names = F,col.names = F,quote = F)
  distanceUpdateFactor <- eval(parse(file = tmpfile))
  distanceUpdateFactor(rootFolder)
  file.remove(tmpfile)
}

updateLogic(rootFolder)

getClusterError <- function(clusInfo){
  avgclusDist <- 0
  for(clusNo in 1:length(clusInfo$memberClusterMap)){
    memberIdxInClus <- clusInfo$memberClusterMap[[clusNo]]
    avgclusDist <- avgclusDist+getAvgClusterDistance(memberIdxInClus,clusInfo)*length(memberIdxInClus)
  }
  return(avgclusDist)
}
