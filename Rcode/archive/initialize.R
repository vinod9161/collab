readConfigFile <- function(rootFolder){
  fileName <- paste0(rootFolder,"config.txt")
  configContent <- readLines(con = fileName)
  configContent <- configContent[!grepl(pattern = "###",x = configContent)]
  configContent <- configContent[!(gsub(pattern = " ",replacement = "",x = configContent)=="")] # remove extra empty lines
  configContent <- eval(parse(text=paste("list(",paste(configContent,collapse=","),")",sep="")))
  configContent$rootFolder <- rootFolder
  return(configContent)
}

getScriptPath <- function(){
  cmd.args <- commandArgs()
  m <- regexpr("(?<=^--file=).+", cmd.args, perl=TRUE)
  script.dir <- dirname(regmatches(cmd.args, m))
#   if(length(script.dir) == 0) stop("can't determine script dir: please call the script with Rscript")
#   if(length(script.dir) > 1) stop("can't determine script dir: more than one '--file' argument detected")
  if(length(script.dir) == 1){
    out <- script.dir
  } else{
    out <- ""
  }
  return(out)
}