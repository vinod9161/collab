source("CollaborationAI/rscripts/generateSet.R")
source("CollaborationAI/rscripts/memberMovement.R")
source("CollaborationAI/rscripts/randomizedImprovement.R")
source('CollaborationAI/rscripts/explicitSepCombConstraint.R')

datFilePath <- "UHG/Dieseases.csv"
groupSize <- 6

dat <- fread(datFilePath,stringsAsFactors = F,data.table=F)
names(dat) <- gsub(pattern = " ",replacement = ".",x = names(dat))
colNames <- names(dat)
colNames <- colNames[!grepl(pattern = "first.name|last.name|full.name",x = tolower(colNames))]

# Print
print(paste(paste0(colNames,"=0"),collapse = ",")) # print default weight
colTypes <- unlist(identifyColumnTypes(dat[,colNames]))
print(paste(paste0(names(colTypes),"='",colTypes,"'"),collapse=", "))
# end print

weight <- c(Community=-4,Team.Set.2=0,Diseases=5,Hobbies=4)
colTypes <- c(Community='SingleChoice', Team.Set.2='SingleChoice', Diseases='MultiChoice', Hobbies='MultiChoice')
importantTags <- ""

createGroups <- function(dat,weight,colTypes,groupSize,importantTags="",assignTagWeightByFreq=T){
  numberOfGroup <- floor(nrow(dat)/groupSize)
  weight <- weight[weight!=0]
  typeOfClustering <- "hclust"
  colTypes <- colTypes[names(weight)]
  weight <- getAlgoWeights(weight)
  #names(dat) <- gsub(pattern = "\\.",replacement = "",x = names(dat))
  clusInfo <- list(weight=weight,colTypes=colTypes,numberOfGroup=numberOfGroup,
                   idealClusterSize=groupSize,datColNames=names(dat),distanceType="SimilarityBased")
  
  clusInfo <- generateCluster(dat = dat,clusInfo=clusInfo,typeOfClustering = typeOfClustering)
  
  return(clusInfo)
}

clusInfo <- createGroups(dat,weight,colTypes,groupSize,importantTags = importantTags)
dat$AlgoTeamSet <- clusInfo$clusterNumbers

write.csv(dat[,c(clusInfo$datColNames,"AlgoTeamSet")],"GroupResult.csv")
write.csv(clusInfo$clusterPerformance,"GroupResultValidation.csv")