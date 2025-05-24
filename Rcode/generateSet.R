library(dplyr)
library(tm)
library(stringr)
library(data.table)

QuestionCategoryId <- list(MultiChoiceAskOffer=list(CategoryId=9,ColTypeName="MultiChoiceAskOffer"),
                           NetworkWhoKnowsWho=list(CategoryId=5,ColTypeName="NetworkWhoKnowsWho"))

# Perform Cluster Validation ------------

getClusteringPerformance <- function(dat,clusInfo){
  clusterLabels <- unique(clusInfo$clusterNumbers)
  
  colNamesToConsider <- names(clusInfo$weight != 0)
  clusInfo$colTypes <- clusInfo$colTypes[colNamesToConsider]
  factorOrTimeZoneColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("SingleChoice","TimeZone"))]
  profileString <- getTeamProfileString(clusInfo$teamProfileData)
  keyVal <- data.frame(clusterNumber=numeric(),colName=character(),Proportion=numeric())
  for(clusterNum in clusterLabels){
    datInClus <- dat[which(clusInfo$clusterNumbers==clusterNum),]
    keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,colName="GroupSize",Proportion=nrow(datInClus)))
    if(!is.null(profileString)) {
      if(clusterNum > length(profileString)) tmpprofile <- ""
      else tmpprofile <- profileString[[clusterNum]]
      if(is.null(tmpprofile)) tmpprofile <- ""
      keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,colName="Profile",Proportion=tmpprofile))
    }
    
    for(nm in factorOrTimeZoneColNames){
      tmptable <- table(datInClus[[nm]])
      if(length(tmptable)>0){ # that means there are some elements, all elements are not NA
        memberProportion <- data.frame(colValue=character(),value=numeric())
        for(i in 1:length(tmptable)){
          if(length(names(tmptable)[i])==0) {
            browser()
          }
          val <- round(as.numeric(tmptable[i])/nrow(datInClus),digits = 2)
          if(is.na(val)) val <- 0
          memberProportion <- rbind(memberProportion,data.frame(colValue=names(tmptable)[i],value=val))
          
        }
        proportion <- paste(paste(as.character(memberProportion$colValue),memberProportion$value,sep=":"),collapse=",")
        keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,colName=nm,Proportion=proportion))
      }
    }
    
    #listColNames <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("MultiChoice","PlainText"))]
    listColNames <- names(clusInfo$colTypes)[which(grepl(pattern = "MultiChoice|PlainText",x = clusInfo$colTypes))]
    for(nm in listColNames){
      proportions <- round(sort(colMeans(datInClus[,clusInfo$columnTermFrequencyColumnMapping[[nm]]]),decreasing = T),digits = 2)
      proportions <- proportions[which(proportions>0)]
      names(proportions) <- gsub(pattern = paste0("__",nm),replacement = "",x = names(proportions))
      proportions <- paste(paste(names(proportions),proportions,sep=":"),collapse=",")
      keyVal <- rbind(keyVal,data.frame(clusterNumber=clusterNum,colName=nm,Proportion=proportions))
    }
    
  }
  #keyVal$clusterNumber <- paste0("Cluster_",keyVal$clusterNumber)
  #keyVal$value <- round(keyVal$value,digits = 2)
  #keyVal$value[is.na(keyVal$value)] <- 0
  #keyVal <- tidyr::spread(data = keyVal,key = clusterNumber,value = Proportion)
  keyVal <- keyVal %>% select(ColumnName=colName,TeamSet=clusterNumber,Proportion) %>% arrange(TeamSet)
  return(keyVal)
}



# Determine distances ---------------
populateDistanceMatrix <- function(dat,distFunc,clusInfo){
  numOfRow <- nrow(dat)
  datMat <- as.matrix(dat)
  
  # Below code for parallelizing is working, but need thorough testing before pushing to production
  # Because if it tries to use all the core it may interfer with the performance of server
  # Also if multiple parallel execution starts and all tries to block the cores than they will fail
  # Thus as of now this is going to be used only offline in local to fast processing.
  
  #   library(parallel)
  #   cl <- makeCluster(getOption("cl.cores", detectCores()))
  #   clusterExport(cl,varlist = c("datMat","clusInfo","distFunc","getMultiChoiceColumnDistance","getSimilarityBasedDistance","getJaccardDistance"),envir=environment())
  #   out <- clusterApply(cl,x = 1:numOfRow,fun = function(i){
  #     tmpdist <- numeric(length = length(1:numOfRow))
  #     for(j in i:numOfRow){
  #       tmpdist[j] <- distFunc(datMat[i,],datMat[j,],clusInfo)
  #     }
  #     out <- list(idx=i,dists=tmpdist)
  #     return(out)
  #   })
  #   stopCluster(cl)
  #   
  #   mydist <- matrix(nrow=numOfRow,ncol=numOfRow)
  #   for(i in 1:length(out)){
  #     idx <- out[[i]][[1]]
  #     tmpdist <- out[[i]][[2]]
  #     for(j in idx:numOfRow){
  #       val <- tmpdist[j]
  #       mydist[idx,j] <- val
  #       mydist[j,idx] <- val
  #     }
  #   }
  
  mydist <- matrix(nrow=numOfRow,ncol=numOfRow)
  for(i in 1:numOfRow){
    for(j in i:numOfRow){
      val <- distFunc(datMat[i,],datMat[j,],clusInfo)
      mydist[i,j] <- val
      mydist[j,i] <- val 
    }
  }
  
  # Explicit (hard) Separation and Combination constraint
  if(!is.null(clusInfo$hardSepComb)){
    sepcombMat <- clusInfo$hardSepComb
    nr <- length(sepcombMat)
    # Explicit Separation Constraint
    if(nr > 1){ # only if there is atleast two rows
      for(i in 1:(nr-1)){
        for(j in (i+1):nr){
          mydist[sepcombMat[[i]],sepcombMat[[j]]] <- 10^8
          mydist[sepcombMat[[j]],sepcombMat[[i]]] <- 10^8
        }
      }
    }
    
    # Explicit Combination Constraint
    for(i in 1:nr){
      sepcomb <- sepcombMat[[i]]
      for(j in 1:length(sepcomb)){
        mydist[sepcomb[j],sepcomb[-j]] <- 0
        mydist[sepcomb[-j],sepcomb[j]] <- 0
      }
    }
  }
  
  return(mydist)
}

getCosineSim <- function(x,y){
  c <- sum(x*y) / (sqrt(sum(x*x)) * sqrt(sum(y*y)))
  return(c)
}

getDist <- function(x,y,clusInfo){
  dists <- numeric()
  weight <- clusInfo$weight
  colTypes <- clusInfo$colTypes
  columnTermFrequencyColumnMapping <- clusInfo$columnTermFrequencyColumnMapping
  importantTagDetail <- clusInfo$importantTagDetail
  
  colNamesToConsider <- names(weight != 0)
  colTypes <- colTypes[colNamesToConsider]
  
  # calculate distance of SingleChoice columns
  factorCols <- names(colTypes)[which(colTypes=="SingleChoice")]
  comp <- as.numeric(x[factorCols]==y[factorCols])
  names(comp) <- factorCols
  factorCols4Similarity <- names(which(weight[factorCols]>0))
  factorCols4DisSimilarity <- names(which(weight[factorCols]<0))
  simDist <- 1-comp[factorCols4Similarity]
  dissimDist <- comp[factorCols4DisSimilarity]
  # missing values for combination are treated as they are also matching
  # in particular this is will help serve usecase - where NA can become matches for all
  simDist[is.na(simDist)] <- 0 
  dissimDist[is.na(dissimDist)] <- 0 # missing values for separation are treated as they are matching
  dists <- c(simDist,dissimDist)
  # missing value treatment - assign max distance if now known
  # dists[is.na(dists)] <- 1
  
  # calculate distance for timezone column
  timzoneColName <- names(colTypes)[which(colTypes=="TimeZone")]
  if(length(timzoneColName)>0){
    timediff <- abs(as.numeric(x[timzoneColName])-as.numeric(y[timzoneColName]))
    if(timediff==0) dists[timzoneColName] <- 0
    else if(timediff<=1) dists[timzoneColName]=0.2
    else if(timediff<=2) dists[timzoneColName] = 0.9
    else if(timediff > 2) dists[timzoneColName] = 1  
  }
  
  # calculate distance for Network question Who Knows Who
  networkWhoKnowWhoColName <- names(colTypes)[which(colTypes=="NetworkWhoKnowsWho")]
  if(length(networkWhoKnowWhoColName)>0){
    #AKnowsB <- grepl(pattern = y["memberName"],x = x[networkWhoKnowWhoColName])
    #BKnowsA <- grepl(pattern = x["memberName"],x = y[networkWhoKnowWhoColName])
    AKnowsB <- grepl(pattern = paste0("\\b", y["memberId"], "\\b"),x = x[networkWhoKnowWhoColName])
    BKnowsA <- grepl(pattern = paste0("\\b", x["memberId"], "\\b"),x = y[networkWhoKnowWhoColName])
    knowsEachOther <- AKnowsB+BKnowsA
    # below implementation is for weight < 0
    # if weight > 0 it will go in additional if block to invert.
    # If any one of the two knows each other
    if(knowsEachOther == 2){
      dists[networkWhoKnowWhoColName] = 1 
    } else if(knowsEachOther > 0){
      dists[networkWhoKnowWhoColName] = 0.5
    } else {
      dists[networkWhoKnowWhoColName] = 0 
    }
    if(weight[networkWhoKnowWhoColName]>0){
      # if weight > 0, then this is combination, making team with those who know each other
      dists[networkWhoKnowWhoColName] <- 1-dists[networkWhoKnowWhoColName]
    }
  }
  
  #===========================================================================================================
  # ASK OFFER BUG-FIX
  numberOfAskOfferColumns <- length(names(colTypes)[which(colTypes=="MultiChoiceAskOffer")]) # fix this
  if(numberOfAskOfferColumns>0){
    # Additional_ask_offer_start
    for(pair in 1:(numberOfAskOfferColumns/2)){
      
      # if(numberOfAskOfferColumns==2)
      #   pairAskofferColName <- names(colTypes)[which(colTypes=="MultiChoiceAskOffer")]
      # else
      #   pairAskofferColName <- names(colTypes)[which(colTypes==paste0("MultiChoiceAskOffer_pair",pair))]
      
      pairAskofferColName <- names(colTypes)[which(colTypes==paste0("MultiChoiceAskOffer_pair",pair))]
      askcolname <- columnTermFrequencyColumnMapping[[pairAskofferColName[1]]]
      offercolname <- columnTermFrequencyColumnMapping[[pairAskofferColName[2]]]
      # Ask
      if(nzchar(x[askcolname]) & nzchar(y[offercolname])){
        dists[pairAskofferColName[1]] <- getMultiChoiceColumnDistance(x[askcolname],y[offercolname],clusInfo$avgNumOfItemForMultiChoiceColumn[[pairAskofferColName[1]]],clusInfo)
      }else {
        dists[pairAskofferColName[1]] <- 0.7
      }
      # Check if the offer is empty
      if(nzchar(x[offercolname]) & nzchar(y[askcolname])){
        dists[pairAskofferColName[2]] <- getMultiChoiceColumnDistance(x[offercolname],y[askcolname],clusInfo$avgNumOfItemForMultiChoiceColumn[[pairAskofferColName[2]]],clusInfo)
      }else {
        dists[pairAskofferColName[2]] <- 0.7
      }
    }
    # Additional_ask_offer_end
  }
  
  
  
  #===========================================================================================================
  
  listCols <- names(colTypes)[which(colTypes == "Numeric")]
  for(i in listCols){
    dists[i] <- (as.numeric(x[i])-as.numeric(y[i]))/clusInfo$numericColRangeDiff[i]
  }
  
  # calculate distance of list columns
  listCols <- names(colTypes)[which(colTypes %in% c("MultiChoice","PlainText"))]
  for(i in listCols){
    if(weight[i]>0){
      colnamestmp <- columnTermFrequencyColumnMapping[[i]]
      #       simDist <- getSimilarityBasedDistance(x[colnamestmp],y[colnamestmp],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
      #       jacdist <- getJaccardDistance(x[colnamestmp],y[colnamestmp])
      #       simdist <- min(simDist,jacdist)
      #       dists[i] <- 0.7*simdist + 0.3*jacdist
      if(!is.null(importantTagDetail[[i]])){
        tmpImpTagDetail <- importantTagDetail[[i]]
        importantTagPresent <- sum(as.numeric(c(x[tmpImpTagDetail$importantTermColumnName],y[tmpImpTagDetail$importantTermColumnName])))>0
        lessImportantTagPresent <- sum(as.numeric(c(x[tmpImpTagDetail$lessImportantTermColumnName],y[tmpImpTagDetail$lessImportantTermColumnName])))>0
        if(importantTagPresent & lessImportantTagPresent){
          distImpTag <- getMultiChoiceColumnDistance(x[tmpImpTagDetail$importantTermColumnName],y[tmpImpTagDetail$importantTermColumnName],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
          distLessImpTag <- getMultiChoiceColumnDistance(x[tmpImpTagDetail$lessImportantTermColumnName],y[tmpImpTagDetail$lessImportantTermColumnName],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
          dists[i] <- distImpTag*tmpImpTagDetail$pcntgWeightOfImportantTerms + 
            distLessImpTag*tmpImpTagDetail$pcntgWeightOfLessImportantTerms  
        }
        else if(importantTagPresent){
          dists[i] <- getMultiChoiceColumnDistance(x[tmpImpTagDetail$importantTermColumnName],y[tmpImpTagDetail$importantTermColumnName],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
        }
        else if(lessImportantTagPresent){
          dists[i] <- getMultiChoiceColumnDistance(x[tmpImpTagDetail$lessImportantTermColumnName],y[tmpImpTagDetail$lessImportantTermColumnName],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
        }
        else {
          dists[i] <- 0
        }
      } else { # if important terms are not present than
        dists[i] <- getMultiChoiceColumnDistance(x[colnamestmp],y[colnamestmp],clusInfo$avgNumOfItemForMultiChoiceColumn[[i]],clusInfo)
      }
      
    } else if(weight[i]<0){
      # check if any of the below has all 0s than that's missing value and that means dist shud be 0
      colnamestmp <- columnTermFrequencyColumnMapping[[i]]
      xyBothArePresent <- any(as.numeric(x[colnamestmp])>0) & any(as.numeric(y[colnamestmp])>0)
      if(xyBothArePresent){
        dists[i] <- 1-getJaccardDistance(x[colnamestmp],y[colnamestmp])
      } else {
        dists[i] <- 0
      }
    }
  }
  
  xydist <- sum(dists*abs(weight[names(dists)]))
  # also try weighted harmonic mean or geometric mean, because mean may try to bias certian things
  return(xydist)
}

getMultiChoiceColumnDistance <- function(x,y,maxNumOfSimilarity,clusInfo){
  simDist <- getSimilarityBasedDistance(x,y,maxNumOfSimilarity,clusInfo)
  jacdist <- getJaccardDistance(x,y)
  simdist <- min(simDist,jacdist)
  dist <- 0.7*simdist + 0.3*jacdist
  return(dist)
}

getSimilarityBasedDistance <- function(x,y,maxNumOfSimilarity,clusInfo){
  x <- x>0
  y <- y>0
  if(length(x)==1){ # scenario appears when # of important tag is 1
    return(as.numeric(x!=y))
  }
  cfm <- as.matrix(table(x,y))
  if(any(colnames(cfm) %in% "TRUE") & any(row.names(cfm) %in% "TRUE")){
    dist <- 1-cfm["TRUE","TRUE"]/maxNumOfSimilarity
    dist <- ifelse(dist<0,0,dist)
  } else {
    dist <- 0 # if any of them is all 0s than its treated as blank and it means it can be matched with any one
  }
  return(dist)
}

getJaccardDistance <- function(x,y){
  x <- as.numeric(x>0)
  y <- as.numeric(y>0)
  if(length(x)==1){ # scenario appears when # of important tag is 1
    return(as.numeric(x!=y))
  }
  # refer wikipedia "jaccard index" for notations
  cfm <- as.matrix(table(x,y))
  if(any(colnames(cfm) %in% "1") & any(row.names(cfm) %in% "1")){
    #jaccardDist <- (cfm[1,2]+cfm[2,1])/(cfm[1,2]+cfm[2,1]+cfm[2,2])
    if(sum(dim(cfm))==4){
      jaccardDist <- 1 - (cfm["1","1"]/(length(x)-cfm["0","0"]))
    } else { # one of them have all 1s
      jaccardDist <- 1 - (cfm["1","1"]/(length(x)))
    }
  } else { # one of them is altogether missing all zeros
    jaccardDist <- 0
  }
  return(jaccardDist)
}

# generate Clusters --------------

getAlgoWeights <- function(sliderWeight){
  algoWeightMap <- data.frame(sliderWeight=-5:5,algoWeight=c(-10^6,-100,-10,-1,-0.1,0,0.1,1,10,100,1000))
  tmp <- data.frame(sliderWeight=sliderWeight) %>% inner_join(algoWeightMap,by="sliderWeight")
  weight <- tmp$algoWeight
  names(weight) <- names(sliderWeight)
  return(weight)
}

generateCluster <- function(dat,clusInfo,typeOfClustering="hclust"){
  clusInfo$typeOfClustering <- typeOfClustering
  mydist <- populateDistanceMatrix(dat,getDist,clusInfo)
  clusInfo[["distMatrix"]] <- mydist
  if(typeOfClustering=="hclust"){
    clus2 <- cluster::agnes(x = as.dist(mydist),diss = T)
    clusterNumbers <- cutree(clus2, k=clusInfo$numberOfGroup) # cut tree into 5 clusters
  }else if(typeOfClustering=="pam"){
    clus1 <- cluster::pam(x = as.dist(mydist),diss = T,k = clusInfo$numberOfGroup) 
    clusterNumbers <- clus1$clustering
  }
  clusInfo[["clusterNumbers"]] <- clusterNumbers
  clusterIndices <- list()
  for(clusNo in unique(clusterNumbers)){
    clusterIndices[[clusNo]] <- which(clusterNumbers==clusNo)
  }
  clusInfo[["memberClusterMap"]] <- clusterIndices
  
  #clusInfo[["clusterPerformance"]] <- getClusteringPerformance(dat,clusInfo)
  #clusInfo[["ClusterError"]] <- getClusterError(clusInfo)
  
  return(clusInfo)
}

setupDocumentTermFrequencyForTextCols <- function(dat,clusInfo){
  listSeparator <- ","
  colNames <- names(clusInfo$colTypes)
  # List from a set
  #listfromsetidx <- colNames[which(clusInfo$colTypes=="MultiChoice")]
  listfromsetidx <- colNames[which(grepl(pattern = "MultiChoice",x = clusInfo$colTypes))]
  for(i in listfromsetidx){
    dat[[i]][is.na(dat[[i]])] <- "" # make NAs as empty strings
    tmp <- stripWhitespace(dat[[i]]) # strip multiple white spaces to single white space
    tmp <- gsub(" ,| , |, ",",",tmp) # strip whitespaces around comma
    tmp <- gsub(pattern = " ",replacement = "_",x = tmp)
    #tmp <- gsub(pattern = " ",replacement = "",x = dat[[i]])
    tmp <- gsub(pattern = listSeparator,replacement = " ",x = tmp)
    tmp <- paste0(".",gsub(" ",". .",tmp),".")
    askdoc <- VectorSource(tmp)
    askdoc <- VCorpus(askdoc)
    askdoc <- tm_map(askdoc, stripWhitespace)   # *Stripping whitespace   
    askdoc <- tm_map(askdoc, PlainTextDocument)  
    dtm <- DocumentTermMatrix(askdoc)  
    dtm <- as.data.frame(as.matrix(dtm))
    
    # Removing terms which are occuring only once was creating problems, since if a term "aa" came only once
    # than "aa" was removed and those with missing value and "aa" both were treated alike and person with
    # "aa" was also considered to be flexible to put anywhere which is wrong
    # as part of bug fix, below code was commented 
    
    #     termColumnSums <- colSums(dtm,na.rm = T)
    #     termColumnSums <- termColumnSums[termColumnSums>1]
    #     dtm <- dtm[,names(termColumnSums)]
    
    row.names(dtm) <- NULL
    if(ncol(dtm)>0){
      names(dtm) <- gsub("\\.","",names(dtm))
      if(length(clusInfo$excludeTags)>0){
        names(dtm) <- names(dtm)[!(names(dtm) %in% clusInfo$excludeTags)]
      }
      names(dtm) <- paste0(names(dtm),"__",i)
      dat <- cbind(dat,dtm)
    }
    
  }
  # Plain text
  plainTextidx <- colNames[which(clusInfo$colTypes=="PlainText")]
  for(i in plainTextidx){
    dat[[i]][is.na(dat[[i]])] <- "" # make NAs as empty strings
    #tmp <- gsub(pattern = " ",replacement = "",x = dat[[i]])
    #tmp <- gsub(pattern = listSeparator,replacement = " ",x = tmp)
    askdoc <- VectorSource(dat[[i]])
    askdoc <- VCorpus(askdoc)
    askdoc <- tm_map(askdoc, removePunctuation)
    askdoc <- tm_map(askdoc, removeNumbers)
    askdoc <- tm_map(askdoc, tolower)   # *Converting to lowercase:*    
    askdoc <- tm_map(askdoc, removeWords, getStopWordsCollabAI())
    askdoc <- tm_map(askdoc, stemDocument)
    askdoc <- tm_map(askdoc, stripWhitespace)   # *Stripping whitespace   
    askdoc <- tm_map(askdoc, PlainTextDocument)  
    dtm <- DocumentTermMatrix(askdoc)  
    #dtm <- removeSparseTerms(dtm, 0.1)
    dtm <- as.data.frame(as.matrix(dtm))
    dtm <- reduceDocumentTermMatrixDataFrame(dtm)
    row.names(dtm) <- NULL
    if(ncol(dtm)>0){
      names(dtm) <- paste0(names(dtm),"__",i)
      dat <- cbind(dat,dtm)
    }
  }
  return(dat)
}

getColumnTermFrequencyColumnMapping <- function(dat,clusInfo){
  columnTermFrequencyColumnMapping <- list()
  
  listCols <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("MultiChoice","PlainText"))]
  for(i in listCols){
    columnTermFrequencyColumnMapping[[i]] <- grep(pattern = paste0("__",i),x = names(dat),value = T)
  }
  
  # for ask offer columns, choose only topics which are common to both 
  # and make sure the order of ask & offer columns are same, since we compare x[ask] vs y[offer]
  askoffercols <- names(clusInfo$colTypes)[which(clusInfo$colTypes %in% c("MultiChoiceAskOffer"))]
  if(length(askoffercols)>0){
    askCols <- grep(pattern = paste0("__",askoffercols[1]),x = names(dat),value = T)
    offerCols <- grep(pattern = paste0("__",askoffercols[2]),x = names(dat),value = T)
    askColTopic <- gsub(pattern = paste0("__",askoffercols[1]),replacement = "",x = askCols)
    offerColTopic <- gsub(pattern = paste0("__",askoffercols[2]),replacement = "",x = offerCols)
    commonTopic <- intersect(askColTopic,offerColTopic)
    if(length(commonTopic)>0){
      columnTermFrequencyColumnMapping[[askoffercols[1]]] <- paste0(commonTopic,"__",askoffercols[1])
      columnTermFrequencyColumnMapping[[askoffercols[2]]] <- paste0(commonTopic,"__",askoffercols[2])  
    }
  }
  
  return(columnTermFrequencyColumnMapping)
}

getAvgNumOfItemForMultiChoiceColumn <- function(dat,clusInfo){
  avgNumOfItem <- list()
  for(nm in names(clusInfo$columnTermFrequencyColumnMapping)){
    dattmp <- dat[,clusInfo$columnTermFrequencyColumnMapping[[nm]]]
    if(!is.null(ncol(dattmp)) && ncol(dattmp)>1)
      avgNumOfItem[[nm]] <- max(c(3,round(mean(rowSums(dattmp),na.rm = T),digits = 0)))
    else avgNumOfItem[[nm]] <- 1
  }
  clusInfo$avgNumOfItemForMultiChoiceColumn <- avgNumOfItem
  return(clusInfo)
}

getNumericColumnRangeDifference <- function(dat,clusInfo){
  out <- numeric()
  listCols <- names(clusInfo$colTypes)[which(clusInfo$colTypes == "Numeric")]
  for(nm in listCols){
    out[nm] <- max(dat[,nm],na.rm = T) - min(dat[,nm],na.rm = T)
  }
  return(out)
}

createGroups <- function(dat,weight,colTypes,groupSize,importantTags=NULL,excludeTags=NULL,hardSepComb=NULL,assignTagWeightByFreq=T,numberOfGroup=NULL,warningMsgs=character()){
  dat[dat==""] <- NA # this is required to treat blanks as missing value (which matches with anything) else, separation/combination will try to match blanks
  if(!is.null(numberOfGroup)){ # numberOfGroup if mentioned than that gets priority, ideally both of them should not be allowed to be specified but to have minimum disrupt to old code, this hack is used.
    groupSize <- floor(nrow(dat)/numberOfGroup)
  } else {
    numberOfGroup <- floor(nrow(dat)/groupSize)
  }
  if(numberOfGroup==1) numberOfGroup <- 2 #atleast have two groups
  weight <- weight[weight!=0]
  typeOfClustering <- "hclust"
  colTypes <- colTypes[names(weight)]
  sliderWeight <- weight
  weight <- getAlgoWeights(weight)
  importantTags <- gsub(pattern = " ",replacement = "_",x = importantTags) # replace space by underscore since later on anyways they will be replaced
  clusInfo <- list(sliderWeight=sliderWeight,weight=weight,colTypes=colTypes,numberOfGroup=numberOfGroup,
                   idealClusterSize=groupSize,datColNames=names(dat),distanceType="SimilarityBased",
                   importantTags=importantTags,excludeTags=excludeTags,hardSepComb=hardSepComb,
                   warningMsgs=warningMsgs)
  dat <- setupTimeZoneColumn(dat,clusInfo)
  dat <- setupDocumentTermFrequencyForTextCols(dat,clusInfo)
  clusInfo$columnTermFrequencyColumnMapping <- getColumnTermFrequencyColumnMapping(dat,clusInfo)
  clusInfo <- getAvgNumOfItemForMultiChoiceColumn(dat,clusInfo)
  clusInfo$numericColRangeDiff <- getNumericColumnRangeDifference(dat,clusInfo)
  if(length(importantTags)>0){
    clusInfo$importantTagDetail <- setupImportantTags(dat,clusInfo)
  }
  print(paste0("distance calculation starting... ",Sys.time()))
  clusInfo <- generateCluster(dat = dat,clusInfo=clusInfo,typeOfClustering = typeOfClustering)
  print(paste0("distance calculation & clustering completed... ",Sys.time()))
  clusInfo <- balanceClusterSize(clusInfo)
  print(paste0("Balance clustering done... ",Sys.time()))
  clusInfo <- performMovementsToImproveClusters(clusInfo)
  print(paste0("Randomised performance improvement done... ",Sys.time()))
  if(!is.null(clusInfo$hardSepComb)){
    clusInfo <- balanceExplicitCombConstraint(clusInfo)
    print(paste0("Explicit hard separation combination done... ",Sys.time()))
  }
  try({clusInfo$teamProfileData <- profileAllTeams(dat,clusInfo)
  clusInfo$clusterPerformance <- getClusteringPerformance(dat,clusInfo) 
  print(paste0("Team profiling done... ",Sys.time()))})
  
  return(clusInfo)
}

setupTimeZoneColumn <- function(dat,clusInfo){
  timeZoneMap <- data.frame(timezone=c('A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','India')
                            ,utctz=c(1:12,-1:-12,0,5.5),stringsAsFactors = F)
  timzoneColName <- names(clusInfo$colTypes)[which(clusInfo$colTypes=="TimeZone")]
  if(length(timzoneColName)>0){
    dat[[timzoneColName]] <- as.character(dat[[timzoneColName]])
    codestr <- paste0("dat %>% inner_join(timeZoneMap,by=c('",timzoneColName,"'='timezone'))")
    dat <- eval(parse(text=codestr))
    dat[[timzoneColName]] <- dat$utctz
    dat$utctz <- NULL  
  }
  return(dat)
}

getStopWordsCollabAI <- function(){
  words <- c("learn","like","play","love","around","better","make","think","able","best")
  words <- c(words,stopwords("english"))
  return(words)
}

reduceDocumentTermMatrixDataFrame <- function(dat){
  termInMoreThan1Doc <- colSums(dat)
  termInMoreThan1Doc <- termInMoreThan1Doc[termInMoreThan1Doc>1]
  dat <- dat[,names(termInMoreThan1Doc)]
  return(dat)
}

# Misc --------------
identifyColumnTypes <- function(dat,questionCategory=NULL){
  colnm <- names(dat)
  colType <- list()
  sampsize <- ifelse(nrow(dat)>100,100,nrow(dat))
  for(nm in colnm){
    x <- sample(x = dat[[nm]],size = sampsize)
    comp <- sum(grepl(pattern = ",",x = x))
    if(comp>0) colType[[nm]] <- "MultiChoice"
    else colType[[nm]] <- "SingleChoice"
  }
  if(!is.null(questionCategory) && nrow(questionCategory)>0){
    askofferQuest <- questionCategory %>% filter(category==QuestionCategoryId$MultiChoiceAskOffer$CategoryId)
    if(nrow(askofferQuest)>0){
      # Additional_ask_offer_start
      for(pair in 1:(nrow(askofferQuest)/2)){
        askofferQuest <- questionCategory %>% filter(category==QuestionCategoryId$MultiChoiceAskOffer$CategoryId, askOfferPair == pair)
        colNamesForAskOffer <- paste0("quest",askofferQuest$questionId)
        colType[colNamesForAskOffer] <- paste0(QuestionCategoryId$MultiChoiceAskOffer$ColTypeName,"_pair",pair)
      }
      # Additional_ask_offer_end
      
    }
    
    # Assign Network Who Knows Who Type
    NetworkWhoKnowsWhoQuest <- questionCategory %>% filter(category==QuestionCategoryId$NetworkWhoKnowsWho$CategoryId)
    if(nrow(NetworkWhoKnowsWhoQuest)>0){
      colNamesForNetworkWhoKnowsWhoQuest <- paste0("quest",NetworkWhoKnowsWhoQuest$questionId)
      colType[colNamesForNetworkWhoKnowsWhoQuest] <- QuestionCategoryId$NetworkWhoKnowsWho$ColTypeName
    }
  }
  return(colType)
}

setupImportantTags <- function(dat,clusInfo){
  importantTags <- clusInfo$importantTags
  importantTagDetail <- list()
  importantTermsWeightFactor <- 2
  columnTermFrequencyColumnMapping <- clusInfo$columnTermFrequencyColumnMapping
  for(nm in names(columnTermFrequencyColumnMapping)){
    terms <- columnTermFrequencyColumnMapping[[nm]]
    importantTerms <- terms[terms %in% paste0(importantTags,"__",nm)]
    if(length(importantTerms)>0){
      tmp <- list()
      tmp$importantTermColumnName <- importantTerms
      tmp$lessImportantTermColumnName <- terms[!(terms %in% paste0(importantTags,"__",nm))]
      
      totalNumOfTerms <- length(terms)
      numOfImportantTerms <- length(importantTerms)
      pcntgWeightOfImportantTerms <- numOfImportantTerms/totalNumOfTerms
      
      pcntgWeightOfImportantTerms <- pcntgWeightOfImportantTerms*importantTermsWeightFactor
      if(pcntgWeightOfImportantTerms < 0.2) pcntgWeightOfImportantTerms <-0.2
      else if(pcntgWeightOfImportantTerms > 0.8) pcntgWeightOfImportantTerms <- 0.8
      tmp$pcntgWeightOfImportantTerms <- pcntgWeightOfImportantTerms
      
      tmp$pcntgWeightOfLessImportantTerms <- 1-pcntgWeightOfImportantTerms
      importantTagDetail[[nm]] <- tmp
    }
  }
  return(importantTagDetail)
}
