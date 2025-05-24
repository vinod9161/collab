import pandas as pd
import sys
import mysql.connector
import json
import math
from collections import Counter
import copy

event_teamset_id= sys.argv[1]
# url = sys.argv[1]
# df=pd.read_csv(url)
#connect to database
dataBase = mysql.connector.connect(
    host ="localhost",
    user ="root",
    password ="brickwin@123",
    database = "collab_prod"
)
cursorObject = dataBase.cursor(dictionary=True)
team_set_query = "SELECT id,event_id,customer_input FROM event_teamsets where id=%s"% (event_teamset_id)
cursorObject.execute(team_set_query)
team_set_result = cursorObject.fetchone()
event_id = team_set_result['event_id']
customer_input = team_set_result['customer_input']
dict_data=json.loads(customer_input)

# print(df.head())



col_name=['User ID','first_name','last_name','email']
preference=[]
question=[]
for i in dict_data.get('q_weights'):
    col_name.append('q_'+str(i.get('q_id')))
    question.append(int(i.get('q_id')))
    preference.append(['q_'+str(i.get('q_id')),i.get('qwValue')])

teams=[]
tags = []
repeated_id=[]
sorted_string = json.loads(customer_input)
quest_id = [d.get('q_id') for d in sorted_string['q_weights']]
if len(quest_id) >1:
    selectQuestionCategory = "SELECT id as questionId,category_flag as category,type,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id IN %(ids)s"% {'ids': tuple(quest_id)}
else:
    selectQuestionCategory = "SELECT id as questionId,category_flag as category,type,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id =%s"% (quest_id[0])

cursorObject.execute(selectQuestionCategory)
question_result = cursorObject.fetchall()

question_result = sorted(question_result, key=lambda x: quest_id.index(x['questionId']))

category = [d.get('category') for d in question_result]
qid = [d.get('questionId') for d in question_result]
ai_trained_qid = [d['questionId'] for d in question_result if (d['category'] !=5)]

askQuIdList=[]
for askQuId in range(len(category)):
    if(category[askQuId] ==9):
        askQuIdList.append(qid[askQuId])
for i in range(len(category)):
    preference[i].append(category[i])

for i in range(len(preference)):
    for j in range(i + 1, len(preference)):
        
        if preference[i][1]<0:
            pref_i=-(preference[i][1])
        else:
            pref_i=preference[i][1]
        if preference[j][1]<0:
            pref_j=-(preference[j][1])
        else:
            pref_j=preference[j][1]
        if pref_i > pref_j:
            preference[i], preference[j] = preference[j], preference[i]
preference=preference[::-1]
# Check if all elements have a value of 0 in the second position
all_zeros = all(item[1] == 0 for item in preference)

# START CODE FOR IF PREFERENCE 0 FOR EVERY QUESTION THEN BY DEFAULT WE TAKE PREFERENCE THIS
def custom_sort(item):
    if item[2] == 9:
        return (0, item)  # Priority 0 for Ask/Offer with index 9
    elif item[2] == 5:
        return (1, item)  # Priority 1 for index 5
    else:
        return (2, item)  # Priority 2 for all others

# Apply sorting if all_zeros is True
if all_zeros:
    preference.sort(key=custom_sort)
# END CODE

for pe in range(len(preference)):
    li = list(preference[pe][0].split("_"))
    # print(li[1])
    preference[pe][0]=li[1]

event_query = "SELECT id,participant_team_status,ai_tag_status FROM events where id=%s"% (event_id)
cursorObject.execute(event_query)
event_result = cursorObject.fetchone()
if event_result['participant_team_status'] ==1:
    attendees_query = "SELECT attendies.id,attendies.first_name,attendies.last_name FROM attendies where attendies.event_id=%s"
else:
    attendees_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies INNER JOIN answers ON attendies.id=answers.attendie_id where answers.attendie_id != '' AND attendies.event_id=%s GROUP BY answers.attendie_id"
val = (event_id,)
cursorObject.execute(attendees_query,val)
attendees_result = cursorObject.fetchall()
# print(attendees_result)
# exit('pp')
includeTeam = []
if event_result['participant_team_status'] ==1:
    # question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,questions.id as question_id FROM attendies LEFT JOIN answers ON attendies.id=answers.attendie_id INNER JOIN questions ON questions.event_id = attendies.event_id where attendies.event_id=%s"
    question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,GROUP_CONCAT(CASE WHEN answers.question_id = questions.id THEN answers.tags ELSE NULL END ) AS tags, questions.id AS question_id FROM attendies LEFT JOIN answers ON attendies.id = COALESCE(answers.attendie_id, answers.temp_attendie_id) INNER JOIN questions ON questions.event_id = attendies.event_id WHERE attendies.event_id = %s GROUP BY attendies.id, attendies.first_name, attendies.last_name, questions.id"
else:
    question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.ai_tags,answers.ai_categories,answers.question_id FROM attendies INNER JOIN answers ON attendies.id=answers.attendie_id where attendies.event_id=%s"

val = (event_id,)

cursorObject.execute(question_query,val)
question_result = cursorObject.fetchall()

data= pd.DataFrame(question_result)

new_dic = {}
ind_id = None
new_list = []
id_dict = {}  # To keep track of the index of each id in the new_list

for i in data.index:
    if data['id'][i] not in id_dict:
        # New id encountered
        new_dic = {
            'id': data['id'][i],
            'first_name': data['first_name'][i],
            'last_name': data['last_name'][i]
        }
        if pd.notna(data['question_id'][i]):  # Check if question_id is not NaN
            question_id = data['question_id'][i]
            invalid_ai_tags = [None, 'NA', 'N/A', '']
            if question_id in ai_trained_qid and event_result['ai_tag_status'] == 1:
                if data['ai_tags'][i] in invalid_ai_tags:
                    new_dic[question_id] = data['tags'][i]  # Use tags if ai_tags is invalid (None, NA, N/A, or empty)
                else:
                    new_dic[question_id] = data['ai_tags'][i]  # Use ai_tags if valid
                    new_dic[f"{question_id}_AI"] = data['ai_categories'][i]  # Adding _AI column
            else:
                new_dic[question_id] = data['tags'][i]
                
        new_list.append(new_dic)
        id_dict[data['id'][i]] = len(new_list) - 1  # Store the index of this id in new_list
    else:
        # Existing id, update the dictionary
        index = id_dict[data['id'][i]]
        if pd.notna(data['question_id'][i]):  # Check if question_id is not NaN
            question_id = data['question_id'][i]
            if question_id in ai_trained_qid and event_result['ai_tag_status'] == 1:
                new_list[index][question_id] = data['ai_tags'][i]
                new_list[index][f"{question_id}_AI"] = data['ai_categories'][i]  # Adding _AI column
            else:
                new_list[index][question_id] = data['tags'][i]

# Convert to DataFrame
data1 = pd.DataFrame(new_list)

data1.drop_duplicates(inplace=True)

data1.reset_index(inplace = True,drop=True)
df=data1

data1.drop_duplicates(inplace=True)

col_list = data1.columns.tolist()

col_list1={'id':'User ID'}
for col in col_list[3:]:
    col_list1[col]=str(col)

data1.reset_index(inplace = True,drop=True)
df=data1
df.rename(columns = col_list1, inplace = True)
df.head(50)

#backup code                                          
if 9 in category:
    df.rename(columns = {str(askQuIdList[0]):'Ask'}, inplace = True)
    df.rename(columns = {str(askQuIdList[1]):'Offer'}, inplace = True)
    for i in range(len(preference)):
        print(preference[i][0])
        if preference[i][0] == str(askQuIdList[0]):
            preference[i][0]='Ask'
        if preference[i][0] == str(askQuIdList[1]):
            preference[i][0]='Offer'

normal_column_name = [name[0] for name in preference if name[2]==6]
ask_column_name =[name[0] for name in preference if name[0]=='Ask']
offer_column_name =[name[0] for name in preference if name[0]=='Offer']
preference = [item for item in preference if item[0] != 'Offer']

df=df.fillna('')
import networkx as nx
final_node = []
for i in df.index:
    try:
        for prefer in preference:
            if prefer[2]==5:
                for word in df['{}'.format(prefer[0])][i].split(','):
                    node1 = df.loc[df['User ID'] == int(word)]
                    for j in node1.index:
                        final_node.append([df['User ID'][i],df['first_name'][i]+' '+df['last_name'][i],node1['User ID'][j]])
    except Exception as e:
        print(e)
try:        
    final_node = pd.DataFrame(final_node,columns=['User ID','Name','from_id'])

    G = nx.Graph()
    for index, row in final_node.iterrows():
        G.add_edges_from([(row['User ID'], row['from_id'])]) 
except Exception as e:
    pass

my_teamset_preference=5
try:
    previous_event_teamset_id =[]
    event_teamset_value =[]
    previous_team_list = []
    for v in dict_data.get('previousEventTeamSets'):
        previous_event_teamset_id.append(v.get('event_teamset_id'))
        event_teamset_value.append(v.get('qwValue'))

    for v in range(len(event_teamset_value)):
        if(event_teamset_value[v] < 0):
            previous_team_id = previous_event_teamset_id[v]
            previous_team_list.append(previous_event_teamset_id[v])
            previous_team_value = event_teamset_value[v]
            my_teamset_preference= previous_team_value
            # break

    if(previous_team_id):
        previous_team_id = [int(id) for id in previous_team_list]
        placeholders = ', '.join(['%s'] * len(previous_team_id))
        previous_teamset_query = f"""
            SELECT member_id, team_id,event_teamset_id 
            FROM event_teamset_members 
            WHERE event_teamset_id IN ({placeholders});
            """
        cursorObject.execute(previous_teamset_query, previous_team_id)
        previous_teamset_result = cursorObject.fetchall()
    result = {}
    for d in previous_teamset_result:
        key = (d['team_id'], d['event_teamset_id'])
        if key not in result:
            result[key] = []
        result[key].append(d['member_id'])

    my_first_teamset_list = [v for k, v in result.items()]
except Exception as e:
    my_first_teamset_list=[]

try:
    my_first_teamset_list1 = [[] for i in range(max(len(sublist1) for sublist1 in my_first_teamset_list))]

    # Use nested loops to transpose the elements of l into l1
    for sublist in my_first_teamset_list:
        for i, element in enumerate(sublist):
            my_first_teamset_list1[i].append(element)

    print(my_first_teamset_list1,'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    my_first_teamset_list2=[]
    for l in my_first_teamset_list1:
        for k in l:
            my_first_teamset_list2.append(k)
except Exception as e:
    print(e,'CCCCCCCCCCCCCCCCCCCCCCCCC')

if(len(dict_data['p_together'])) >0 :
    people_in_same_team=dict_data['p_together']
else:
    people_in_same_team = []
if(len(dict_data['p_different'])) >0 :
    people_in_diff_team=dict_data['p_different']
else:
    people_in_diff_team = []

try:
    if my_teamset_preference < 0:
        people_in_diff_team.extend(my_first_teamset_list)
except Exception as e:
    print(e)

people_out_from_team=dict_data['p_exclude']

for user_id_to_remove in people_out_from_team:
    df = df.drop(df[df['User ID'] == user_id_to_remove].index)

# print(preference)
# df.to_csv('AI_tags_27AugNormal_tags.csv',index=False)
# exit()
if len(people_out_from_team) > 0:
    df.reset_index(inplace=True, drop=True)
# df = df.applymap(lambda x: x.lower() if isinstance(x, str) else x)
df = df.applymap(lambda x: ','.join(tag.strip() for tag in x.lower().split(',')) if isinstance(x, str) else x)
current_team_index = 0
try:
    numberOfGroups = int(sorted_string['numberOfGroups'])
    attendees_result = len(df)

    # Calculate the base team size using floor division
    base_team_size = attendees_result // numberOfGroups

    # Calculate the remaining attendees
    remaining_attendees = attendees_result % numberOfGroups

    # Create a list to store the sizes of each group with the base team size
    group_sizes = [base_team_size] * numberOfGroups

    # Distribute the remaining attendees to some groups
    for i in range(remaining_attendees):
        group_sizes[i] += 1

    # Now, you can use the base_team_size as the constant team size
    # team_size = base_team_size

    print(group_sizes)
    # print("Team Size:", team_size)
    # exit()

    current_team_index = 0
    team_size = group_sizes[current_team_index]
except Exception as e:
    team_size = int(sorted_string['groupSize'])


#Include tag code
# team_include_keywords=['exercising','painting']
include_tags = dict_data.get('include_tags')
if include_tags and len(include_tags) > 0:
    team_include_keywords = include_tags
else:
    team_include_keywords = []

exclude_tags = dict_data.get('exclude_tags')
if exclude_tags and len(exclude_tags) > 0:
    team_exclude_keywords = exclude_tags
else:
    team_exclude_keywords = []

if include_tags==None:
    include_tags =[]
if exclude_tags == None:
    exclude_tags = []

if len(include_tags) == 0 or len(exclude_tags) == 0:
    if not all_zeros:
        preference = [item for item in preference if item[1] != 0]

team_include_keywords = [keyword.lower() for keyword in team_include_keywords]


mixed_include_keywords_team_normal = []
unique_ids = []

for include_tags in team_include_keywords:
    similar_tag_user_id = df[df[normal_column_name].apply(lambda x: x.str.contains(include_tags, na=False)).any(axis=1)]['User ID'].tolist()
    print(similar_tag_user_id,'kkkkkkkkkkkkkkkkkksssssssssssssssssss')
    non_repeated_id = []
    for tag_id in similar_tag_user_id:
        if tag_id not in unique_ids:
            non_repeated_id.append(tag_id)
    if len(non_repeated_id) > 0:        
        mixed_include_keywords_team_normal.append(non_repeated_id)
        unique_ids.extend(non_repeated_id)

mixed_include_keywords_team_ask = []    
for include_tags in team_include_keywords:
    similar_tag_user_id = df[df[ask_column_name].apply(lambda x: x.str.contains(include_tags, na=False)).any(axis=1)]['User ID'].tolist()
    print(similar_tag_user_id,'kkkkkkkkkkkkkkkkkksssssssssssssssssss')
    non_repeated_id = []
    for tag_id in similar_tag_user_id:
        if tag_id not in unique_ids:
            non_repeated_id.append(tag_id)
    if len(non_repeated_id) > 0:        
        mixed_include_keywords_team_ask.append(non_repeated_id)
        unique_ids.extend(non_repeated_id)
    
mixed_include_keywords_team_offer = []    
for include_tags in team_include_keywords:
    similar_tag_user_id = df[df[offer_column_name].apply(lambda x: x.str.contains(include_tags, na=False)).any(axis=1)]['User ID'].tolist()
    print(similar_tag_user_id,'kkkkkkkkkkkkkkkkkksssssssssssssssssss')
    non_repeated_id = []
    for tag_id in similar_tag_user_id:
        if tag_id not in unique_ids:
            non_repeated_id.append(tag_id)
    if len(non_repeated_id) > 0:
        mixed_include_keywords_team_offer.append(non_repeated_id)
        unique_ids.extend(non_repeated_id)

def distribute_teams(people,team_size):
    # Flatten the list of people in the same team
    same_people_list = [p for ppl in people_in_same_team for p in ppl]
    
    # Create a new list excluding elements from same_people_list
    filtered_people = [[person for person in team if person not in same_people_list] for team in people]

    new_teams = []

    for team in filtered_people:
        for i in range(0, len(team), team_size):
            new_teams.append(team[i:i + team_size])

    # Add the same_people_list as a separate team if not empty

    return new_teams
# Test the function with team_size = 4
people_in_normal_team = []
people_in_ask_team = []
people_in_offer_team = []
try:
    team_size = group_sizes[current_team_index]
except Exception as e:
    print(team_size)
    
people_in_normal_team.extend(distribute_teams(mixed_include_keywords_team_normal,team_size))

def create_teams(l1, l2, team_size):
    same_people_set = set(p for ppl in people_in_same_team for p in ppl)
    print(same_people_set,'PEOPLE IN SAME TEAM')
    l1 = [[elem for elem in sublist if elem not in same_people_set] for sublist in l1]
    l2 = [[elem for elem in sublist if elem not in same_people_set] for sublist in l2]
    result = []
    
    for sublist1, sublist2 in zip(l1, l2):

        i, j = 0, 0
        if len(sublist1) > 0 and len(sublist2) > 0:
            while i < len(sublist1) or j < len(sublist2):
                team = []
                contains_ask = False
                contains_offer = False
                while len(team) < team_size and (i < len(sublist1) or j < len(sublist2)):
                    if i < len(sublist1):
                        print(sublist1[i])
                        team.append(sublist1[i])
                        contains_ask = True
                        i += 1
                    if len(team) < team_size and j < len(sublist2):
                        team.append(sublist2[j])
                        contains_offer = True
                        j += 1
                    
                if contains_ask and contains_offer:
                    result.append(team)
    
    return result

# Function call
output = create_teams(mixed_include_keywords_team_ask, mixed_include_keywords_team_offer, team_size)
print(output)
for tm in output:
    if len(tm)>=team_size//2:
        teams.append(tm)
        repeated_id.extend(tm)

for tm in people_in_normal_team:
    if len(tm)>=team_size//2:
        teams.append(tm)
        repeated_id.extend(tm)        

try:
    if len(teams) > 0:
        current_team_index = len(teams)
        print(group_sizes[current_team_index])
except Exception as e:
    print('TeAm Size')

team_exclude_keywords = [keyword.lower() for keyword in team_exclude_keywords]
for col in preference:
    for tag in team_exclude_keywords:
        df[col[0]] = df[col[0]].str.replace(tag, ' ', regex=False)        
# df.to_csv('AI_tags_2Sep_tags4.csv',index=False)
# print(df,"sumit")
# df.to_csv('AI_tags_17Oct2.csv',index=False)
# exit()
try:
    for i in df.index:
        try:
            team_size = group_sizes[current_team_index]
        except Exception as e:
            print(team_size)
        print(i)
        if type(df['User ID'][i]) !=float:
            print(df['User ID'][i],'ASH',repeated_id)
            if df['User ID'][i] not in repeated_id:
                negative_node_list =[]
                count=1
                network_count=0
                negative_count=0
                pref_neg_list1 = []
                df_list = []#df_list
                for prefer in preference:
                    if type(df['{}'.format(prefer[0])][i]) !=float:
                        if prefer[2]==5 and prefer[1] >= 0:
                            if df['User ID'][i] not in repeated_id:

                                network_node = df.loc[df['User ID'] == df['User ID'][i]]
                                degree_sets=[]
                                try:
                                    for j in df["{}".format(prefer[0])][i].split(','):
                                        node1 = df.loc[df['User ID'] == int(j)]
                                        if str(df['User ID'][i]) in node1["{}".format(prefer[0])].tolist()[0].split(','):
                                            network_node = network_node.append(df.loc[df['User ID'] == int(j)])
                                    for j in df["{}".format(prefer[0])][i].split(','):
                                        if int(j) not in repeated_id:
                                            network_node = network_node.append(df.loc[df['User ID'] == int(j)])
                                            first_degree_network = nx.descendants_at_distance(G, int(j), distance=1)
                                            degree_sets.extend(first_degree_network)
    #                                         first_degree_network.remove(df['User ID'][i])
                                            for k in first_degree_network:
                                                if k not in repeated_id:
                                                    f_degree_network = nx.descendants_at_distance(G, k, distance=1)
                                                    for chk in f_degree_network:
                                                        if chk not in repeated_id:
                                                            if chk not in degree_sets:
                                                                degree_sets.append(chk)
                                                                s_degree_network = nx.descendants_at_distance(G, chk, distance=1)
                                                                for chk1 in s_degree_network:
                                                                    if chk1 not in degree_sets:
                                                                        degree_sets.append(chk1)
                                    degree_sets.extend(nx.descendants_at_distance(G, df['User ID'][i], distance=1))
                                    unique_network_list = []
                                    for j in degree_sets:
                                        if j not in unique_network_list:
                                            unique_network_list.append(j)
#                                         network_node = network_node.append(df.loc[df['User ID'] == j])
#                                     network_node = network_node[~network_node.index.duplicated(keep="first")]
#                                     df_list.append(network_node['User ID'].tolist())#df_list
                                    df_list.append(unique_network_list)
#                                     print('offfooooooooooooooo',main_node)
                                except Exception as e:
                                    print(e)
                                network_count = 1
                        elif prefer[2] ==5 and prefer[1] < 0:
                            if df['User ID'][i] not in repeated_id:
#                                 print(df['User ID'][i],'AAAAA')
                                network_node = df.loc[df['User ID'] == df['User ID'][i]]
                                degree_sets=[]
                                for j in df.index:
                                    if df["User ID"][j] not in repeated_id:
                                        if df["User ID"][j] not in degree_sets:
#                                             print('TTTTTTTTT',degree_sets)
                                            try:
                                                degree_sets.extend(nx.descendants_at_distance(G, df["User ID"][j], distance=1))
                                                network_node = network_node.append(df.loc[df['User ID'] == df['User ID'][j]])
                                            except Exception as e:
                                                print('PASSed')
                                                pass

                                network_count = 1
#                                 print(network_node,'HELLO')
                                df_list.append(network_node['User ID'].tolist())#df_list
                        elif prefer[2] ==9 and prefer[1] >= 0:
                            try:
                                main_node = pd.DataFrame(columns=list(df.columns))
                                temp_node2 = pd.DataFrame(columns=list(df.columns))
                                temp_node3 = pd.DataFrame(columns=list(df.columns))
                                def ask_offer1(i):
                                    if df['User ID'][i] not in repeated_id:
                                        ask_offer_list.append(df['User ID'][i])
                                        if len(ask_offer_list) == team_size:
                                            return ask_offer_list
                                        temp_s1 =[df['User ID'][i]]
                                        #First if check for FULL Ask to Offer and Full Offer to Ask
#                                         if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and type(df['Offer'][i]) !=float and len(df['Ask'][i]) > 0 and len(df['Offer'][i]) > 0:
                                        if len(str(df['Ask'][i])) > 0 and len(str(df['Offer'][i])) > 0:
                                            node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                            node1=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                            s1 = pd.merge(node, node1, how='inner', on=['User ID'])
                                            print(s1,'hi bro',node['User ID'].tolist(),node1['User ID'].tolist())
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
                                        #Second if check for Full Ask to Offer and splitted Offer to Ask
#                                         if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and len(df['Ask'][i]) > 0 and len(df['Offer'][i]) > 0:
                                        if len(str(df['Ask'][i])) > 0 and len(str(df['Offer'][i])) > 0:
                                            print("HELLO WORLD")
                                            node=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                            temp_node = df[df["{}".format("Ask")].str.contains('|'.join(df["{}".format("Offer")][i].split(',')))]
                                            print("HELLO WORLD1")
                                            s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                            
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
#                                             print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE222222')
                                        #Third if check for Full Offer to Ask and splitted Ask to offer
#                                         if type(df['User ID'][i]) !=float and type(df['Offer'][i]) !=float and len(df['Ask'][i]) > 0 and len(df['Offer'][i]) > 0:
                                        if len(str(df['Ask'][i])) > 0 and len(str(df['Offer'][i])) > 0:
                                            node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                            temp_node = df[df["{}".format("Offer")].str.contains('|'.join(df["{}".format("Ask")][i].split(',')))]
                                            
                                            s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
#                                             print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE33333333333333333')
                                        #Forth if check for split Offer to Ask and splitted Ask to offer    
                                        if type(df['User ID'][i]) !=float and (len(str(df['Ask'][i])) > 0 or len(str(df['Offer'][i])) > 0):
                                            if df['User ID'][i] not in repeated_id:
                                                temp_node2 = df[df["{}".format("Ask")].str.contains('|'.join(df["{}".format("Offer")][i].split(',')))]
                                                temp_node3 = df[df["{}".format("Offer")].str.contains('|'.join(df["{}".format("Ask")][i].split(',')))]

                                                try:
                                                    print(temp_node2,temp_node3)
                                                    s1 = pd.merge(temp_node2, temp_node3, how='inner', on=['User ID'])
                                                    for id1 in s1.index:
                                                        temp_s1.append(s1['User ID'][id1])
                                                except Exception as e:
                                                    pass
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE4444444444444444')
                                                #FIFTH CASE Full OFFER with ASK
                                                single_match_node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                                for id1 in single_match_node.index:
                                                    temp_s1.append(single_match_node['User ID'][id1])
#                                                 print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE555555555555555555555')
                                                #SIXTH CASE FULL ASK WITH OFFER
                                                single_match_node_offer=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                                for id1 in single_match_node_offer.index:
                                                    temp_s1.append(single_match_node_offer['User ID'][id1])
#                                                 print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE666666666666666666666')
                                                #SEVENTH CASE SPLITTED OFFER WITH ASK
#                                                 c=0
#                                                 c1=0
#                                                 for off_word in df["Offer"][i].split(','):
#                                                     node2 = df[df.Ask.str.contains(off_word,na=False)]              
#                                                     if len(node2.index)>0:
#                                                         if c1>c:
#                                                             temp_node2 = temp_node2.append(node2)
#                                                             c1 +=1
#                                                             c +=1
#                                                         else:
#                                                             temp_node2 = node2
#                                                             c1 +=1
#                                                 temp_node3 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                                for id1 in temp_node2.index:
                                                    temp_s1.append(temp_node2['User ID'][id1])
                                                #EIGHT CASE SPLITTED ASK WITH OFFER
#                                                 c=0
#                                                 c1=0
#                                                 for ask_word in df["Ask"][i].split(','):
#                                                     node2 = df[df.Offer.str.contains(ask_word,na=False)]              
#                                                     if len(node2.index)>0:
#                                                         if c1>c:
#                                                             temp_node2 = temp_node2.append(node2)
#                                                             c1 +=1
#                                                             c +=1
#                                                         else:
#                                                             temp_node2 = node2
#                                                             c1 +=1
                                                try:
                                                    temp_node3 = temp_node3[~temp_node3.index.duplicated(keep="first")]
                                                    for id1 in temp_node3.index:
                                                        temp_s1.append(temp_node3['User ID'][id1])
                                                except Exception as e:
                                                    pass
                                        fixed=[]
                                        for uid in temp_s1:
                                            if uid not in fixed:
                                                fixed.append(uid)
                                        print(fixed)
                                        for rep_id in repeated_id:
                                            try:
                                                fixed.remove(rep_id)
                                            except Exception as e:
                                                pass
                                        if len(first_fixed_list) == 0: #df_list   
                                            first_fixed_list.extend(fixed)#df_list
                                        for uid in fixed:
                                            if uid not in ask_offer_list and uid not in main_node['User ID'].tolist():
                                                user_index = df.index[df['User ID'] == uid].tolist()[0]
                                                break
                                        print('ASK TEST',i,ask_offer_list,user_index,uid,fixed)
                                        if len(ask_offer_list) < team_size:
                                            try:
                                                return ask_offer1(user_index)
                                            except Exception as e:
                                                return ask_offer_list #ASHOK ADDED THIS and REMOVE PASS under this line
#                                                     pass
                                        else:
                                            return ask_offer_list


                                ask_offer_list = []
                                first_fixed_list = []
                                ask_offer_team = ask_offer1(i)
                                ask_offer_team = ask_offer_team + first_fixed_list
#                                 df_list_node = pd.DataFrame(columns=list(df.columns)) #df_list
#                                 for user in ask_offer_team:
#                                     main_node = main_node.append(df[df['User ID'].eq(user)])
#                                     df_list_node = df_list_node.append(df[df['User ID'].eq(user)])#df_list
#                                 print(main_node,'1000000000000000000000000000000000000000000000000000000000000000000')

                                df_list.append(ask_offer_team)#df_list
#                                 if network_count==1:
#                                     network_node = network_node.append(main_node)
# #                                         main_node = network_node
#                                     main_node = main_node.append(network_node)
#                                     main_node = main_node[~main_node.index.duplicated(keep="first")]
#                                     network_count +=1
                            except Exception as e:
                                print(e,'RRRRRRRRRRRRRRRRRRRRRRRRR')
                                pass
                        elif prefer[2] ==9 and prefer[1] < 0:#ASK OFFER NEGATIVE CASE
#                             print('GOOGLE')
                            if type(df["{}".format(prefer[0])][i]) != float or len(str(df["{}".format(prefer[0])][i])) > 0:
                                node1 = df[~df["{}".format(prefer[0])].str.contains('|'.join(df["{}".format('Offer')][i].split(',')))]
                                node2 = df[~df["{}".format('Offer')].str.contains('|'.join(df["{}".format(prefer[0])][i].split(',')))]
                                main_node = df[df['User ID'].eq(df['User ID'][i])]
                                user = []
                                ask_tag = []
                                offer_tag = []

                                common_element = set(node1['User ID'].tolist()).intersection(set(node2['User ID'].tolist()))
                                common_element = [df['User ID'][i]] + list(common_element)
#                                 print('common element',common_element)
                                node1 = pd.DataFrame(columns=list(df.columns)) #df_list
                                for element in common_element:
                                    node1 = node1.append(df[df['User ID'].eq(element)])
                                node1.reset_index(drop=True, inplace=True)
#                                 print('NODE!!!!!!!!!111',node1)
                                try:
                                    for k in node1.index:
                                        chk = False
                                        for j in node1['Offer'][k].split(','):
                                            if j in main_node['Ask'][i].split(',') or j in ask_tag:
                                                chk = True
                                        for m in node1['Ask'][k].split(','):
                                            if m in main_node['Offer'][i].split(',') or m in offer_tag:
                                                chk = True
                                        if chk == False:
                                            user.append(node1['User ID'][k])
                                            ask_tag.extend(node1['Ask'][k].split(','))
                                            offer_tag.extend(node1['Offer'][k].split(','))
                                    if preference[0][2] != 9: 
                                        for k in node1['User ID'].tolist():
                                            if k not in user:
                                                user.append(k)
                                    non_matching_list = [df['User ID'][i]]            
                                    for k in user:
                                        main_node = main_node.append((df[df['User ID'].eq(k)])) #COMMENT AND ADD IN LIST BELOW BECAUSE OF FAST PROCESSING
                                        non_matching_list.append(k)
                                except Exception as e:
                                    print(e,'ERROR')
                                df_list.append(non_matching_list)#df_list
                        elif (prefer[2] ==6 or prefer[2] ==2) and prefer[1] >= 0:
                            if type(df["{}".format(prefer[0])][i]) != float and len(str(df["{}".format(prefer[0])][i])) >0:
                                def count_search_words(text,i):
                                    return sum(word.strip() in text for word in df["{}".format(prefer[0])][i].split(','))
                                def order_by_occurance(i):
                                    
                                    def count_search_words_inner(text):
                                        return count_search_words(text, i)
                                    node = df[df["{}".format(prefer[0])].apply(lambda x: any(word in x.split(',') for word in df["{}".format(prefer[0])][i].split(',')))].copy()
#                                             node = df[df["{}".format(prefer[0])].apply(lambda x: any(word in str(x) for word in str(df[prefer[0]][i]).split(',')))].copy()
                                    print(node)
                                    node['match_count'] = node["{}".format(prefer[0])].apply(count_search_words_inner)
                                    node = node[node['match_count'] > 0].sort_values(by='match_count', ascending=False)

                                    node = node.drop(columns=['match_count'])
                                    node = node.reset_index(drop=True)
#                                     print(node,'MATCHING')
                                    return node
                                node = order_by_occurance(i)
                                filter_list = [df['User ID'][i]]
                                filter_text = []
#                                 main_node4 = pd.DataFrame(columns=list(df.columns))
#                                 main_node4 = main_node4.append(node)
                                main_node4_list = node['User ID'].tolist()
                                unused_node_list = []
                                for un_id in node.index:
                                    if node.iloc[un_id]['User ID'] not in repeated_id:
                                        unused_node_list.append(node.iloc[un_id]['User ID'])
                                if len(unused_node_list) < team_size:
                                    print(node,f'PAWAN{i}')
                                    for f_id in node.index:
                                        if node.iloc[f_id]['User ID'] not in repeated_id:
                                            print(node.iloc[f_id]['User ID'])
                                            check = False
                                            for text in node["{}".format(prefer[0])][f_id].split(','):
                                                if text.strip() not in df["{}".format(prefer[0])][i].split(',') and text.strip() not in filter_text:
                                                    check = True
                                                    break
                                            if check == True:
                                                next_index = df[df['User ID'] == node.iloc[f_id]['User ID']].index[0]
        #                                         main_node4 = main_node4.append(order_by_occurance(next_index))
                                                main_node4_list.extend(order_by_occurance(next_index)['User ID'].tolist())
        #                                         print(main_node4_list,'main_node')
                                                filter_text.append(text.strip())
                                
#                                 node = main_node4
                                df_list.append(main_node4_list)#df_list
                        elif (prefer[2] ==6 or prefer[2] ==2) and prefer[1] < 0:
                            if type(df["{}".format(prefer[0])][i]) != float and len(str(df["{}".format(prefer[0])][i])) >0:    
    
                                #THIS CODE TIME COMPLEXITY IS GOOD AS ABOVE CODE
                                user_id_main_node2_list = []
                                if len(df_list) > 0:
                                    user_id_list = [item for sublist in df_list for item in sublist]
                                    user_id_df = pd.DataFrame(columns=list(df.columns))
                                    if len(user_id_list) > 0:
                                        for user_id in user_id_list:
                                            matching_rows = df[df['User ID'] == user_id]
                                            user_id_df = user_id_df.append(matching_rows, ignore_index=False)
                                        user_id_df = user_id_df.drop_duplicates(keep='first')
                                        user_id_node=df.iloc[[i]]
                                        print(user_id_df,'ASHOK')
                                        user_id_node1 = user_id_df[~user_id_df["{}".format(prefer[0])].str.contains('|'.join(user_id_df["{}".format(prefer[0])][i].split(',')))]#df_list add kiya he
                                        user_id_node = user_id_node.append(user_id_node1)
                                        user_id_main_node1=user_id_node
                                        user_id_temp_list=[]
        #                                 main_node2 = pd.DataFrame(columns=list(df.columns))
                                        
        #                                 print(node1,'###########@@@@@@@@@@@@')
                                        for user_id_ind in user_id_main_node1.index:
                                            print(user_id_main_node1['{}'.format(prefer[0])][user_id_ind])
                                            check4=False
                                            for word in user_id_main_node1['{}'.format(prefer[0])][user_id_ind].split(','):
                                                if word not in user_id_temp_list and user_id_main_node1['User ID'][user_id_ind] not in repeated_id:
                                                    check4=False
                                                else:
                                                    check4=True
                                            if check4==False:
        #                                         main_node2= main_node2.append(main_node1.loc[ind])
                                                user_id_main_node2_list.append(user_id_main_node1['User ID'][user_id_ind])
                                                user_id_temp_list.extend(user_id_main_node1['{}'.format(prefer[0])][user_id_ind].split(','))

        
        
                                node=df.iloc[[i]]
                                print(prefer[0],'AAAAAAAASSSSSSSSS')
#                                 node1 = main_node[~main_node["{}".format(prefer[0])].str.contains('|'.join(main_node["{}".format(prefer[0])][i].split(',')))]#df_list comment kiya he
                                node1 = df[~df["{}".format(prefer[0])].str.contains('|'.join(df["{}".format(prefer[0])][i].split(',')))]#df_list add kiya he
                                node = node.append(node1)
                                main_node1=node
                                temp_list=[]
#                                 main_node2 = pd.DataFrame(columns=list(df.columns))
                                main_node2_list = []
#                                 print(node1,'###########@@@@@@@@@@@@')
                                for ind in main_node1.index:
                                    print(main_node1['{}'.format(prefer[0])][ind])
                                    check1=False
                                    for word in main_node1['{}'.format(prefer[0])][ind].split(','):
                                        if word not in temp_list and main_node1['User ID'][ind] not in repeated_id:
                                            check1=False
                                        else:
                                            check1=True
                                    if check1==False:
#                                         main_node2= main_node2.append(main_node1.loc[ind])
                                        main_node2_list.append(main_node1['User ID'][ind])
                                        temp_list.extend(main_node1['{}'.format(prefer[0])][ind].split(','))
#                                                 main_node=main_node.append(main_node2)
#                                 main_node=main_node2
#                                 df_list.append(main_node['User ID'].tolist())#df_list
                                main_node2_list = user_id_main_node2_list + main_node2_list
                                df_list.append(main_node2_list)
    
    
    


                team=[]
                print('check3')
                df_list_unique = []  # Filter all user id for thier uniqueness
                for df1 in df_list:
                    print(df1,'DF LIST DATAFRAME')
                    unique = [df['User ID'][i]]
                    for k in df1:
                        if k not in unique and k not in repeated_id:
                            unique.append(k)
                    df_list_unique.append(unique)
                sorted_numbers_flag = True
                
                if all_zeros:   # THIS CONDITION ADD FOR IF PREFERNCE IS NON ZEROS THEN THIS WORK ELSE ONLY SINGLE QUESTION TEAM WORK
                    for df2 in df_list_unique:
                        if len(df2) >= team_size:
                            sorted_numbers = df2
                            sorted_numbers_flag = False
                            break
                if sorted_numbers_flag:
                    all_numbers = [num for sublist in df_list_unique for num in sublist]   #THESE CODE is useful for make single list from df_list_unique
                    counter = Counter(all_numbers)    #This code make dictionary which key is user id and value is its count or occurances
                    print(counter)
                    # Sort the numbers by occurrence (descending) and by their first appearance in nested lists
                    sorted_numbers = sorted(counter.keys(), key=lambda x: (-counter[x], all_numbers.index(x))) #sort data based on high occurance
    #                 print(sorted_numbers,'BBBBBBBBB')
                    # THESE BELOW CODE IS USED FOR MAKE NetWOK High proirity if its preference is on TOP
                    for net_q in preference:
                        if net_q[2] == 5 and net_q[1] > 0 and preference[0][2]==5:
                            result_list = [df['User ID'][i]]
                            network_list = list(nx.descendants_at_distance(G, df['User ID'][i], distance=1))
                            for num in sorted_numbers:
                                if num != df['User ID'][i] and num in network_list:
                                    result_list.append(num)
    #                                 print(network_list,'AAAAAA')
    #                                 print(result_list,'RRRRRRR')
                                    network_list.extend(list(nx.descendants_at_distance(G, num, distance=1)))
        #                     result_list.extend(sorted_numbers)

                            filter_duplicates = []
                            sorted_numbers = []
                            for f in result_list:
                                if f not in filter_duplicates:
                                    sorted_numbers.append(f)
    #                 print(sorted_numbers,'BBBBBBBBB',df_list[0])

                    first_df_list_matching_element = []   # Filter data by matching 1st list of nested df_list and non match element push backword in same list then list assign to sorted_numbers
                    first_df_list_non_matching_element = []
                    for filter_id in sorted_numbers:
                        if filter_id in df_list[0]:
                            first_df_list_matching_element.append(filter_id)
                        else:
                            first_df_list_non_matching_element.append(filter_id)

                    sorted_numbers = first_df_list_matching_element + first_df_list_non_matching_element
                
                try:
                    main_node=pd.DataFrame(columns=list(df.columns))
                    for user in sorted_numbers:
                        main_node = main_node.append(df[df['User ID'].eq(user)])
                    print(main_node)
                except Exception as e:
                    main_node = pd.DataFrame()
                if my_teamset_preference >=0:
                    if len(main_node.index)>0:
                        temp_diff_team=None
                        temp_diff_people = []
                        for id1 in main_node.index:
#                             print(id1,'ASHK')
                            if len(team)<team_size and main_node["User ID"][id1] not in team and main_node["User ID"][id1] not in repeated_id:

                                for people in people_in_same_team:
#                                     print(people,'PEOPLE')
                                    if main_node["User ID"][id1] in people:
                                        team.extend(people)
                                        repeated_id.extend(people)

                                for diff_people in people_in_diff_team:
#                                     print('YESS',diff_people)
                                    if main_node["User ID"][id1] in diff_people and main_node["User ID"][id1] not in team:
                                        if temp_diff_team not in diff_people:
#                                             print('OHHHH',main_node["User ID"][id1])
                                            team.append(main_node["User ID"][id1])
                                            repeated_id.append(main_node["User ID"][id1])
                                            temp_diff_team=main_node["User ID"][id1]
                                            temp_diff_people.extend(diff_people)
                                            break
#                                 print(main_node["User ID"][id1],temp_diff_people,team,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')    
                                if main_node["User ID"][id1] not in repeated_id and main_node["User ID"][id1] not in temp_diff_people and main_node["User ID"][id1] not in team:
#                                     print(main_node["User ID"][id1],temp_diff_people,'SSSSSSSSSSSSSSSSSSSSSSSSSS')
                                    team.append(main_node["User ID"][id1])
                                    repeated_id.append(main_node["User ID"][id1])

#                         print('TAG ERROR ELSE1',team)
                        if len(team)==team_size and team not in teams:
                            teams.append(team)
                            current_team_index += 1
                        else:
#                             print('TAG ERROR ELSE')
                            # try:
                            #     ai_columns = [p for p in preference if f"{p}_AI" not in list(df.columns)]
                            #     ai_columns = len(ai_columns)
                            # except:
                            #     ai_columns = 0
                            ai_columns = [p[0] for p in preference if f"{p[0]}_AI" in list(df.columns)]
                            ai_columns = len(ai_columns)
                            print('Hi A',ai_columns)
                            if len(team)>1 and len(team) < team_size and ai_columns == 0:
                                teams.append(team)
                            else:
                                for rem in team:
                                    if rem in repeated_id:
                                        repeated_id.remove(rem)

                else:
                    if len(main_node.index)>0:
#                         try:
#                             main_node = negative_node_list[0]
#                         except Exception as e:
#                             pass
                        temp_diff_team=None
                        temp_diff_people=[]

                        for team_id1 in my_first_teamset_list2[::-1]:
#                             print(team_id1,'BBBBBBBBBBBB')
                            if len(team)<team_size and team_id1 not in team and team_id1 not in repeated_id and team_id1 in main_node["User ID"].tolist():
                                for people in people_in_same_team:
                                    if team_id1 in people:
                                        print('check1')
                                        team.extend(people)
                                        repeated_id.extend(people)

                                for diff_people in people_in_diff_team:
                                    if team_id1 in diff_people and team_id1 not in team:
                                        if temp_diff_team not in diff_people:
                                            print('check2')
                                            team.append(team_id1)
                                            repeated_id.append(team_id1)
                                            temp_diff_team=team_id1
                                            temp_diff_people.extend(diff_people)
                                            break
                                if team_id1 not in repeated_id and team_id1 not in temp_diff_people:
                                    print('check3')
                                    team.append(team_id1)
                                    repeated_id.append(team_id1)
#                                 print('ASHHHHH',team)


                        if len(team)==team_size and team not in teams:
                            teams.append(team)
                            current_team_index += 1
                        else:
                            if len(team)>1:
                                teams.append(team)
                            else:
                                for rem in team:
                                    if rem in repeated_id:
                                        repeated_id.remove(rem)
    #             main_node = main_node.drop(main_node.index)
            main_node = None
except Exception as e:
    print(e,"**************hiii**************************",teams)

ai_columns = [prefer[0] for prefer in preference if f"{prefer[0]}_AI" in list(df.columns)]

if len(ai_columns) > 0:
    # ye code server par dalna he niche ki 6 line                    
    small_team=[]
    small_team_tag=[]

    for k in df.index:
        if df["User ID"][k] not in repeated_id:
            small_team.append(df["User ID"][k])
            small_team_tag.append(df["User ID"][k])
    #         tags.append([df["Ask"][k],df["Offer"][k]])
    #         repeated_id.append(df["User ID"][k])
    # teams.append(small_team)    
    print(small_team)    
    #START AI TAGS TEAMS
    print("30 August preference")
    print(preference)
    # df.to_csv('AI_tags_30AugNormal_tags5.csv',index=False)
    original_df = df.copy()
    df = df[df['User ID'].isin(small_team)]
    # df.to_csv('AI_tags_30AugNormal_tags6.csv',index=False)
    # exit()
    df.reset_index(drop = True)
    
    print(len(df),len(small_team),'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',teams)
    if len(df)>0:
        for i in df.index:
            try:
                team_size = group_sizes[current_team_index]
            except Exception as e:
                print(team_size)
            print(i)
            if type(df['User ID'][i]) !=float:
                print(df['User ID'][i],'ASH',repeated_id)
                if df['User ID'][i] not in repeated_id:
                    negative_node_list =[]
                    count=1
                    network_count=0
                    negative_count=0
                    pref_neg_list1 = []
                    df_list = []#df_list
                    for prefer in preference:
                        if type(df['{}'.format(prefer[0])][i]) !=float:
                            if (prefer[2] ==6 or prefer[2] ==2) and prefer[1] > 0:
                                if type(df["{}".format(prefer[0])][i]) != float and len(str(df["{}".format(prefer[0])][i])) >0:
                                    def count_search_words(text,i):
                                        return sum(word.strip() in text for word in df["{}".format(prefer[0])][i].split(','))
                                    def order_by_occurance(i):

                                        def count_search_words_inner(text):
                                            return count_search_words(text, i)
                                        node = df[df["{}".format(prefer[0])].apply(lambda x: any(word in x.split(',') for word in df["{}".format(prefer[0])][i].split(',')))].copy()
    #                                             node = df[df["{}".format(prefer[0])].apply(lambda x: any(word in str(x) for word in str(df[prefer[0]][i]).split(',')))].copy()
    #                                     node_partial = df[df["{}".format(prefer[0])].apply(lambda x: any(word in x for word in df["{}".format(prefer[0])][i].split(',')))].copy()
    #                                     node = node.append(node_partial)
    #                                     node = node.reset_index(drop=True)
                                        print(node)
                                        node['match_count'] = node["{}".format(prefer[0])].apply(count_search_words_inner)
                                        print('FILTER NODE',node)
                                        node = node[node['match_count'] > 0].sort_values(by='match_count', ascending=False)

                                        node = node.drop(columns=['match_count'])
                                        node = node.reset_index(drop=True)
    #                                     print(node,'MATCHING')
                                        return node
                                    print(f'INDEX{i}')
                                    node = order_by_occurance(i)
    #                                 node = node[~node['User ID'].isin(repeated_id)] #REMOVE ROW WHO IS ALREADY USED in TEAMS COMMENTED KIYA BECAUSE RESULT BEKAR AYA ISSE
                                    filter_list = [df['User ID'][i]]
                                    filter_text = []
    #                                 main_node4 = pd.DataFrame(columns=list(df.columns))
    #                                 main_node4 = main_node4.append(node)
                                    main_node4_list = node['User ID'].tolist()
                                    unused_node_list = []
                                    for un_id in node.index:
                                        if node.iloc[un_id]['User ID'] not in repeated_id:
                                            unused_node_list.append(node.iloc[un_id]['User ID'])
                                    if len(unused_node_list) < team_size:
                                        print(node,f'ASHOK{i}')
                                        for f_id in node.index:
                                            if node.iloc[f_id]['User ID'] not in repeated_id:
                                                print(node.iloc[f_id]['User ID'])
                                                check = False
                                                for text in node["{}".format(prefer[0])][f_id].split(','):
                                                    if text.strip() not in df["{}".format(prefer[0])][i].split(',') and text.strip() not in filter_text:
                                                        check = True
                                                        break
                                                if check == True:
                                                    next_index = df[df['User ID'] == node.iloc[f_id]['User ID']].index[0]
            #                                         main_node4 = main_node4.append(order_by_occurance(next_index))
                                                    main_node4_list.extend(order_by_occurance(next_index)['User ID'].tolist())
            #                                         print(main_node4_list,'main_node')
                                                    filter_text.append(text.strip())
    #                                 node = main_node4


                                    #AI TAGS CONDITION CODE START
                                    if f"{prefer[0]}_AI" in list(df.columns) and len(main_node4_list) < team_size:
                                        def count_search_words(text,i):
                                            return sum(word.strip() in text for word in df["{}".format(f"{prefer[0]}_AI")][i].split(','))
                                        def order_by_occurance(i):

                                            def count_search_words_inner(text):
                                                return count_search_words(text, i)
                                            node = df[df[f"{prefer[0]}_AI"].apply(lambda x: any(word in x.split(',') for word in df[f"{prefer[0]}_AI"][i].split(',')))].copy()
        #                                             node = df[df["{}".format(prefer[0])].apply(lambda x: any(word in str(x) for word in str(df[prefer[0]][i]).split(',')))].copy()
        #                                     node_partial = df[df["{}".format(prefer[0])].apply(lambda x: any(word in x for word in df["{}".format(prefer[0])][i].split(',')))].copy()
        #                                     node = node.append(node_partial)
        #                                     node = node.reset_index(drop=True)
                                            print(node)
                                            node['match_count'] = node[f"{prefer[0]}_AI"].apply(count_search_words_inner)
                                            print('FILTER NODE',node)
                                            node = node[node['match_count'] > 0].sort_values(by='match_count', ascending=False)

                                            node = node.drop(columns=['match_count'])
                                            node = node.reset_index(drop=True)
        #                                     print(node,'MATCHING')
                                            return node
                                        print(f'INDEX{i}')
                                        node = order_by_occurance(i)
        #                                 node = node[~node['User ID'].isin(repeated_id)] #REMOVE ROW WHO IS ALREADY USED in TEAMS COMMENTED KIYA BECAUSE RESULT BEKAR AYA ISSE

                                        filter_text = []
        #                                 main_node4 = pd.DataFrame(columns=list(df.columns))
        #                                 main_node4 = main_node4.append(node)
                                        main_node4_list_ai = node['User ID'].tolist()
                                        unused_node_list = []
                                        for un_id in node.index:
                                            if node.iloc[un_id]['User ID'] not in repeated_id:
                                                unused_node_list.append(node.iloc[un_id]['User ID'])
                                        if len(unused_node_list) < team_size:
                                            print(node,f'ASHOK{i}')
                                            for f_id in node.index:
                                                if node.iloc[f_id]['User ID'] not in repeated_id:
                                                    print(node.iloc[f_id]['User ID'])
                                                    check = False
                                                    for text in node[f"{prefer[0]}_AI"][f_id].split(','):
                                                        if text.strip() not in df[f"{prefer[0]}_AI"][i].split(',') and text.strip() not in filter_text:
                                                            check = True
                                                            break
                                                    if check == True:
                                                        next_index = df[df['User ID'] == node.iloc[f_id]['User ID']].index[0]
                #                                         main_node4 = main_node4.append(order_by_occurance(next_index))
                                                        main_node4_list_ai.extend(order_by_occurance(next_index)['User ID'].tolist())
                #                                         print(main_node4_list,'main_node')
                                                        filter_text.append(text.strip())
                                        print(main_node4_list_ai,'LIST AI TAGS',main_node4_list)
                                        main_node4_list =  main_node4_list + main_node4_list_ai
                                    df_list.append(main_node4_list)
    #                                 #END OF AI TAGS CONDITION


                    team=[]
                    print('check3')
                    df_list_unique = []  # Filter all user id for thier uniqueness
                    for df1 in df_list:
                        print(df1,'DF LIST DATAFRAME')
                        unique = [df['User ID'][i]]
                        for k in df1:
                            if k not in unique:
                                unique.append(k)
                        df_list_unique.append(unique)
                    all_numbers = [num for sublist in df_list_unique for num in sublist]   #THESE CODE is useful for make single list from df_list_unique
                    counter = Counter(all_numbers)    #This code make dictionary which key is user id and value is its count or occurances
                    print(counter)
                    # Sort the numbers by occurrence (descending) and by their first appearance in nested lists
                    sorted_numbers = sorted(counter.keys(), key=lambda x: (-counter[x], all_numbers.index(x))) #sort data based on high occurance
    #                 print(sorted_numbers,'BBBBBBBBB')
                    # THESE BELOW CODE IS USED FOR MAKE NetWOK High proirity if its preference is on TOP
                    for net_q in preference:
                        if net_q[2] == 5 and net_q[1] > 0 and preference[0][2]==5:
                            result_list = [df['User ID'][i]]
                            network_list = list(nx.descendants_at_distance(G, df['User ID'][i], distance=1))
                            for num in sorted_numbers:
                                if num != df['User ID'][i] and num in network_list:
                                    result_list.append(num)
    #                                 print(network_list,'AAAAAA')
    #                                 print(result_list,'RRRRRRR')
                                    network_list.extend(list(nx.descendants_at_distance(G, num, distance=1)))
        #                     result_list.extend(sorted_numbers)

                            filter_duplicates = []
                            sorted_numbers = []
                            for f in result_list:
                                if f not in filter_duplicates:
                                    sorted_numbers.append(f)
    #                 print(sorted_numbers,'BBBBBBBBB',df_list[0])

                    first_df_list_matching_element = []   # Filter data by matching 1st list of nested df_list and non match element push backword in same list then list assign to sorted_numbers
                    first_df_list_non_matching_element = []
                    for filter_id in sorted_numbers:
                        if filter_id in df_list[0]:
                            first_df_list_matching_element.append(filter_id)
                        else:
                            first_df_list_non_matching_element.append(filter_id)

                    sorted_numbers = first_df_list_matching_element + first_df_list_non_matching_element
    #                 print(sorted_numbers,'CCCCCCCCCCCCC',first_df_list_matching_element,first_df_list_non_matching_element)
                    # Sort the numbers by occurrence (descending) and by their first appearance
        #             sorted_numbers = sorted(counter.keys(), key=lambda x: (-counter[x], first_appearance[x]))
                    try:
                        main_node=pd.DataFrame(columns=list(df.columns))
                        for user in sorted_numbers:
                            main_node = main_node.append(df[df['User ID'].eq(user)])
                        print(main_node)
                    except Exception as e:
                        main_node = pd.DataFrame()
                    if my_teamset_preference >=0:
                        if len(main_node.index)>0:
                            temp_diff_team=None
                            temp_diff_people = []
                            for id1 in main_node.index:
    #                             print(id1,'ASHK')
                                if len(team)<team_size and main_node["User ID"][id1] not in team and main_node["User ID"][id1] not in repeated_id:

                                    for people in people_in_same_team:
    #                                     print(people,'PEOPLE')
                                        if main_node["User ID"][id1] in people:
                                            team.extend(people)
                                            repeated_id.extend(people)

                                    for diff_people in people_in_diff_team:
    #                                     print('YESS',diff_people)
                                        if main_node["User ID"][id1] in diff_people and main_node["User ID"][id1] not in team:
                                            if temp_diff_team not in diff_people:
    #                                             print('OHHHH',main_node["User ID"][id1])
                                                team.append(main_node["User ID"][id1])
                                                repeated_id.append(main_node["User ID"][id1])
                                                temp_diff_team=main_node["User ID"][id1]
                                                temp_diff_people.extend(diff_people)
                                                break
    #                                 print(main_node["User ID"][id1],temp_diff_people,team,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')    
                                    if main_node["User ID"][id1] not in repeated_id and main_node["User ID"][id1] not in temp_diff_people and main_node["User ID"][id1] not in team:
    #                                     print(main_node["User ID"][id1],temp_diff_people,'SSSSSSSSSSSSSSSSSSSSSSSSSS')
                                        team.append(main_node["User ID"][id1])
                                        repeated_id.append(main_node["User ID"][id1])

    #                         print('TAG ERROR ELSE1',team)
                            if len(team)==team_size and team not in teams:
                                teams.append(team)
                                current_team_index += 1
                            else:
    #                             print('TAG ERROR ELSE')
                                if len(team)>1 and len(team) < team_size:
                                    teams.append(team)
                                else:
                                    for rem in team:
                                        if rem in repeated_id:
                                            repeated_id.remove(rem)

                    else:
                        if len(main_node.index)>0:
    #                         try:
    #                             main_node = negative_node_list[0]
    #                         except Exception as e:
    #                             pass
                            temp_diff_team=None
                            temp_diff_people=[]

                            for team_id1 in my_first_teamset_list2[::-1]:
    #                             print(team_id1,'BBBBBBBBBBBB')
                                if len(team)<team_size and team_id1 not in team and team_id1 not in repeated_id and team_id1 in main_node["User ID"].tolist():
                                    for people in people_in_same_team:
                                        if team_id1 in people:
                                            print('check1')
                                            team.extend(people)
                                            repeated_id.extend(people)

                                    for diff_people in people_in_diff_team:
                                        if team_id1 in diff_people and team_id1 not in team:
                                            if temp_diff_team not in diff_people:
                                                print('check2')
                                                team.append(team_id1)
                                                repeated_id.append(team_id1)
                                                temp_diff_team=team_id1
                                                temp_diff_people.extend(diff_people)
                                                break
                                    if team_id1 not in repeated_id and team_id1 not in temp_diff_people:
                                        print('check3')
                                        team.append(team_id1)
                                        repeated_id.append(team_id1)
    #                                 print('ASHHHHH',team)


                            if len(team)==team_size and team not in teams:
                                teams.append(team)
                                current_team_index += 1
                            else:
                                if len(team)>1:
                                    teams.append(team)
                                else:
                                    for rem in team:
                                        if rem in repeated_id:
                                            repeated_id.remove(rem)
        #             main_node = main_node.drop(main_node.index)
                main_node = None

#END AI TAGS TEAMS

small_team=[]
small_team_tag=[]

for k in df.index:
    if df["User ID"][k] not in repeated_id:
        small_team.append(df["User ID"][k])
        small_team_tag.append(df["User ID"][k])
        repeated_id.append(df["User ID"][k])
teams.append(small_team)

try:
    df = original_df
except Exception as e:
    pass

try:
    if numberOfGroups:
        all_members = [member for t2 in teams for member in t2]

        # Rebuild teams according to group_size
        new_teams = []
        for size in group_sizes:
            new_team = []
            while len(new_team) < size and all_members:
                new_team.append(all_members.pop(0))
            new_teams.append(new_team)

        teams1  = new_teams
        teams  = new_teams
        print(teams1,'PRESENT12')
except Exception as e:
    teams1=[]
    team1 = []
    # small_team= [16, 17, 27, 40]
    repeated_small_team=[]
    for t in teams:
        if len(t)==team_size and t != small_team:
            teams1.append(t)
    for t in teams:
        if t not in teams1:
            if len(t)==team_size and t != small_team:
                teams1.append(t)
            else:
                if len(small_team)>0:
                    if t != small_team:
                        team1.extend(t)
                        temp=[]
                        for s in small_team:
                            if s not in repeated_small_team:
                                team1.append(s)
                                temp.append(s)
                                repeated_small_team.append(s)
                                if len(team1)==team_size:
                                    teams1.append(team1)
                                    team1=[]
                                    break
                        for rem in temp:
                            print(rem,'#####')
                            try:
                                small_team.remove(rem)
                            except Exception as e:
                                continue
                        print(small_team)       
                    else:
                        team1=[]
                        for s1 in small_team:
                            team1.append(s1)
                            if len(team1)==team_size:
                                teams1.append(team1)
                                team1=[]

                else:
                    print('jj')
                    if t !=repeated_small_team:
                        for t1 in t:
                            if t1 not in repeated_small_team:
                                team1.append(t1)
                                if len(team1)==team_size:
                                    teams1.append(team1)
                                    team1=[]
    # print(team1)
    if len(team1)>1:
        teams1.append(team1)
    else:
        teams1[-1].extend(team1)

    tags1=[]
    tag1 = {}
    repeated_small_team_tag=[]
    for t in tags:
        if len(t)==team_size and list(t.keys()) !=small_team_tag:
            tags1.append(t)
    for t in tags:
        if t not in tags1:
            if len(t)==team_size and list(t.keys()) !=small_team_tag:
                tags1.append(t)
            else:
                if len(small_team_tag)>0:
                    if list(t.keys()) != small_team_tag:
                        for t1 in t:
                            tag1[t1]=t[t1]
                        temp=[]
                        for s in small_team_tag:
                            if s not in repeated_small_team_tag:
                                tag1[s]=''
                                temp.append(s)
                                repeated_small_team_tag.append(s)
                                if len(tag1)==team_size:
                                    tags1.append(tag1)
                                    tag1={}
                                    for rem in temp:
                                        small_team_tag.remove(rem)
                                    break
                    else:
                        tag1={}
                        for s1 in small_team_tag:
                            tag1[s1]=''
                            if len(tag1)==team_size:
                                teams1.append(tag1)
                                tag1={}

                else:
                    if list(t.keys()) !=repeated_small_team_tag:
                        for t1 in t:
                            if t1 not in repeated_small_team_tag:
                                tag1[t1]=t[t1]
                                if len(tag1)==team_size:
                                    tags1.append(tag1)
                                    tag1={}
    if len(tag1)>1:
        tags1.append(tag1)
    else:
        try:
            if len(tag1)==1:
                tags1[-1][list(tag1.keys())[0]]=tag1[list(tag1.keys())[0]]
        except Exception as e:
            pass

    print(teams1)

    # print(tags1)
    print(preference)
    teams = teams1

def calculate_matching_performance(df, preference, teams):
    results = []
    # Calculate total weightage
    total_weightage = sum(abs(q[1]) for q in preference)
    question_weight = {}
    # Calculate percentage for each question
    for question in preference:
        if total_weightage > 0:
            question_weight[question[0]] = (abs(question[1]) / total_weightage) * 100
        else:
            question_weight[question[0]] = (1 / len(preference)) * 100
    print(question_weight,'AAAAA')
    for team in teams:
        team_results = []
        total_team_performance = 0
        column_wise_performance = {}
        
        for user_id in team:
            column_user = []
            matched_tags_set = set()
            user_row = df[df['User ID'] == user_id]
            
            if user_row.empty:
                continue

            user_performance = 0
            total_columns = len(preference)
            
            for pref in preference:
                column_name = pref[0]
                pref_type = pref[1]
                column_type = pref[2]
                other_user_ids = [other for other in team if other != user_id]
                other_member_df = df[df['User ID'].isin(other_user_ids)]
                if column_type == 9:  # Handle Ask and Offer columns
                    user_ask = {tag.strip() for tag in user_row['Ask'].values[0].split(",") if len(tag.strip()) > 0}
                    user_offer = {tag.strip() for tag in user_row['Offer'].values[0].split(",") if len(tag.strip()) > 0}
                    other_member_ask_tags = [m_tag.strip() for member_tags in other_member_df['Ask'].tolist() for m_tag in member_tags.split(',') if len(m_tag.strip()) > 0]
                    other_member_ask_tags = set(other_member_ask_tags)
                    other_member_offer_tags = [m_tag.strip() for member_tags in other_member_df['Offer'].tolist() for m_tag in member_tags.split(',') if len(m_tag.strip()) > 0]
                    other_member_offer_tags = set(other_member_offer_tags)
                    matched_ask = matched_offer = 0

                    if pref_type >= 0:
                        matched_ask += len(user_ask & other_member_offer_tags)
                        matched_offer += len(user_offer & other_member_ask_tags)
                        matched_tags_set.update(user_ask & other_member_offer_tags)
                        matched_tags_set.update(user_offer & other_member_ask_tags)
                    else:
                        matched_ask += len(user_ask - other_member_offer_tags)
                        matched_offer += len(user_offer - other_member_ask_tags)
                        matched_tags_set.update(user_ask - other_member_offer_tags)
                        matched_tags_set.update(user_offer - other_member_ask_tags)
                    if matched_ask > 0 or matched_offer > 0:
                        column_performance = question_weight[column_name]
                    else:
                        column_performance = 0
                    user_performance += column_performance
                    column_user.append(column_performance)
                    
                elif column_type == 5:
                    user_tags = set(user_row[column_name].values[0].split(","))
                    user_tags = {int(user_t) for user_t in user_tags if user_t.strip().isdigit()}
                    matched_tags = 0
                    other_members = set(team)-{user_id}
                    if pref_type >=0:
                        matched_tags += len(user_tags & other_members)
                        matching_tag = user_tags & other_members
                        matching_tag = {df['first_name'][df.index[df['User ID'] == tag][0]] + ' ' + df['last_name'][df.index[df['User ID'] == tag][0]] for tag in matching_tag if tag not in people_out_from_team}
                        matched_tags_set.update(matching_tag)
                    else:
                    #     matched_tags += len(user_tags - other_members)
                    #     matching_tag = user_tags - other_members
                    #     print(matching_tag,'testt')
                    #     matching_tag = {df['first_name'][df.index[df['User ID'] == tag][0]] + ' ' + df['last_name'][df.index[df['User ID'] == tag][0]] for tag in matching_tag if tag not in people_out_from_team}
                    #     matched_tags_set.update(matching_tag)
                    # if matched_tags > 0:
                    #     column_performance = question_weight[column_name]
                    # else:
                    #     column_performance = 0
                        matched_tags += len(user_tags & other_members)
                        matching_tag = user_tags & other_members
                        print(matching_tag,'testt')
                        matching_tag = {df['first_name'][df.index[df['User ID'] == tag][0]] + ' ' + df['last_name'][df.index[df['User ID'] == tag][0]] for tag in matching_tag if tag not in people_out_from_team}
                        matched_tags_set.update(matching_tag)  
                    if matched_tags > 0 and pref_type > 0:
                        column_performance = question_weight[column_name]
                    elif matched_tags == 0 and pref_type < 0:
                        column_performance = question_weight[column_name]
                    else:
                        column_performance = 0
                    user_performance += column_performance
                    column_user.append(column_performance)
                    
                else:
                    user_tags = {tag.strip() for tag in user_row[column_name].values[0].split(",") if len(tag.strip()) > 0}
                    matched_tags = 0
                    
                    other_member_all_tags = [m_tag.strip() for member_tags in other_member_df[column_name].tolist() for m_tag in member_tags.split(',') if len(m_tag.strip()) > 0]
                    other_member_all_tags = set(other_member_all_tags)
                    
                    if pref_type >= 0:
                        matched_tags += len(user_tags & other_member_all_tags)
                        matched_tags_set.update(user_tags & other_member_all_tags)
                        column_performance = question_weight[column_name] if matched_tags > 0 else 0
                    else:
#                         matched_tags += len(user_tags - other_member_all_tags)
                        matched_tags += len(user_tags.intersection(other_member_all_tags))
                        matched_tags_set.update(user_tags - other_member_all_tags)
                        column_performance = ((len(user_tags)-matched_tags)/len(user_tags))*(question_weight[column_name]) if len(user_tags)>0 else 0

                    user_performance += column_performance
                    column_user.append(column_performance)
                    if column_performance == 0 and f"{column_name}_AI" in list(df.columns) and pref_type >= 0:
                        user_tags = {tag.strip() for tag in user_row[f"{column_name}_AI"].values[0].split(",") if len(tag.strip()) > 0}
                        matched_tags = 0

                        other_member_all_tags = [m_tag.strip() for member_tags in other_member_df[f"{column_name}_AI"].tolist() for m_tag in member_tags.split(',') if len(m_tag.strip()) > 0]
                        other_member_all_tags = set(other_member_all_tags)

                        if pref_type >= 0:
                            matched_tags += len(user_tags & other_member_all_tags)
                            matched_tags_set.update(user_tags & other_member_all_tags)
                            column_performance = question_weight[column_name] if matched_tags > 0 else 0
                        else:
                            matched_tags += len(user_tags.intersection(other_member_all_tags))
                            matched_tags_set.update(user_tags - other_member_all_tags)
                            column_performance = ((len(user_tags)-matched_tags)/len(user_tags))*(question_weight[column_name]) if len(user_tags)>0 else 0

                        user_performance += column_performance
                        column_user.append(column_performance)
                        
                    
            print(user_performance)
            if total_weightage == 0 and user_performance > 0:
                user_performance = 100            
            column_wise_performance[user_id]=column_user
            team_results.append({
                "User ID": user_id,
                "Matching Performance (%)": user_performance,
                "Matched_Tags":matched_tags_set
            })
            total_team_performance += user_performance

        team_avg_performance = total_team_performance / len(team) if team else 0
        results.append({
            "Team": team,
            "Team Performance (%)": team_avg_performance,
            "Members": team_results,
            "Column Performance":sum([v[0] for v in column_wise_performance.values()])
        })
    
    return results

# Calculate matching performance
try:
    results = calculate_matching_performance(df, preference, teams)
    print(results)
    # Convert results to DataFrame for saving
    team_results_list = []
    for result in results:
        team = result["Team"]
        team_performance = result["Team Performance (%)"]

        for member in result["Members"]:
            each_user_tags = ",".join(mem_tag for mem_tag in member["Matched_Tags"] if len(mem_tag) > 0)
            each_user_tags = each_user_tags.strip(',')
            team_results_list.append({
                "Team": team,
                "User ID": member["User ID"],
                "Performance": member["Matching Performance (%)"],
                "Team Performance (%)": team_performance,
                "Tags":each_user_tags
            })

    result_df = pd.DataFrame(team_results_list)
    result_df=result_df.fillna('')

    # Convert tags from comma-separated string to set
    result_df['Tags'] = result_df['Tags'].apply(lambda x: set(map(str.strip, x.split(','))))
except Exception as e:
    pass

# Initialize lists to hold the results
performance_list = []
main_tag_list = []
member_wise_tag_list = []
# Process each team
try:
    for team in teams:
        team_performance = {}
        team_tags = {}
        team_tags_set = set()
        
        for user_id in team:
            # Get the performance and tags for the user
            user_data = result_df[result_df['User ID'] == user_id].iloc[0]
            performance = user_data['Performance']
            tags = set(user_data['Tags'])
            
            # Populate the dictionaries and sets
            team_performance[user_id] = performance
            team_tags[user_id] = tags
            team_tags_set.update(tags)
        
        # Append to the result lists
        performance_list.append(team_performance)
        member_wise_tag_list.append(team_tags)
        main_tag_list.append(team_tags_set)
except Exception as e:
    pass

# Print the results
print("User Performance List:")
print(performance_list)
print("\nUser Tags List:")
print(member_wise_tag_list)
print("\nTeam Tags List:")
print(main_tag_list)
print("\nTeams List:")
print(teams1)

teams = teams1
#SWAP TEAM CODE START
def try_swap_teams(df, preference, initial_teams, initial_performance, highest_performance, results):
    optimized_teams = copy.deepcopy(initial_teams)
    initial_performance_list = copy.deepcopy(initial_performance)
    num_teams = len(optimized_teams)
    
    # Track pairs of teams that have already been checked
    checked_pairs = set()
    i = 0
    
    while i < num_teams:
        first_team = list(initial_performance_list[i].keys())
        
        # Skip teams with 100% performance
        first_team_performance = sum(initial_performance_list[i].values()) / len(initial_performance_list[i].values())
        if first_team_performance >= highest_performance:
            i += 1
            continue
        
        j = i + 1
        while True:
            # If j exceeds the number of teams, reset it to 0
            if j >= num_teams:
                j = 0
            
            # Avoid swapping a team with itself
            if i == j:
                break
            
            second_team = list(initial_performance_list[j].keys())
            checked_team = first_team + second_team
            checked_team = tuple(sorted(checked_team))
            
            # Skip this pair if it has already been checked
            if checked_team in checked_pairs:
                j += 1
                continue
            
            # Calculate second team performance
            second_team_performance = sum(initial_performance_list[j].values()) / len(initial_performance_list[j].values())
            
            # Skip if both teams already have 100% performance
            if first_team_performance >= highest_performance and second_team_performance >= highest_performance:
                checked_pairs.add(checked_team)
                j += 1
                continue
            
            # Try swapping each member of the first team with each member of the second team
            swap_occurred = False
            for first_member in first_team:
                for second_member in second_team:
                    print(first_team, second_team, '&&&&&&**********************************************************')
                    # Create deep copies for swapping
                    new_first_team = first_team.copy()
                    new_second_team = second_team.copy()

                    if first_member in new_first_team and second_member in new_second_team:
                        # Perform the swap
                        new_first_team.remove(first_member)
                        new_first_team.append(second_member)
                        new_second_team.remove(second_member)
                        new_second_team.append(first_member)

                        # Calculate the new performances
                        both_team_result = calculate_matching_performance(df, preference, [new_first_team, new_second_team])
                        new_first_team_performance = both_team_result[0]['Team Performance (%)']
                        new_second_team_performance = both_team_result[1]['Team Performance (%)']
                        
                        # Get column performance values
                        first_team_first_column_performance = results[i]['Column Performance']
                        second_team_first_column_performance = results[j]['Column Performance']
                        new_first_team_first_column_performance = both_team_result[0]['Column Performance']
                        new_second_team_first_column_performance = both_team_result[1]['Column Performance']

                        print(new_first_team_performance, first_team_performance, new_second_team_performance, second_team_performance)
                        
                        # Only accept the swap if both teams' performances improve
                        if (new_first_team_performance > first_team_performance and
                            new_second_team_performance >= second_team_performance) and \
                            (new_first_team_first_column_performance >= first_team_first_column_performance and 
                             new_second_team_first_column_performance >= second_team_first_column_performance):
                            
                            first_team = new_first_team
                            second_team = new_second_team
                            first_team_performance = new_first_team_performance
                            second_team_performance = new_second_team_performance
                            
                            # Update the performance list
                            new_initial_performance_i = {member['User ID']: member['Matching Performance (%)'] for member in both_team_result[0]['Members']}
                            new_initial_performance_j = {member['User ID']: member['Matching Performance (%)'] for member in both_team_result[1]['Members']}
                            optimized_teams[i] = first_team
                            optimized_teams[j] = second_team
                            initial_performance_list[i] = new_initial_performance_i
                            initial_performance_list[j] = new_initial_performance_j
                            
                            results[i]['Column Performance'] = new_first_team_first_column_performance
                            results[j]['Column Performance'] = new_second_team_first_column_performance
                            swap_occurred = True
                            print('SWAPPED:', first_team, second_team)
                            break  # Break the inner loop to continue with the next teams
                if swap_occurred:
                    break  # Break the outer loop after a successful swap
                
            # Mark this pair as checked
            checked_pairs.add(checked_team)
            
            # Move to the next team in j loop, but stop when we've exhausted all possible swaps
            if j == i - 1 or j == num_teams - 1:
                break  # End the j loop if we've looped through all teams
            
            j += 1  # Increment j to check the next pair of teams
        
        i += 1  # Move to the next team

    return optimized_teams
average_performances = [sum(team_set.values()) / len(team_set) for team_set in performance_list]

# Find the maximum average performance
highest_performance = max(average_performances)

teams = try_swap_teams(df, preference, teams, performance_list,highest_performance,results)




results = calculate_matching_performance(df, preference, teams)
print(results)
# Convert results to DataFrame for saving
team_results_list = []
for result in results:
    team = result["Team"]
    team_performance = result["Team Performance (%)"]

    for member in result["Members"]:
        each_user_tags = ",".join(mem_tag for mem_tag in member["Matched_Tags"] if len(mem_tag) > 0)
        each_user_tags = each_user_tags.strip(',')
        team_results_list.append({
            "Team": team,
            "User ID": member["User ID"],
            "Performance": member["Matching Performance (%)"],
            "Team Performance (%)": team_performance,
            "Tags":each_user_tags
        })

result_df = pd.DataFrame(team_results_list)
result_df=result_df.fillna('')

# Convert tags from comma-separated string to set
result_df['Tags'] = result_df['Tags'].apply(lambda x: set(map(str.strip, x.split(','))))

#     # Initialize lists to hold the results
# except Exception as e:
#     pass

performance_list = []
main_tag_list = []
member_wise_tag_list = []
# Process each team
try:
    for team in teams:
        team_performance = {}
        team_tags = {}
        team_tags_set = set()

        for user_id in team:
            # Get the performance and tags for the user
            user_data = result_df[result_df['User ID'] == user_id].iloc[0]
            performance = user_data['Performance']
            tags = set(user_data['Tags'])

            # Populate the dictionaries and sets
            team_performance[user_id] = performance
            team_tags[user_id] = tags
            team_tags_set.update(tags)

        # Append to the result lists
        performance_list.append(team_performance)
        member_wise_tag_list.append(team_tags)
        main_tag_list.append(team_tags_set)
except Exception as e:
    pass

teams1 = teams

sql = "INSERT INTO event_teamset_members (event_teamset_id, member_id,team_id,team_name,tags,team_rating) VALUES (%s, %s,%s,%s,%s,%s)"
team_profile_sql = "INSERT INTO team_profiles (event_teamset_id,team_id,entity_id,entity_type,rating_type,rating_value) VALUES (%s,%s,%s,%s,%s,%s)"
for p in range(len(teams1)):
    for q in range(len(teams1[p])):
        team_ids = p+1
        team_name = "Group "+str(team_ids)
        try:
            # matchTags = tags1[p][teams1[p][q]]
            matchTagsDic = member_wise_tag_list[p][teams1[p][q]]
            matchTags = ', '.join(matchTagsDic)
        except Exception as e:
            matchTags = ''
        rating_value = next((d[teams1[p][q]] for d in performance_list if teams1[p][q] in d), None)

        values = (event_teamset_id, int(teams1[p][q]),p+1,team_name,matchTags,int(rating_value) if rating_value is not None else 0)
        cursorObject.execute(sql, values)
        dataBase.commit()
    if len(performance_list) >0:    
        entity_type = "Team"
        rating_type = "3StarRatingErrorbased"
        data_dict = performance_list[p]
        try:
            dist_val = sum(list(data_dict.values()))/len(data_dict)
        except Exception as e:
            dist_val = 0        
        rating_value = math.floor(dist_val)
        team_profile_values = (event_teamset_id, p+1,p+1,entity_type,rating_type,rating_value)
        cursorObject.execute(team_profile_sql, team_profile_values)
        dataBase.commit()

# sql = "INSERT INTO event_teamset_members (event_teamset_id, member_id,team_id,team_name,tags) VALUES (%s, %s, %s, %s, %s)"
# values = [(event_teamset_id, int(teams1[p][q]), p+1, "Group "+str(p+1), tags1[p].get(teams1[p][q], '')) for p in range(len(teams1)) for q in range(len(teams1[p]))]
# cursorObject.executemany(sql, values)
# dataBase.commit()
exit()
