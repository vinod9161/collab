WARNING_MSGS <- list(
  PREVIOUS_EVENT_TEAM_SET_DATA_NOT_FOUND="Previous event team data not found (id:#event_teamset_id#)"
)

addWarningMsg <- function(clusInfo,warningText){
  if(is.null(clusInfo$warningMsgs)) clusInfo$warningMsgs <- character()
  clusInfo$warningMsgs <- c(clusInfo$warningMsgs,warningText)
  return(clusInfo)
}