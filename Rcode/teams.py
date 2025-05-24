import pandas as pd
import sys
import mysql.connector
import json
event_teamset_id= sys.argv[1]
final_team = []
perfect_team = []
single_Perfect_team = []
partial_team = []
single_partial_team = []
final_match_team = []
selected_member = []
single_member = []

dic = {'perfect_team': [], 'partial_team': [], 'single_Perfect_team': [], 'single_partial_team': []}
  
dataBase = mysql.connector.connect(
  host ="localhost",
  user ="collab",
  password ="C0ll@2@Br!3k",
  database = "collab_prod"
)
# cursorObject = dataBase.cursor()
cursorObject = dataBase.cursor(dictionary=True)
team_set_query = "SELECT id,event_id,customer_input FROM event_teamsets where id=%s"% (event_teamset_id)
cursorObject.execute(team_set_query)
team_set_result = cursorObject.fetchone()
event_id = team_set_result['event_id']
customer_input = team_set_result['customer_input']
sorted_string = json.loads(customer_input)
quest_id = [d.get('q_id') for d in sorted_string['q_weights']]
team_size = int(sorted_string['groupSize'])
if len(quest_id) >1:
  selectQuestionCategory = "SELECT id as questionId,category_flag as category,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id IN %(ids)s"% {
  'ids': tuple(quest_id)}
else:
  selectQuestionCategory = "SELECT id as questionId,category_flag as category,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id =%s"% (quest_id[0])

cursorObject.execute(selectQuestionCategory)
question_result = cursorObject.fetchall()
category = [d.get('category') for d in question_result]
# print("Hello")
# exit()
if 9 in category:
  answer_query = "SELECT event_id, attendie_id,question_id, tags from answers where question_id=%s"% (quest_id[0])
  cursorObject.execute(answer_query)
  answer_result = cursorObject.fetchall()
  attendie_id = [d.get('attendie_id') for d in answer_result]
  tags = [[d.get('tags')] for d in answer_result]

  answer_query1 = "SELECT event_id, attendie_id,question_id, tags from answers where question_id=%s"% (quest_id[1])
  cursorObject.execute(answer_query1)
  answer_result1 = cursorObject.fetchall()
  attendie_id1 = [d.get('attendie_id') for d in answer_result1]
  tags1 = [[d.get('tags')] for d in answer_result1]
  # print(tags)
  # print(tags1)
  # exit()
  for i in range(len(tags)):
    for j in range(len(tags1)):
      if tags1[j][0]==tags[i][0] and tags1[i][0]==tags[j][0]: #1st condition : iterate each offer with single row of ASK(basedon index) and 2nd condition :iterate each Ask with single row of OFFER(based on index).
        if [attendie_id[i],attendie_id[j]] not in perfect_team:
          perfect_team.append([attendie_id[i],attendie_id[j]])
          dic['perfect_team'].append([attendie_id[i],attendie_id[j]])
      elif tags1[j][0]==tags[i][0]:
          single_Perfect_team.append([attendie_id[i],attendie_id[j]])
          dic['single_Perfect_team'].append([attendie_id[i],attendie_id[j]])
          if [attendie_id[i],attendie_id[j]] not in perfect_team:
            perfect_team.append([attendie_id[i],attendie_id[j]])
      else:
        # if [tags[i][0] for check in tags1[j][0].split(',') if check in tags[i][0]] and [tags[i][0] for check1 in tags1[j][0].split(',') if check1 in tags[i][0]]:
        if [tags[i][0] for check in tags1[j][0].split(',') if check in tags[i][0]] and [tags1[i][0] for check1 in tags[j][0].split(',') if check1 in tags1[i][0]]:
          # print(tags[i][0])
          # print(tags1[j][0].split(','))
          # exit()
          partial_team.append([attendie_id[i],attendie_id[j]])
          dic['partial_team'].append([attendie_id[i],attendie_id[j]])
          if [attendie_id[i],attendie_id[j]] not in perfect_team:
            perfect_team.append([attendie_id[i],attendie_id[j]])
        elif [tags[i][0] for check in tags1[j][0].split(',') if check in tags[i][0]]:
          single_partial_team.append([attendie_id[i],attendie_id[j]])
          dic['single_partial_team'].append([attendie_id[i],attendie_id[j]])
        
  # print(dic)


  final=[]
  for key in dic.keys():
    for new in dic[key]:
      if new not in final and new[::-1] not in final and new[0]!=new[1]:
        final.append(new)
  # print(final)

  new_final=[]
  check_list=[]
  already_added=[]
  for i in range(len(final)):
    l=[]
    if final[i][0] not in check_list and final[i][1] not in check_list:
      l.extend(final[i])
      for j in final:
        try:
          if final[i][0] in j and final[i]!=j and final[i][0] not in check_list:
            for k in j:
              if k not in l and k not in check_list:
                if len(l)<team_size:
                  l.append(k)                  
                else:
                  continue
        except Exception as e:
          pass
    new_final.append(l)
    check_list.extend(l)
  # print(check_list)
  my_team=[]
  for yes in new_final:
    if len(yes)>0:
      my_team.append(yes)


  for team in range(len(my_team)):
    for add in attendie_id:
      if add not in check_list:
        if len(my_team[team])<team_size:
          my_team[team].append(add)

sql = "INSERT INTO event_teamset_members (event_teamset_id, member_id,team_id) VALUES (%s, %s,%s)"
for p in range(len(my_team)):
  for q in range(len(my_team[p])):
    val = (event_teamset_id, my_team[p][q],p+1)
    cursorObject.execute(sql, val)
    dataBase.commit()
exit()
print(my_team)  