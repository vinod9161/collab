# # Prod config detail ------------------
mySQLUser <- "collab"
mySQLPwd <- "C0ll@2@Br!3k"
mySQLHost <- "localhost"
mySQLDBName <- "collab_prod"
rootFolder <- "/var/www/vhosts/collaboration/development-brickwin-ui/Rcode/"
# #rootFolder <- "/home/brick-prod/testalgo/Rcode/"

# Libraries to load ----------------
library(dplyr)
library(tidyverse)
library(data.table)
library(tm)
library(stringr)
library(jsonlite)
library(RMySQL)
library(tidyr)
library(RCurl)
library(curl)

source(paste0(rootFolder,'uiIntegration.R'))
source(paste0(rootFolder,'generateSet.R'))
source(paste0(rootFolder,'memberMovement.R'))
source(paste0(rootFolder,'randomizedImprovement.R'))
source(paste0(rootFolder,'explicitSepCombConstraint.R'))
source(paste0(rootFolder,'profileTeams.R'))
source(paste0(rootFolder,'warningMsgs.R'))
#source(paste0(rootFolder,'miscUtil.R'))

#source(paste0('https://raw.githubusercontent.com/Swapnil2011/Rubicon/main/weights.R?token=ADJ5F3WTWQGP7J4W4AOVDNDAWT5NO'))

event_teamset_Id <- commandArgs(trailingOnly = T)[1]
# event_teamset_Id <- '5709'
runStatus <- 0
#print(event_teamset_Id)

#print(dat)
try({
  eventdat <- readEventData(eventTeamSetId = event_teamset_Id)
  clusInfo <- createGroups(dat = eventdat$answerDat,weight = eventdat$weight,colTypes = eventdat$colTypes,
                           groupSize = eventdat$groupSize,importantTags=eventdat$importantTags,excludeTags=eventdat$excludeTags,
                           hardSepComb=eventdat$hardSepComb,warningMsgs=eventdat$warningMsgs,numberOfGroup=eventdat$numberOfGroups)
  
  writeAlgoTeamsetToDB(event_teamset_Id,clusInfo,eventdat$answerDat)
  runStatus <- 1
  print(paste0("Algo results written to DB...1234 ",Sys.time())) 
})
writeRunStatusMsgToDB(event_teamset_Id = event_teamset_Id,status = runStatus)
readEventData(eventTeamSetId = event_teamset_Id)
#print(eventdat)
