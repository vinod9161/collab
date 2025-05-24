import pandas as pd
import sys
import mysql.connector
import json
import math
import copy
from collections import Counter
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

print(dict_data.get('team_group'))

data = dict_data.get('team_group')
manager_category_restrictions = {}
region_restrictions = {}

for entry in data:
    q_id = entry['q_id']
    for tag in entry['exclude_group']:
        for key, value in tag.items():
            # If q_id is 31177, store the data in manager_category_restrictions
            if q_id == '31201':
                manager_category_restrictions[key] = value

            # If q_id is 31175, store the data in region_restrictions
            elif q_id == '31199':
                region_restrictions[key] = value

# Now, manager_category_restrictions and region_restrictions should be populated
print("Manager Category Restrictions:", manager_category_restrictions)
print("Region Restrictions:", region_restrictions)

data = dict_data.get('team_group')
manager_include_group = {}
region_include_group = {}

for entry in data:
    q_id = entry['q_id']
    for tag in entry['include_group']:
        for key, value in tag.items():
            if q_id == '31201':
                manager_include_group[key] = value

            elif q_id == '31199':
                region_include_group[key] = value

print("Manager Category include_group:", manager_include_group)
print("Region include_group:", region_include_group)
exit()

# Create a new dictionary to hold all combinations
extended_manager_category_restrictions = {}
extended_region_restrictions = {}

# Add original pairs to the new dictionary and ensure no duplicates
for key, values in manager_category_restrictions.items():
    # Initialize the key if not present
    if key not in extended_manager_category_restrictions:
        extended_manager_category_restrictions[key] = []
    
    for value in values:
        # Add the value to the key's list, ensuring no duplicates
        if value not in extended_manager_category_restrictions[key]:
            extended_manager_category_restrictions[key].append(value)

        # Add reverse mapping
        if value not in extended_manager_category_restrictions:
            extended_manager_category_restrictions[value] = []
        
        if key not in extended_manager_category_restrictions[value]:
            extended_manager_category_restrictions[value].append(key)

# Add original pairs to the new dictionary and ensure no duplicates
for key, values in region_restrictions.items():
    # Initialize the key if not present
    if key not in extended_region_restrictions:
        extended_region_restrictions[key] = []
    
    for value in values:
        # Add the value to the key's list, ensuring no duplicates
        if value not in extended_region_restrictions[key]:
            extended_region_restrictions[key].append(value)

        # Add reverse mapping
        if value not in extended_region_restrictions:
            extended_region_restrictions[value] = []
        
        if key not in extended_region_restrictions[value]:
            extended_region_restrictions[value].append(key)


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
    selectQuestionCategory = "SELECT id as questionId,question,category_flag as category,type,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id IN %(ids)s"% {'ids': tuple(quest_id)}
else:
    selectQuestionCategory = "SELECT id as questionId,question,category_flag as category,type,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id =%s"% (quest_id[0])

cursorObject.execute(selectQuestionCategory)
question_result = cursorObject.fetchall()

question_result = sorted(question_result, key=lambda x: quest_id.index(x['questionId']))

category = [d.get('category') for d in question_result]
question_list = [d.get('question') for d in question_result]
qid = [d.get('questionId') for d in question_result]
question_dict = {d.get('questionId'): d.get('question') for d in question_result}

ai_trained_qid = [d['questionId'] for d in question_result if (d['category'] in [2, 3] or d['type'] == 4)]
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
            new_dic[question_id] = data['tags'][i]
            if question_id in ai_trained_qid and event_result['ai_tag_status'] == 1:
                new_dic[f"{question_id}_AI"] = data['ai_categories'][i]  # Adding _AI column
        new_list.append(new_dic)
        id_dict[data['id'][i]] = len(new_list) - 1  # Store the index of this id in new_list
    else:
        # Existing id, update the dictionary
        index = id_dict[data['id'][i]]
        if pd.notna(data['question_id'][i]):  # Check if question_id is not NaN
            question_id = data['question_id'][i]
            new_list[index][question_id] = data['tags'][i]
            if question_id in ai_trained_qid and event_result['ai_tag_status'] == 1:
                new_list[index][f"{question_id}_AI"] = data['ai_categories'][i]  # Adding _AI column

# Convert to DataFrame
data1 = pd.DataFrame(new_list)

data1.drop_duplicates(inplace=True)

data1.reset_index(inplace = True,drop=True)
df=data1

# df.to_csv('AI_tags_17Sep_tags3.csv',index=False)
# exit()
data1.drop_duplicates(inplace=True)

col_list = data1.columns.tolist()

col_list1={'id':'User ID'}
for col in col_list[3:]:
    col_list1[col]=str(col)

data1.reset_index(inplace = True,drop=True)
df=data1

df = df.rename(columns=lambda col: question_dict.get(col, col))       
# df.to_csv('AI_tags_17Sep_tags6.csv',index=False)
# exit()
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

df['PSEUDONYM'] = df['first_name'] + ' ' + df['last_name']
df.to_csv('AI_tags_17Sep_tags8.csv',index=False)
manager_category_restrictions = extended_manager_category_restrictions
region_restrictions = extended_region_restrictions
# print('Vinod Test')
print(manager_category_restrictions)
print(region_restrictions)
# exit()

# Rule 1: Manager category restrictions
def violates_manager_category(current_team, user):
    for member in current_team:
        if (user["Manager Category"] in manager_category_restrictions.get(member["Manager Category"], []) or
            member["Manager Category"] in manager_category_restrictions.get(user["Manager Category"], [])):
            return True
    return False

# Rule 2: Region restrictions
def violates_region(current_team, user):
    for member in current_team:
        if (user["Region"] in region_restrictions.get(member["Region"], []) or
            member["Region"] in region_restrictions.get(user["Region"], [])):
            return True
    return False

# Rule 3: Manager uniqueness (N+1 pseudonym is manager name)
def violates_manager_unique(current_team, user):
    for member in current_team:
        if member["N+1 pseudonym"] == user["N+1 pseudonym"]:
            return True
    return False

# Rule 4: No user can be in the same team as their own manager
def violates_own_manager(current_team, user):
    for member in current_team:
        if user["PSEUDONYM"] == member["N+1 pseudonym"] or member["PSEUDONYM"] == user["N+1 pseudonym"]:
            return True
    return False

# Check if a user violates any rule when added to a team
def violates_any_rule(current_team, user_data):
    return (violates_manager_category(current_team, user_data) or
            violates_region(current_team, user_data) or
            violates_manager_unique(current_team, user_data) or
            violates_own_manager(current_team, user_data))

# Recursively build teams
def recursive_team_builder(df, team_size, teams=[], repeated_id=[]):
    remaining_users = df[~df['User ID'].isin(repeated_id)]
    
    # Base case: if there are no remaining users, return the teams
    if remaining_users.empty:
        return teams
    
    current_team = []
    
    for i, user in remaining_users.iterrows():
        user_data = user.to_dict()

        # Skip users already added to a team
        if user['User ID'] in repeated_id:
            continue

        # Check if adding the user violates any of the rules
        if len(current_team) < team_size and not violates_any_rule(current_team, user_data):
            current_team.append(user_data)
            repeated_id.append(user['User ID'])  # Add to repeated ID list to avoid duplication
        
        if len(current_team) == team_size:
            break  # Break if the current team is full
    
    if current_team:
        teams.append(current_team)
    
    # Recursively build the next teams
    return recursive_team_builder(df, team_size, teams, repeated_id)


def merge_teams_with_indices(teams, ideal_team_size):
    merged_teams = []
    merged_indices = []
    temp_team = []
    temp_indices = []
    max_size=ideal_team_size

    for i, team in enumerate(teams):
        temp_team += team
        temp_indices += [i] * len(team)
        
        # Finalize the team if it reaches the max size
        while len(temp_team) > max_size:
            merged_teams.append(temp_team[:max_size])
            merged_indices.append(temp_indices[:max_size])
            temp_team = temp_team[max_size:]
            temp_indices = temp_indices[max_size:]
        
        # Finalize the team if it reaches the ideal size
        if len(temp_team) == ideal_team_size:
            merged_teams.append(temp_team)
            merged_indices.append(temp_indices)
            temp_team = []
            temp_indices = []

    # Handle any remaining users
    if len(temp_team) > 0:
        if len(temp_team) <= max_size:
            merged_teams.append(temp_team)
            merged_indices.append(temp_indices)
        elif len(temp_team) > ideal_team_size and len(temp_team) <= max_size + ideal_team_size:
            merged_teams.append(temp_team[:ideal_team_size])
            merged_indices.append(temp_indices[:ideal_team_size])
            merged_teams.append(temp_team[ideal_team_size:])
            merged_indices.append(temp_indices[ideal_team_size:])
        else:
            while len(temp_team) > ideal_team_size:
                merged_teams.append(temp_team[:ideal_team_size])
                merged_indices.append(temp_indices[:ideal_team_size])
                temp_team = temp_team[ideal_team_size:]
                temp_indices = temp_indices[ideal_team_size:]
            if len(temp_team) > 0:
                merged_teams.append(temp_team)
                merged_indices.append(temp_indices)

    return merged_teams, merged_indices

def recursive_team_builder_fill(df, team_size, teams=[],swap_list = []):
    remaining_users = df[df['User ID'].isin(swap_list)]
#     print(remaining_users,'AAAAAAAas')
    # Base case: if there are no remaining users, return the teams
    if remaining_users.empty:
        return True
    
    current_team = []
    team_id = []
    for i, user in remaining_users.iterrows():
        user_data = user.to_dict()

        # Check if adding the user violates any of the rules
        if len(current_team) < team_size and not violates_any_rule(current_team, user_data):
            current_team.append(user_data)
            team_id.append(user['User ID'])  # Add to repeated ID list to avoid duplication
#             print(user['User ID'])
            if len(current_team) == team_size:
                return True
            
    return False


# Fill and finalize teams, handling any underfilled teams
def fill_and_finalize_teams(df, team_size):
    teams = recursive_team_builder(df, team_size)

    # Ensure that all teams are full
    for team in teams:
        if len(team) < team_size:
            print(f"Warning: Team with IDs {[user['User ID'] for user in team]} is not fully filled.")
    teams1 = []
    small_team = []
    for idx, team1 in enumerate(teams, start=1):
        if len(team1) == team_size:
            teams1.append([user['User ID'] for user in team1])
        else:
            small_team.append([user['User ID'] for user in team1])
    teams1.extend(small_team)
    result_teams, result_indices = merge_teams_with_indices(teams1,team_size)
    result_index = [set(ind) for ind in result_indices]
    print(len(result_index),len(result_teams),result_teams)
    optimized_teams = copy.deepcopy(result_teams)
    for r_i,r_data in enumerate(result_index): #r_i is result_index,r_data result data
        if len(r_data) > 1:
            print(r_data,optimized_teams[r_i],r_i)
            swapped = False
            for r_t_i,r_t in enumerate(result_teams):#r_t_i is result team index
                for b_user in result_teams[r_i]:
                    for iter_user in result_teams[r_t_i]:
                        if r_i != r_t_i:
                            new_base_team = optimized_teams[r_i].copy()
                            new_iter_team = optimized_teams[r_t_i].copy()
                            if b_user in new_base_team and iter_user in new_iter_team:
                                new_base_team.remove(b_user)
                                new_base_team.append(iter_user)
                                new_iter_team.remove(iter_user)
                                new_iter_team.append(b_user)

                                true_list = []

                                merge_list = [new_base_team,new_iter_team]
                                for tm in merge_list:

                                    check = recursive_team_builder_fill(df, team_size, teams=[],swap_list = tm)
                                    
                                    true_list.append(check)

                                if true_list[0] == True and true_list[1] == True:                                    

                                    optimized_teams[r_i] = new_base_team
                                    optimized_teams[r_t_i] = new_iter_team
                                    swapped = True
                                    print(b_user,iter_user,'BBB',new_base_team,new_iter_team)
                                    print('AAA',true_list,r_t_i)
                                    
                                    break
                                    
                        if swapped:        
                            break
                    if swapped:
                        break
                if swapped:
                    break
            
#             break
                                
            
#     if len(optimized_teams[-1]) == 1:
    remaining_users = df[df['User ID'].isin(optimized_teams[-1])]
    
    for i, user1 in remaining_users.iterrows():
#         print('index1',i)
        user_data1 = user1.to_dict()
        added = False
        for c_t_ind,tm in enumerate(optimized_teams):
            remaining_users1 = df[df['User ID'].isin(tm)]
            current_team1 = []
            for i, user in remaining_users1.iterrows():
                user_data = user.to_dict()
                current_team1.append(user_data)
                if not violates_any_rule(current_team1, user_data1):
                    if len(optimized_teams[c_t_ind]) < 5:
                        optimized_teams[c_t_ind].append(user1['User ID'])
                        print(optimized_teams[-1],user1['User ID'],'kkk')
                        optimized_teams[-1].remove(user1['User ID'])
                        added = True
                        break
            if added:
                break
    optimized_teams = [op for op in optimized_teams if len(op) > 0]
    return optimized_teams


# Build and finalize teams
teams1 = fill_and_finalize_teams(df,team_size)

teams1 = sorted(teams1, key=len)

print(teams1)
# exit()
performance_list = []

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
        rating_value = 0

        values = (event_teamset_id, int(teams1[p][q]),p+1,team_name,matchTags,int(rating_value))
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
