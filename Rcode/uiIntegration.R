readEventData <- function(eventTeamSetId){
  # select SQL for pulling data
  selectSQLEventTeamSet <- "select event_id as eventId,customer_input as custInputJson from event_teamsets where id=#event_teamset_id#"
  selectSQLAnswerData <- "select event_id as eventId, attendie_id as memberId,question_id as questionId, tags as answer from answers where event_id=#event_id#"
  selectSQLQuestionCategory <- "SELECT id as questionId,category_flag as category,AskOfferQuestionPair as askOfferPair FROM questions where category_flag > 0 and id in (#questionIds#)"
  
  warningMsgs <- character()
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  selectSQLEventTeamSet <- gsub(pattern = "#event_teamset_id#",replacement = event_teamset_Id,x = selectSQLEventTeamSet)
  customerInputJson <- dbGetQuery(conn,selectSQLEventTeamSet)
  custInputJson <- customerInputJson$custInputJson[1]
  eventId <- customerInputJson$eventId[1]
  custInput <- fromJSON(txt = custInputJson)
  
  selectSQLAnswerData <- gsub(pattern = "#event_id#",replacement = eventId,x = selectSQLAnswerData)
  answerDat <- dbGetQuery(conn,selectSQLAnswerData)
  
  strQuestionIds <- paste(custInput$q_weights$q_id,collapse = ",")
  selectSQLQuestionCategory <- gsub(pattern = "#questionIds#",replacement = strQuestionIds,x = selectSQLQuestionCategory)
  questionCategory <- dbGetQuery(conn,selectSQLQuestionCategory)
  
  if(ncol(custInput$q_weights)>1){
    #Below code removes duplicate answer entries by persons (in particular for quick connector)
    #Below line reverses the order of entry so the last entry is displayed first, this is implementation specific detail - 
    # since we are using duplicated which removes subsequent duplicates
    answerDat <- answerDat %>% mutate(EntryOrder=1:n()) %>% arrange(desc(EntryOrder)) %>% mutate(EntryOrder=NULL)
    answerDat <- answerDat[!duplicated(paste0(answerDat$memberId,"_",answerDat$questionId)),]
    
    answerDat <- spread(data = answerDat,key = questionId,value = answer)
  }
  names(answerDat) <- c(names(answerDat)[1:2],paste0("quest",names(answerDat)[3:ncol(answerDat)]))
  
  weight <- as.integer(custInput$q_weights$qwValue)
  names(weight) <- paste0("quest",custInput$q_weights$q_id)
  
  
  
  if(!is.null(custInput$previousEventTeamSets)){
    strsql <- paste0("select event_teamset_id, member_id, team_id from event_teamset_members where event_teamset_id in (",
                     paste(custInput$previousEventTeamSets$event_teamset_id,collapse=","),")")
    previousTSData <- dbGetQuery(conn,strsql)
    if(nrow(previousTSData)>0){
      for(tsid in custInput$previousEventTeamSets$event_teamset_id){
        prevTSAsAnswer <- data.frame(memberId=answerDat$memberId)
        previousTSDataForThisTeamSet <- previousTSData %>% filter(event_teamset_id==tsid) %>% select(member_id,team_id)
        if(nrow(previousTSDataForThisTeamSet)==0) {
          warningMsgs <- c(warningMsgs,gsub("#event_teamset_id#",tsid,WARNING_MSGS$PREVIOUS_EVENT_TEAM_SET_DATA_NOT_FOUND))
        }
        prevTSAsAnswer <- prevTSAsAnswer %>% left_join(previousTSDataForThisTeamSet,by=c("memberId"="member_id"))
        names(prevTSAsAnswer)[which(names(prevTSAsAnswer)=="team_id")] <- paste0("ts",tsid)
        answerDat <- answerDat %>% left_join(prevTSAsAnswer,by="memberId")
      }
      
      
      newNames <- c(names(weight),paste0("ts",custInput$previousEventTeamSets$event_teamset_id))
      weight <- c(weight,as.integer(custInput$previousEventTeamSets$qwValue))
      names(weight) <- newNames
    }
  }
  
  colTypes <- identifyColumnTypes(answerDat,questionCategory)
  colTypes <- unlist(colTypes)
  
  # if Network question is there, need to additionally pull member Names
  if(QuestionCategoryId$NetworkWhoKnowsWho$ColTypeName %in% colTypes){
    selectSqlAttendiesName <- "SELECT a.id,a.first_name,a.last_name FROM attendies a inner join answers b on a.id = b.attendie_id where b.event_id = #event_id#"
    selectSqlAttendiesName <- gsub(pattern = "#event_id#",replacement = eventId,x = selectSqlAttendiesName)
    memberNames <- dbGetQuery(conn,selectSqlAttendiesName)
    # memberNames$memberName <- paste(memberNames$last_name,memberNames$first_name,sep=" ")
    memberNames$memberName <- paste(memberNames$first_name,memberNames$last_name,sep=" ")
    memberNames <- memberNames[,c("id","memberName")]
    memberNames <- unique(memberNames)
    answerDat <- answerDat %>% inner_join(memberNames,by=c("memberId"="id"))
  }
  
  RMySQL::dbDisconnect(conn)
  
  if(!is.null(custInput$groupSize)){
    groupSize <- as.integer(custInput$groupSize) 
    numberOfGroups <- NULL
  } else {
    numberOfGroups <- as.integer(custInput$numberOfGroups)
    groupSize <- NULL
  }
  
  importantTags <- custInput$include_tags
  excludeTags <- custInput$exclude_tags
  
  if(!is.null(custInput$p_exclude)) {
    answerDat <- answerDat[which(!(answerDat$memberId %in% custInput$p_exclude)),]}
  
  hardSepComb <- custInput$p_together
  if(class(hardSepComb)=="matrix") hardSepComb <- split(hardSepComb,1:nrow(hardSepComb))
  
  if(!is.null(hardSepComb)){
    tmpMemberIds <- answerDat$memberId
    for(i in 1:length(hardSepComb)){
      for(j in 1:length(hardSepComb[[i]])){
        hardSepComb[[i]][j] <- which(tmpMemberIds==hardSepComb[[i]][j])
      }
    }
  }
  
  out <- list(weight=weight,colTypes=colTypes,groupSize=groupSize,answerDat=answerDat,
              importantTags=importantTags,excludeTags=excludeTags,hardSepComb=hardSepComb,warningMsgs=warningMsgs,numberOfGroups=numberOfGroups)
  return(out)
}

writeAlgoTeamsetToDB <- function(event_teamset_Id,clusInfo,answerDat){
  algoOut <- data.frame(event_teamset_Id=event_teamset_Id,member_id=answerDat$memberId,team_id=clusInfo$clusterNumbers)
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  RMySQL::dbWriteTable(conn,name = "event_teamset_members",value = algoOut,append=T,row.names = F)
  try({
    if(!is.null(clusInfo$teamProfileData)){
      #       teamtags <- clusInfo$teamProfileData %>% mutate(event_teamset_Id=event_teamset_Id,key_type="",value=Proportion*100) %>%  select(event_teamset_Id,team_id=clusterNumber,key_type,key=tagOrAnswer,value)
      #       RMySQL::dbWriteTable(conn,name = "team_keyvalue_pairs",value = teamtags,append=T,row.names = F)
      teamtags <- clusInfo$teamProfileData %>%  mutate(event_teamset_id=event_teamset_Id) %>% 
        select(event_teamset_id,team_id,entity_id,entity_type,rating_type,display_name,rating_value)
      RMySQL::dbWriteTable(conn,name = "team_profiles",value = teamtags,append=T,row.names = F)
    }
  })
  writeWarningMsgToDB(conn,clusInfo,event_teamset_Id)
  RMySQL::dbDisconnect(conn)
}

writeWarningMsgToDB <- function(conn,clusInfo,event_teamset_Id){
  if(length(clusInfo$warningMsgs)>0){
    sqlUpdate <- "update event_teamsets set warning_msg = '#warningMsg#' where id = #event_teamset_id#"
    warningMsg <- paste(clusInfo$warningMsgs,collapse = "; ")
    sqlUpdate <- gsub(pattern = "#warningMsg#",replacement = warningMsg,x = sqlUpdate)
    sqlUpdate <- gsub(pattern = "#event_teamset_id#",replacement = event_teamset_Id,x = sqlUpdate)
    RMySQL::dbSendQuery(conn = conn,statement = sqlUpdate)
  }
}

writeRunStatusMsgToDB <- function(event_teamset_Id,status){
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  sqlUpdate <- "update event_teamsets set status = #status# where id = #event_teamset_id#"
  sqlUpdate <- gsub(pattern = "#status#",replacement = status,x = sqlUpdate)
  sqlUpdate <- gsub(pattern = "#event_teamset_id#",replacement = event_teamset_Id,x = sqlUpdate)
  RMySQL::dbSendQuery(conn = conn,statement = sqlUpdate)
  RMySQL::dbDisconnect(conn)
}

removeStaleDataForOldEventRun <- function(event_teamset_Id){
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  deleteSqls <- c(
    "delete from team_profiles where event_teamset_id = #event_teamset_id#",
    "delete from event_teamset_members where event_teamset_id = #event_teamset_id#",
    "delete from team_keyvalue_pairs where event_teamset_id = #event_teamset_id#"
  )
  deleteSqls <- gsub(pattern = "#event_teamset_id#",replacement = event_teamset_Id,x = deleteSqls)
  for(sqlstr in deleteSqls){
    RMySQL::dbSendQuery(conn = conn,statement = sqlstr)  
  }
  RMySQL::dbDisconnect(conn)
}