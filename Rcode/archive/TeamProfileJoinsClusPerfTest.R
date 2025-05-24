TeamProfileJoinsClusPerfTest <- function(clusInfo){
  clusPerf <- clusInfo$clusterPerformance %>% select(team_id=TeamSet,ColumnName,Proportion)
  profDat <- clusInfo$teamProfileData
  
  # Rating for questions
  distinctQuestions <- grep(x=unique(clusPerf$ColumnName),pattern = "quest",value = T)
  out <- list()
  for(questName in distinctQuestions){
    questId <- as.integer(gsub(pattern = "quest",replacement = "",x = questName))
    clusPerftmp <- clusPerf %>% filter(ColumnName==questName)
    profDattmp <- profDat %>% filter(entity_id==questId) %>% mutate(ratingType=paste(entity_type,rating_type,sep="-")) %>% 
      select(team_id,rating_value,ratingType)
    out[[questName]] <- clusPerftmp %>% inner_join(profDattmp,by="team_id")
  }

  # Rating for Team
  clusPerftmp <- clusPerf %>% filter(ColumnName=="GroupSize") %>% mutate(ColumnName="Team (GroupSize)")
  profDattmp <- profDat %>% filter(entity_type=="Team") %>% mutate(ratingType=paste(entity_type,rating_type,sep="-")) %>% 
    select(team_id,rating_value,ratingType)
  out[["Team"]] <- clusPerftmp %>% inner_join(profDattmp,by="team_id")
  
  out <- rbind_all(out)
  out <- out %>% arrange(team_id)
}
