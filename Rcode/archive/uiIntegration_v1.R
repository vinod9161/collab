readEventData <- function(eventTeamSetId,configContent){
  # select SQL for pulling data
  selectSQLEventTeamSet <- "select event_id as eventId,customer_input as custInputJson from event_teamset where id=#event_teamset_id#"
  selectSQLAnswerData <- "select event_id as eventId, attendie_id as memberId,question_id as questionId, tags as answer from answers where event_id=#event_id#"
  
  mySQLUser <- configContent$mySQLUser
  mySQLPwd <- configContent$mySQLPwd
  mySQLHost <- configContent$mySQLHost
  mySQLDBName <- configContent$mySQLDBName
  
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  selectSQLEventTeamSet <- gsub(pattern = "#event_teamset_id#",replacement = event_teamset_Id,x = selectSQLCustomerInputJson)
  customerInputJson <- dbGetQuery(conn,selectSQLEventTeamSet)
  custInputJson <- customerInputJson$custInputJson[1]
  eventId <- customerInputJson$event_id[1]
  custInput <- fromJSON(txt = custInputJson)
  
  selectSQLAnswerData <- gsub(pattern = "#event_id#",replacement = eventId,x = selectSQLAnswerData)
  answerDat <- dbGetQuery(conn,selectSQLAnswerData)
  RMySQL::dbDisconnect(conn)
  
  answerDat <- spread(data = answerDat,key = questionId,value = answer)
  names(answerDat) <- c(names(answerDat)[1:2],paste0("quest",names(answerDat)[3:ncol(dat)]))
  
  colTypes <- identifyColumnTypes(answerDat)
  colTypes <- unlist(colTypes)
  
  weight <- custInput$q_weights$qwValue
  names(weight) <- paste0("quest",custInput$q_weights$q_id)
  
  groupSize <- custInput$groupSize
  
  out <- list(weight=weight,colTypes=colTypes,groupSize=groupSize,answerDat=answerDat)
  return(out)
}

writeAlgoTeamsetToDB <- function(event_teamset_Id,clusInfo,answerDat,configContent){
  mySQLUser <- configContent$mySQLUser
  mySQLPwd <- configContent$mySQLPwd
  mySQLHost <- configContent$mySQLHost
  mySQLDBName <- configContent$mySQLDBName
  
  algoOut <- data.frame(event_teamset_Id=event_teamset_Id,member_id=answerDat$memberId,team_set_id=clusInfo$clusterNumbers)
  conn <- RMySQL::dbConnect(MySQL(),user=mySQLUser, password=mySQLPwd, host=mySQLHost,dbname=mySQLDBName)
  RMySQL::dbWriteTable(conn,name = "event_teamset_members",value = algoOut,append=T,row.names = F)
  RMySQL::dbDisconnect(conn)
}