import pandas as pd
import sys
import mysql.connector
import json
import math
event_teamset_id= sys.argv[1]
attendie_id= int(sys.argv[2])
target_team= sys.argv[3]
print(event_teamset_id)
print(attendie_id)
print(target_team)
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
# print(dict_data)
# sys.exit()

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
    selectQuestionCategory = "SELECT id as questionId,category_flag as category,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id IN %(ids)s"% {'ids': tuple(quest_id)}
else:
    selectQuestionCategory = "SELECT id as questionId,category_flag as category,AskOfferQuestionPair as askOfferPair FROM questions WHERE category_flag > 0 AND id =%s"% (quest_id[0])

cursorObject.execute(selectQuestionCategory)
question_result = cursorObject.fetchall()

question_result = sorted(question_result, key=lambda x: quest_id.index(x['questionId']))

category = [d.get('category') for d in question_result]
qid = [d.get('questionId') for d in question_result]
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

if not all_zeros:
    preference = [item for item in preference if item[1] != 0]

for pe in range(len(preference)):
    li = list(preference[pe][0].split("_"))
    # print(li[1])
    preference[pe][0]=li[1]

event_query = "SELECT id,participant_team_status FROM events where id=%s"% (event_id)
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
    question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies LEFT JOIN answers ON attendies.id=answers.attendie_id where attendies.event_id=%s"
else:
    question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies INNER JOIN answers ON attendies.id=answers.attendie_id where attendies.event_id=%s"

val = (event_id,)

cursorObject.execute(question_query,val)
question_result = cursorObject.fetchall()
data= pd.DataFrame(question_result)

new_list=[]
new_dic={}
ind_id=None
for i in data.index:
    if data['id'][i]!=ind_id:
        new_dic['id']=data['id'][i]
        new_dic['first_name']=data['first_name'][i]
        new_dic['last_name']=data['last_name'][i]
        new_dic[data['question_id'][i]]=data['tags'][i]
        new_list.append(new_dic)
        ind_id = data['id'][i]
        new_dic1=new_dic
        new_dic={}
    elif data['id'][i]==ind_id:
#         data['id'][i]=ind_id
        new_dic[data['question_id'][i]]=data['tags'][i]
        new_dic1[list(new_dic.keys())[0]]=list(new_dic.values())[0]
        new_list.append(new_dic1)
    new_dic={}
     

data1= pd.DataFrame(new_list)

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
    for v in dict_data.get('previousEventTeamSets'):
        previous_event_teamset_id.append(v.get('event_teamset_id'))
        event_teamset_value.append(v.get('qwValue'))

    for v in range(len(event_teamset_value)):
        if(event_teamset_value[v] < 0):
            previous_team_id = previous_event_teamset_id[v]
            previous_team_value = event_teamset_value[v]
            my_teamset_preference= previous_team_value

    if(previous_team_id):
        previous_teamset_query = "SELECT member_id,team_id FROM event_teamset_members WHERE event_teamset_id =%s"% (previous_team_id)
        cursorObject.execute(previous_teamset_query)
        previous_teamset_result = cursorObject.fetchall()

    l = previous_teamset_result
    d={}
    for i in l:
        if i['team_id'] not in d:
            d[i['team_id']]=[i['member_id']]
        else:
            d[i['team_id']].append(i['member_id'])
    data = pd.DataFrame(d)
    data = data.transpose()
    # my_first_teamset = pd.read_csv('First_teamset.csv')
    my_first_teamset = data
    my_first_teamset_list = my_first_teamset.values.tolist()

except Exception as e:
    my_first_teamset_list=[]

# my_first_teamset_list1 = [[] for i in range(len(my_first_teamset_list[0]))]
try:
    my_first_teamset_list1 = [[] for i in range(len(my_first_teamset_list[0]))]
except Exception as e:
    my_first_teamset_list1 = []

# Use nested loops to transpose the elements of l into l1
for sublist in my_first_teamset_list:
    for i, element in enumerate(sublist):
        my_first_teamset_list1[i].append(element)
        
my_first_teamset_list2=[]
for l in my_first_teamset_list1:
    for k in l:
        my_first_teamset_list2.append(k)

if(len(dict_data['p_together'])) >0 :
    people_in_same_team=dict_data['p_together']
else:
    people_in_same_team = []
if(len(dict_data['p_different'])) >0 :
    people_in_diff_team=dict_data['p_different']
else:
    people_in_diff_team = []
# people_in_diff_team=sum(people_in_diff_team, [])
# print(people_in_diff_team)
# exit()
people_out_from_team=dict_data['p_exclude']

for user_id_to_remove in people_out_from_team:
    df = df.drop(df[df['User ID'] == user_id_to_remove].index)
# df.to_csv('dataset11jan.csv',index=False)
# exit()
df = df.applymap(lambda x: x.lower() if isinstance(x, str) else x)


def normal_performance(team,user_id):
    if len(preference) > 1:
        result_df = df[df['User ID'].isin(team)]
        for prefer in preference[1:]:
            if prefer[2] == 6:
                team_data1 = result_df.set_index('User ID')[prefer[0]].to_dict()
                # Step 1: Identify all unique tags
                all_tags1 = set(tag for tags in team_data1.values() for tag in tags.split(','))
                num_unique_tags1 = len(all_tags1)
                score_per_tag1 = 100 / num_unique_tags1
                # Step 2: Calculate performance for each user
                for user_id1, tags1 in team_data1.items():
                    if user_id == user_id1:
                        user_tags1 = set(tags1.split(','))
                        # Create a copy of the all_tags list for comparison
                        all_tags_list1 = [tag for tags in team_data1.values() for tag in tags.split(',')]

                        # Remove each tag in user_tags from all_tags_list only once
                        for user_tag1 in user_tags1:
                            if user_tag1 in all_tags_list1:
                                all_tags_list1.remove(user_tag1)
                        # Convert the remaining tags to a set for intersection
                        tags_except_current_user1 = set(all_tags_list1)

                        # Find the intersection of the user's tags with the remaining tags
                        matched_tags1 = user_tags1.intersection(tags_except_current_user1)
                        if len(matched_tags1) > 0:
                            performance = (len(matched_tags1)+num_unique_tags1-len(user_tags1)) * score_per_tag1
                            temp_tag_set.update(matched_tags1)
                            member_wise_tag[user_id] = matched_tags1
                            break
                        else:
                            if len(matched_tags1) == 0 and prefer[1] < 0:
                                performance = 100
                            else:
                                performance = 0
                if performance > 0:
                    break
            elif prefer[2] == 9:
                team_data_ask = result_df.set_index('User ID')['Ask'].to_dict()
                team_data_offer = result_df.set_index('User ID')['Offer'].to_dict()
                  #THIS IS USED WHEN 1st question is normal then 2nd or thirds question is ask offer and after then again normal
                performance = calculate_performance_corrected(team_data_ask, team_data_offer,team,user_id,prefer[1],temp_tag_set,member_wise_tag)
                if performance > 0:
                    break
            elif prefer[2] == 5:
                team_data = result_df.set_index('User ID')[prefer[0]].to_dict()
                performance = network_performance_latest(team_data,team,user_id,prefer[1])  
            if performance > 0:
                break
    else:
        performance = 0
    return performance

def calculate_performance_corrected(ask, offer,team,single_member_id = None,pref = None,temp_tag_set = None,member_wise_tag = None):
    performances = {}
    if single_member_id != None:
        ask_id_list = [single_member_id]
    else:
        ask_id_list = [i for i in ask]
    for user_id in ask_id_list:
        # First condition
        # User tags from 'ask'
        user_tags1 = set(ask[user_id].split(','))

        # All tags from 'offer' except current user
        other_tags_offer = set()
        for other_id in offer:
            if other_id != user_id:
                other_tags_offer.update(offer[other_id].split(','))

        # Calculate unique tags and score per tag
        unique_tags1 = user_tags1.union(other_tags_offer)
        score_per_tag1 = 100 / len(unique_tags1)

        # Calculate performance for the first condition
        
        user_tag1 = {i for i in user_tags1 if len(i) !=0}
        other_tags_offer = {i for i in other_tags_offer if len(i) !=0}
        matched_tags1 = user_tags1.intersection(other_tags_offer)
        if len(matched_tags1) > 0 and pref > 0:
            performance1 = (len(matched_tags1) + len(unique_tags1) - len(user_tags1)) * score_per_tag1
            temp_tag_set.update(matched_tags1)
#             member_wise_tag[user_id] = matched_tags1
        else:
            if len(matched_tags1) == 0 and pref < 0:
                performance1 = 100
                temp_tag_set.update(matched_tags1)
            elif len(matched_tags1) > 0 and pref < 0:
                temp_offer_list = []
                temp_dic_list_offer = dict()
                for other_id in offer:
                    if other_id != user_id:
                        temp_offer_list.append(offer[other_id])
                temp_dic_list_offer['Offer'] = temp_offer_list
                temp_df_offer = pd.DataFrame(temp_dic_list_offer)
                temp_df_offer['Offer_Set'] = temp_df_offer['Offer'].apply(lambda x: set(x.split(',')))
                temp_df_offer['Not_Matching_Percent_Offer'] = temp_df_offer['Offer_Set'].apply(lambda x: len(user_tag1.difference(x)) / len(user_tag1) * 100)
                temp_df_offer = temp_df_offer.drop(columns=['Offer_Set'])
                performance1 = sum(temp_df_offer['Not_Matching_Percent_Offer'])/len(temp_df_offer)
#                 performance1 = 100 - ((len(matched_tags1) + len(unique_tags1) - len(user_tags1)) * score_per_tag1)
            else:
                performance1 = 0
        # Second condition
        # User tags from 'offer'
        user_tags2 = set(offer[user_id].split(','))

        # All tags from 'ask' except current user
        other_tags_ask = set()
        for other_id in ask:
            if other_id != user_id:
                other_tags_ask.update(ask[other_id].split(','))

        # Calculate unique tags and score per tag for the second condition
        unique_tags2 = user_tags2.union(other_tags_ask)
        score_per_tag2 = 100 / len(unique_tags2)

        # Calculate performance for the second condition
        user_tags2 = {i for i in user_tags2 if len(i) !=0}
        other_tags_ask = {i for i in other_tags_ask if len(i) !=0}
        matched_tags2 = user_tags2.intersection(other_tags_ask)
        if len(matched_tags2) > 0 and pref > 0:
            performance2 = (len(matched_tags2) + len(unique_tags2) - len(user_tags2)) * score_per_tag2
            temp_tag_set.update(matched_tags2)
#             member_wise_tag[user_id] = matched_tags2
        else:
            if len(matched_tags2) == 0 and pref < 0:
                performance2 = 100
                temp_tag_set.update(matched_tags2)
            elif len(matched_tags2) > 0 and pref < 0:
                temp_ask_list = []
                temp_dic_list_ask = dict()
                for other_id in ask:
                    if other_id != user_id:
                        temp_ask_list.append(offer[other_id])
                temp_dic_list_ask['Ask'] = temp_ask_list
                temp_df_ask = pd.DataFrame(temp_dic_list_ask)
                temp_df_ask['Ask_Set'] = temp_df_ask['Ask'].apply(lambda x: set(x.split(',')))
                temp_df_ask['Not_Matching_Percent_Ask'] = temp_df_ask['Ask_Set'].apply(lambda x: len(user_tags2.difference(x)) / len(user_tags2) * 100)
                temp_df_ask = temp_df_ask.drop(columns=['Ask_Set'])
                performance2 = sum(temp_df_ask['Not_Matching_Percent_Ask'])/len(temp_df_ask)
#                 performance2 = 100 - ((len(matched_tags2) + len(unique_tags2) - len(user_tags2)) * score_per_tag2)
            else:
                performance2 = 0
        # Calculate final performance
        print(performance1,performance2,matched_tags1,matched_tags2)
        final_performance = (performance1 + performance2) / 2
        member_wise_tag[user_id] = matched_tags1 | matched_tags2
        if final_performance > 0:
            if single_member_id == None:
                performances[user_id] = final_performance
            else:
                return final_performance
        else:
            if single_member_id == None:
                final_performance = normal_performance(team,user_id)
            else:
                return final_performance
            performances[user_id] = final_performance

    return performances


def network_performance_latest(team_data,team,single_member_id = None,pref=None):
    print(single_member_id,pref)
    if single_member_id != None:
        team_data_list = [single_member_id]
    else:
        team_data_list = team
    for key in team_data_list:
        if len(team_data[key]) > 0:
            print(team_data[key],team)
            other_value_set = {int(v1.strip()) for k,v in team_data.items() if k != key and len(v) > 0 for v1 in v.split(',')}
            print(team_data[key])
            other_key_set = {i for i in team if i != key}
            print(other_value_set)
            member_wise_value = [int(i.strip()) for i in team_data[key].split(',')]
            member_tags = []
            num_match = 0 #NUMBER OF MATCH
            for value in member_wise_value:
                if value in team:
                    name = df[df['User ID']==value]['first_name'].iloc[0] +' '+ df[df['User ID']==value]['last_name'].iloc[0]
                    member_tags.append(name)
                    num_match += 1
            member_wise_tag[key] = set(member_tags)
            if num_match > 0:
                if pref > 0:
                    if single_member_id == None:
                        if len(member_wise_value) > 0:
                            performance = (num_match * 100)/len(member_wise_value)
                            team_performance[key] = performance
                    else:
                        if len(member_wise_value) > 0:
                            performance = (num_match * 100)/len(member_wise_value)
                        return performance
                else:
                    if single_member_id == None:
                        if len(member_wise_value) > 0:
                            performance = 100 - ((num_match * 100)/len(member_wise_value))
                        team_performance[key] = performance
                    else:
                        if len(member_wise_value) > 0:
                            performance = 100 - ((num_match * 100)/len(member_wise_value))
                        return performance
            else:
                if pref > 0:
                    if single_member_id == None:
                        try:
                            team_performance[key] = normal_performance(team,key)
                        except Exception as e:
                            team_performance[key] = 0
                    else:
                        return 0
                else:
                    if single_member_id == None:
                        team_performance[key] = 100
                    else:
                        return 100

        else:
            if single_member_id == None:
                try:
                    team_performance[key] = normal_performance(team,key)
                except Exception as e:
                    team_performance[key] = 0
            else:
                return 0
    return team_performance


performance_list = []
main_tag_list = []
member_wise_tag_list = []
def performace_group_tags_member_tags(teams):
    # print('ppppppp')
    # print(teams)
    # sys.exit()
    for team in teams:
        temp_tag_set = set()
        member_wise_tag = dict()
        if preference[0][2] == 9:
            # print('HI',team)
            result_df = df[df['User ID'].isin(team)]
            team_data_ask = result_df.set_index('User ID')['Ask'].to_dict()
            team_data_offer = result_df.set_index('User ID')['Offer'].to_dict()
            performances_corrected = calculate_performance_corrected(team_data_ask, team_data_offer,team,None,preference[0][1],temp_tag_set,member_wise_tag)
            performance_list.append(performances_corrected)
            group_tags = {value for values in member_wise_tag.values() if len(values) > 0 for value in values}
            main_tag_list.append(group_tags)# we replace temp_tag_set variable by group_tags
            member_wise_tag_list.append(member_wise_tag)
        elif preference[0][2] == 5:
            team_performance = {}
            result_df = df[df['User ID'].isin(team)]
            team_data = result_df.set_index('User ID')[preference[0][0]].to_dict()
            performance_corrected = network_performance_latest(team_data,team,None,preference[0][1])
            performance_list.append(performance_corrected)
            group_tags = {value for values in member_wise_tag.values() if len(values) > 0 for value in values}
            main_tag_list.append(group_tags)
            member_wise_tag_list.append(member_wise_tag)
        elif preference[0][2] == 6:
            result_df = df[df['User ID'].isin(team)]
            team_data = result_df.set_index('User ID')[preference[0][0]].to_dict()

            # Step 1: Identify all unique tags
            all_tags = set(tag for tags in team_data.values() for tag in tags.split(','))
            num_unique_tags = len(all_tags)
            try:
                score_per_tag = 100 / num_unique_tags
            except Exception as e:
                score_per_tag = 0
            team_performance = {}

            for user_id, tags in team_data.items():
                user_tags = set(tags.split(','))
                # Create a copy of the all_tags list for comparison
                all_tags_list = [tag for tags in team_data.values() for tag in tags.split(',')]

                # Remove each tag in user_tags from all_tags_list only once
                for user_tag in user_tags:
                    if user_tag in all_tags_list:
                        all_tags_list.remove(user_tag)

                # Convert the remaining tags to a set for intersection
                tags_except_current_user = set(all_tags_list)

                # Find the intersection of the user's tags with the remaining tags
                user_tags = {i for i in user_tags if len(i) !=0}
                tags_except_current_user = {i for i in tags_except_current_user if len(i) !=0}

                matched_tags = user_tags.intersection(tags_except_current_user)
                # print(user_id,matched_tags,user_tags,tags_except_current_user,'********AAAAAAAAAAAAA*********')
                if len(matched_tags) == 0 and preference[0][1] < 0:
                    performance = 100
                    temp_tag_set.update(matched_tags)
                    member_wise_tag[user_id] = matched_tags
                    # print('HII')
                elif len(matched_tags) > 0 and preference[0][1] > 0:
                    performance = (len(matched_tags)+num_unique_tags-len(user_tags)) * score_per_tag
                    temp_tag_set.update(matched_tags)
                    member_wise_tag[user_id] = matched_tags

                elif len(matched_tags) > 0 and preference[0][1] < 0 and len(preference) == 1:
                    temp_normal_list = []
                    temp_dic_list_normal = dict()
                    for other_id1 in team_data:
                        if other_id1 != user_id:
                            temp_normal_list.append(team_data[other_id1])
                    temp_dic_list_normal['Normal'] = temp_normal_list
                    temp_df_normal = pd.DataFrame(temp_dic_list_normal)
                    temp_df_normal['Normal_Set'] = temp_df_normal['Normal'].apply(lambda x: set(x.split(',')))
                    temp_df_normal['Not_Matching_Percent_Normal'] = temp_df_normal['Normal_Set'].apply(lambda x: len(user_tags.difference(x)) / len(user_tags) * 100)
                    temp_df_normal= temp_df_normal.drop(columns=['Normal_Set'])
                    performance = sum(temp_df_normal['Not_Matching_Percent_Normal'])/len(temp_df_normal)
                else:
                    if len(preference) > 1:
                        for prefer in preference[1:]:
                            if prefer[2] == 6:
                                team_data1 = result_df.set_index('User ID')[prefer[0]].to_dict()
                                # Step 1: Identify all unique tags
                                all_tags1 = set(tag for tags in team_data1.values() for tag in tags.split(','))
                                num_unique_tags1 = len(all_tags1)
                                score_per_tag1 = 100 / num_unique_tags1
                                # Step 2: Calculate performance for each user
                #                 team_performance = []
                                for user_id1, tags1 in team_data1.items():
                                    if user_id == user_id1:
                                        user_tags1 = set(tags1.split(','))
                                        # Create a copy of the all_tags list for comparison
                                        all_tags_list1 = [tag for tags in team_data1.values() for tag in tags.split(',')]

                                        # Remove each tag in user_tags from all_tags_list only once
                                        for user_tag1 in user_tags1:
                                            if user_tag1 in all_tags_list1:
                                                all_tags_list1.remove(user_tag1)
                                        # Convert the remaining tags to a set for intersection
                                        tags_except_current_user1 = set(all_tags_list1)

                                        # Find the intersection of the user's tags with the remaining tags
                                        user_tags1 = {i for i in user_tags1 if len(i) !=0}
                                        tags_except_current_user1 = {i for i in tags_except_current_user1 if len(i) !=0}
                                        matched_tags1 = user_tags1.intersection(tags_except_current_user1)
    #                                     print(user_id,matched_tags1)
                                        if len(matched_tags1) > 0 and prefer[1] > 0:
                                            performance = (len(matched_tags1)+num_unique_tags1-len(user_tags1)) * score_per_tag1
                                            temp_tag_set.update(matched_tags1)
                                            member_wise_tag[user_id] = matched_tags
                                            break
                                        else:
                                            if len(matched_tags) == 0 and prefer[1] < 0:
                                                performance = 100
                                                temp_tag_set.update(matched_tags)
                                                member_wise_tag[user_id] = matched_tags
                                            else:
                                                performance = 0
                            elif prefer[2] == 9:
                                # print('HI2')
                                result_df = df[df['User ID'].isin(team)]
                                team_data_ask = result_df.set_index('User ID')['Ask'].to_dict()
                                team_data_offer = result_df.set_index('User ID')['Offer'].to_dict()
                                  #THIS IS USED WHEN 1st question is normal then 2nd or thirds question is ask offer and after then again normal
                                performance = calculate_performance_corrected(team_data_ask, team_data_offer,team,user_id,prefer[1],temp_tag_set,member_wise_tag)
                            elif prefer[2] == 5:
                                # print('HELLO2')    
                                team_data_network = result_df.set_index('User ID')[prefer[0]].to_dict()
                                performance = network_performance_latest(team_data_network,team,user_id,prefer[1])
                            # print(performance,performance_list,'HELLO2')    
                            if performance > 0:
                                break
                    else:
                        performance = 0
                team_performance[user_id] = performance
            performance_list.append(team_performance)
            group_tags = {value for values in member_wise_tag.values() if len(values) > 0 for value in values}
            main_tag_list.append(group_tags)# we replace temp_tag_set variable by group_tags
            member_wise_tag_list.append(member_wise_tag)
    print('Vinod Sharma')
    # print(performance_list)
    # print(group_tags)
    # print(main_tag_list)
    # print(member_wise_tag_list)
    performance_list_dic = dict()
    for k,perform in zip(swap_teams_dic,performance_list):
        performance_list_dic[k] = perform
    performance_list_dic
    print(performance_list_dic)
    print(member_wise_tag_list)
    tags_dict = {}
    for d in member_wise_tag_list:
        tags_dict.update(d)
    sql = "UPDATE event_teamset_members SET member_id = %s, team_id = %s, tags = %s, team_rating = %s, team_name = %s WHERE event_teamset_id = %s AND member_id = %s" 
    team_profile_sql = "UPDATE team_profiles SET rating_value = %s WHERE event_teamset_id = %s AND team_id =%s"
    for team_id, members in performance_list_dic.items():
        for member, value in members.items():
            try:
                member_tags_dic = tags_dict.get(member, {})
                member_tags = ', '.join(member_tags_dic)
            except Exception as e:
                member_tags = ''
            team_name = "Group "+str(team_id)
            values = (member,team_id,member_tags,value,team_name,event_teamset_id,member)
            cursorObject.execute(sql, values)
            dataBase.commit()

        if len(performance_list_dic[team_id]) >0:    
            entity_type = "Team"
            rating_type = "3StarRatingErrorbased"
            dist_val = sum(performance_list_dic[team_id].values())/len(performance_list_dic[team_id])
            rating_value = math.floor(dist_val)
            team_profile_values = (rating_value,event_teamset_id,team_id)
            cursorObject.execute(team_profile_sql, team_profile_values)
            dataBase.commit()

team_id_query = "SELECT member_id,team_id FROM event_teamset_members WHERE event_teamset_id =%s AND member_id=%s"% (event_teamset_id,attendie_id)
cursorObject.execute(team_id_query)
team_id_result = cursorObject.fetchall()
first_team_id = team_id_result[0]['team_id']
member_id = team_id_result[0]['member_id']
# print('Team Id')
# print(team_id_result[0]['team_id'])
first_team_query = "SELECT member_id,team_id FROM event_teamset_members WHERE event_teamset_id =%s AND team_id=%s"% (event_teamset_id,first_team_id)
cursorObject.execute(first_team_query)
first_team_result = cursorObject.fetchall()
first_member_ids = {team_id: [item['member_id'] for item in first_team_result if item['team_id'] == team_id] for team_id in set(item['team_id'] for item in first_team_result)}

print(first_member_ids)
second_team_query = "SELECT member_id,team_id FROM event_teamset_members WHERE event_teamset_id =%s AND team_id=%s"% (event_teamset_id,target_team)
cursorObject.execute(second_team_query)
second_team_result = cursorObject.fetchall()
second_member_ids = {team_id: [item['member_id'] for item in second_team_result if item['team_id'] == team_id] for team_id in set(item['team_id'] for item in second_team_result)}
print(second_member_ids)

swap_teams_dic = {**first_member_ids, **second_member_ids}
remove_from_key = None
add_to_key = int(target_team)  # Assuming this is known or dynamically determined

# Find the key to remove 'att' from
for key, members in swap_teams_dic.items():
    if attendie_id in members:
        remove_from_key = key
        break
# print('add Key')
# print(add_to_key)
# print(remove_from_key)
# Remove 'att' from the found key and add it to 'add_to_key'
if remove_from_key is not None:
    swap_teams_dic[remove_from_key].remove(attendie_id)
    swap_teams_dic[add_to_key].append(attendie_id)
# if member_id in swap_teams_dic[1]:
#     swap_teams_dic[1].remove(member_id)
#     swap_teams_dic[2].append(member_id)
# print(swap_teams_dic)
# swap_teams_dic = [first_member_ids,second_member_ids]


# swap_teams = [[1, 2, 9, 10, 23], [7, 13, 22, 3, 15]]

# print(swap_teams)
# swap_teams_dic = {1:[1, 2, 9, 10, 23],10:[7, 13, 22, 3, 15]}
swap_teams = list(swap_teams_dic.values())
performace_group_tags_member_tags(swap_teams)
# print("vinod")
# print('####################################################################################')
# print(performance_list)
# print(main_tag_list)
# print(member_wise_tag_list)

# swap_teams = [{1:[1, 2, 9, 10, 23]}, {2:[7, 13, 22, 3, 15]}]
# [[1,2],[3,4]]
