# Prod config detail ------------------
mySQLUser <- "collab"
mySQLPwd <- "C0ll@2@Br!3k"
mySQLHost <- "localhost"
mySQLDBName <- "collab_prod"
rootFolder <- "/var/www/vhosts/collaboration/development-brickwin-ui/Rcode/"
#rootFolder <- "/home/brick-prod/testalgo/Rcode/"

# Local config detail
# mySQLUser <- "collab"
# mySQLPwd <- "collab123"
# mySQLHost <- "localhost"
# mySQLDBName <- "peoplescience_new"
# rootFolder <- "C:/Users/Mohammed.Jamal/Documents/brickwin/CollaborationAI/rscripts/"
# rootFolder <- "C:/Users/Mohammed.Jamal/Documents/brickwin/CollaborationAI/Peoplescience/Rcode/"
R.version.string
packages = c("RCurl","data.table","xml2","dplyr", "tidyr","visNetwork","RNeo4j","RMySQL","RCurl","igraph","rjson")
package.check <- lapply(
  packages,
  FUN = function(x) {
    if (!require(x, character.only = TRUE)) {
      str1 = x
      str2 = ' Not Installed'
      result = paste(str1,str2)    
      print (result)
    }else{
      str1 = x
      str2 = ' Installed version = '
      str3 = packageVersion("data.table")
      result = paste(str1,str2,str3)     
      # print(packageVersion("data.table")) 
      print (result)
    }
  }
)

die;
# Libraries to load ----------------
library(dplyr)
library(data.table)
library(tm)
library(stringr)
library(jsonlite)
library(RMySQL)
library(tidyr)

source(paste0(rootFolder,'uiIntegration.R'))
source(paste0(rootFolder,'generateSet.R'))
source(paste0(rootFolder,'memberMovement.R'))
source(paste0(rootFolder,'randomizedImprovement.R'))
source(paste0(rootFolder,'explicitSepCombConstraint.R'))
source(paste0(rootFolder,'profileTeams.R'))
source(paste0(rootFolder,'warningMsgs.R'))
source(paste0(rootFolder,'miscUtil.R'))

event_teamset_Id <- commandArgs(trailingOnly = T)[1]

runStatus <- 0
try({
	eventdat <- readEventData(eventTeamSetId = event_teamset_Id)
	clusInfo <- createGroups(dat = eventdat$answerDat,weight = eventdat$weight,colTypes = eventdat$colTypes,
	                       groupSize = eventdat$groupSize,importantTags=eventdat$importantTags,excludeTags=eventdat$excludeTags,
	                       hardSepComb=eventdat$hardSepComb,warningMsgs=eventdat$warningMsgs,numberOfGroup=eventdat$numberOfGroups)
	writeAlgoTeamsetToDB(event_teamset_Id,clusInfo,eventdat$answerDat)
	runStatus <- 1
	print(paste0("Algo results written to DB... ",Sys.time()))  
})
writeRunStatusMsgToDB(event_teamset_Id = event_teamset_Id,status = runStatus)