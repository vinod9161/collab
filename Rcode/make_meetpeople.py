import pandas as pd
import sys
import mysql.connector
import json
import math
event_teamset_id= sys.argv[1]
# url = sys.argv[1]
# df=pd.read_csv(url)

#connect to database
dataBase = mysql.connector.connect(
    host ="localhost",
    user ="collab",
    password ="C0ll@2@Br!3k",
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

# for i in range(len(preference)):
#     for j in range(i + 1, len(preference)):
#         if preference[i][1] > preference[j][1]:
#             preference[i], preference[j] = preference[j], preference[i]
# preference=preference[::-1]
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
    # question_query = "SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies LEFT JOIN answers ON attendies.id=answers.attendie_id where answers.question_id IN (%s)"
    question_query = """
    SELECT 
        attendies.id,
        attendies.first_name,
        attendies.last_name,
        answers.tags,
        answers.question_id 
    FROM 
        attendies 
    LEFT JOIN 
        answers 
    ON 
        attendies.id = answers.attendie_id 
        AND 
        answers.question_id IN ({})
    WHERE 
        attendies.event_id = %s
    """
    placeholder_string = ','.join(['%s'] * len(question))

    cursorObject.execute(question_query.format(placeholder_string), question + [event_id])
else:
    question_query = """SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies INNER JOIN answers ON attendies.id=answers.attendie_id where answers.question_id IN ({}) AND attendies.event_id=%s""".format(','.join(['%s'] * len(question)))
# question_query = """SELECT attendies.id,attendies.first_name,attendies.last_name,answers.tags,answers.question_id FROM attendies INNER JOIN answers ON attendies.id=answers.attendie_id where answers.question_id IN ({}) AND attendies.event_id=%s""".format(','.join(['%s'] * len(question)))
    cursorObject.execute(question_query, tuple(question + [event_id]))
question_result = cursorObject.fetchall()
data= pd.DataFrame(question_result)
# print(data)
# exit()
# val = (event_id,)

# cursorObject.execute(question_query,val)
# question_result = cursorObject.fetchall()
# data= pd.DataFrame(question_result)
# print(data)
# exit()
if sorted_string['groupSize'] and int(sorted_string['groupSize']) !='':
    team_size = int(sorted_string['groupSize'])
else:
    numberOfGroups = int(sorted_string['numberOfGroups'])
    team_size = math.ceil(len(attendees_result)/numberOfGroups)
# print(team_size)
# exit('pp')

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
# df.to_csv('dataset13oct5.csv',index=False)
# exit()
# print(preference)
# print(df)
try:
    for i in df.index:
        print(i)
        if type(df['User ID'][i]) !=float:
            if df['User ID'][i] not in repeated_id:
                count=1   #if this count increased it means Normal Question worked
                network_count=0
                negative_count=0
                for prefer in preference:
                    if len(df['{}'.format(prefer[0])][i]) >0:
                        if prefer[2]==5 and prefer[1] > 0:
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
                                    
                                        
                                        
#                                         print(type(j),'------------------------------------------------------------------------')
#                                         for k in first_degree_network:
#                                             f_degree_network = nx.descendants_at_distance(G, k, distance=1)
#                                             degree_sets.extend(f_degree_network)
#                                         print(degree_sets,'NNNNNNNNNNNNNNNNNNNNNNNNNNN')
                                    
                                    for j in degree_sets:
                                        network_node = network_node.append(df.loc[df['User ID'] == j])
                                    network_node = network_node[~network_node.index.duplicated(keep="first")]
                                    
                                    
                                    for item in preference:
                                        if item[2] == 9:
                                            prefer_ask = item[1]
                                        elif item[2] == 5:
                                            prefer_network = item[1]
                                    try:
                                        if prefer_ask > prefer_network:
                                            main_node = main_node.append(network_node) #THIS LINE HANDLE when ASK (High Preference with NETwork)
                                        else:
                                            main_node=network_node #This line Handle when Network (High preference) with Ask Offer
                                    except Exception as e:
                                        main_node = network_node
                                    if len(preference) ==1:
                                        main_node=network_node
                                    if count > 1:
                                        main_node = main_node.append(network_node)
                                    
                                    print('offfooooooooooooooo',main_node)
                                except Exception as e:
                                    print(e)
                                network_count = 1
                        elif prefer[2] ==5 and prefer[1] < 0:
                            if df['User ID'][i] not in repeated_id:
                                print(df['User ID'][i],'AAAAA')
                                network_node = df.loc[df['User ID'] == df['User ID'][i]]
                                degree_sets=[]
                                for j in df.index:
                                    if df["User ID"][j] not in repeated_id:
                                        
                                        if df["User ID"][j] not in degree_sets:
                                            print('TTTTTTTTT',degree_sets)
                                            try:
                                                degree_sets.extend(nx.descendants_at_distance(G, df["User ID"][j], distance=1))
                                                network_node = network_node.append(df.loc[df['User ID'] == df['User ID'][j]])
                                            except Exception as e:
                                                print('PASSed')
                                                pass
                                if len(preference) ==1:
                                    main_node=network_node
                                if count > 1:
                                    main_node = main_node.append(network_node)
                                if len(preference) > 1 and preference[0][1] < 0:
                                    main_node = network_node
                                network_count = 1
                                print(network_node,'HELLO')
                                
                        elif prefer[2] ==9 and prefer[1] > 0:
                            try:
                                print(len(main_node.index),'CHECKKK')
                                if len(main_node.index)>=0:
                                    if df['User ID'][i] not in repeated_id:
                                        temp_s1 =[df['User ID'][i]]
                                        #First if check for FULL Ask to Offer and Full Offer to Ask
                                        if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and type(df['Offer'][i]) !=float:
                                            node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                            node1=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                            s1 = pd.merge(node, node1, how='inner', on=['User ID'])
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
                                        #Second if check for Full Ask to Offer and splitted Offer to Ask
                                        if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float:
                                            node=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                            c=0
                                            c1=0
                                            for offer_word in df["Offer"][i].split(','):
                                                node1 = df[df.Ask.str.contains(offer_word,na=False)]
                                                if len(node1.index)>0:
                                                    if c1>c:
                                                        temp_node = temp_node.append(node1)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node = node1
                                                        c1 +=1
                                            temp_node = temp_node[~temp_node.index.duplicated(keep="first")]
                                            s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE222222')
                                        #Third if check for Full Offer to Ask and splitted Ask to offer
                                        if type(df['User ID'][i]) !=float and type(df['Offer'][i]) !=float:
                                            node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                            c=0
                                            c1=0
                                            for ask_word in df["Ask"][i].split(','):
                                                node1 = df[df.Offer.str.contains(ask_word,na=False)]
                                                if len(node1.index)>0:
                                                    if c1>c:
                                                        temp_node = temp_node.append(node1)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node = node1
                                                        c1 +=1
                                            temp_node = temp_node[~temp_node.index.duplicated(keep="first")]
                                            s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE33333333333333333')
                                        #Forth if check for split Offer to Ask and splitted Ask to offer    
                                        if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and type(df['Offer'][i]) !=float:
                                            if df['User ID'][i] not in repeated_id:
                                                c=0
                                                c1=0
                                                for off_word in df["Offer"][i].split(','):
                                                    node2 = df[df.Ask.str.contains(off_word,na=False)]              
                                                    if len(node2.index)>0:
                                                        if c1>c:
                                                            temp_node2 = temp_node2.append(node2)
                                                            c1 +=1
                                                            c +=1
                                                        else:
                                                            temp_node2 = node2
                                                            c1 +=1
                                                temp_node2 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                                c=0
                                                c1=0
                                                for ask_word in df["Ask"][i].split(','):
                                                    node3 = df[df.Offer.str.contains(ask_word,na=False)]
                                                    if len(node3.index)>0:
                                                        if c1>c:
                                                            temp_node3 = temp_node3.append(node3)
                                                            c1 +=1
                                                            c +=1
                                                        else:
                                                            temp_node3 = node3
                                                            c1 +=1
                                                s1 = pd.merge(temp_node2, temp_node3, how='inner', on=['User ID'])
                                                for id1 in s1.index:
                                                    temp_s1.append(s1['User ID'][id1])
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE4444444444444444')
                                                #FIFTH CASE Full OFFER with ASK
                                                single_match_node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                                for id1 in single_match_node.index:
                                                    temp_s1.append(single_match_node['User ID'][id1])
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE555555555555555555555')
                                                #SIXTH CASE FULL ASK WITH OFFER
                                                single_match_node_offer=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                                for id1 in single_match_node_offer.index:
                                                    temp_s1.append(single_match_node_offer['User ID'][id1])
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE666666666666666666666')
                                                #SEVENTH CASE SPLITTED OFFER WITH ASK
                                                c=0
                                                c1=0
                                                for off_word in df["Offer"][i].split(','):
                                                    node2 = df[df.Ask.str.contains(off_word,na=False)]              
                                                    if len(node2.index)>0:
                                                        if c1>c:
                                                            temp_node2 = temp_node2.append(node2)
                                                            c1 +=1
                                                            c +=1
                                                        else:
                                                            temp_node2 = node2
                                                            c1 +=1
                                                temp_node3 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                                for id1 in temp_node3.index:
                                                    temp_s1.append(temp_node3['User ID'][id1])
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE77777777777777777777777')
                                                #EIGHT CASE SPLITTED ASK WITH OFFER
                                                c=0
                                                c1=0
                                                for ask_word in df["Ask"][i].split(','):
                                                    node2 = df[df.Offer.str.contains(ask_word,na=False)]              
                                                    if len(node2.index)>0:
                                                        if c1>c:
                                                            temp_node2 = temp_node2.append(node2)
                                                            c1 +=1
                                                            c +=1
                                                        else:
                                                            temp_node2 = node2
                                                            c1 +=1
                                                temp_node3 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                                for id1 in temp_node3.index:
                                                    temp_s1.append(temp_node3['User ID'][id1])
                                                print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE8888888888888888888888888')
                                        fixed=[]
                                        for uid in temp_s1:
                                            if uid not in fixed:
                                                fixed.append(uid)
                                        print(fixed)
                                        for user in fixed:
                                            main_node = main_node.append(df[df['User ID'].eq(user)])
                                        print(main_node,'1000000000000000000000000000000000000000000000000000000000000000000')
                                        if network_count==1:
                                            network_node = network_node.append(main_node)
                                            main_node = network_node
                                            main_node = main_node[~main_node.index.duplicated(keep="first")]
                                            network_count +=1
                            except Exception as e:
                                print(e,'RRRRRRRRRRRRRRRRRRRRRRRRR')
                                if df['User ID'][i] not in repeated_id:
                                    temp_s1 =[df['User ID'][i]]
                                    #First if check for FULL Ask to Offer and Full Offer to Ask
                                    if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and type(df['Offer'][i]) !=float:
                                        node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                        node1=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                        s1 = pd.merge(node, node1, how='inner', on=['User ID'])
                                        for id1 in s1.index:
                                            temp_s1.append(s1['User ID'][id1])
                                        print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE1')
                                    #Second if check for Full Ask to Offer and splitted Offer to Ask
                                    if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float:
                                        node=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                        c=0
                                        c1=0
                                        for offer_word in df["Offer"][i].split(','):
                                            node1 = df[df.Ask.str.contains(offer_word,na=False)]
                                            if len(node1.index)>0:
                                                if c1>c:
                                                    temp_node = temp_node.append(node1)
                                                    c1 +=1
                                                    c +=1
                                                else:
                                                    temp_node = node1
                                                    c1 +=1
                                        temp_node = temp_node[~temp_node.index.duplicated(keep="first")]
                                        s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                        for id1 in s1.index:
                                            temp_s1.append(s1['User ID'][id1])
                                        print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE222222')
                                    #Third if check for Full Offer to Ask and splitted Ask to offer
                                    if type(df['User ID'][i]) !=float and type(df['Offer'][i]) !=float:
                                        node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                        c=0
                                        c1=0
                                        for ask_word in df["Ask"][i].split(','):
                                            node1 = df[df.Offer.str.contains(ask_word,na=False)]
                                            if len(node1.index)>0:
                                                if c1>c:
                                                    temp_node = temp_node.append(node1)
                                                    c1 +=1
                                                    c +=1
                                                else:
                                                    temp_node = node1
                                                    c1 +=1
                                        temp_node = temp_node[~temp_node.index.duplicated(keep="first")]
                                        s1 = pd.merge(node, temp_node, how='inner', on=['User ID'])
                                        for id1 in s1.index:
                                            temp_s1.append(s1['User ID'][id1])
                                        print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE33333333333333333')
                                    #Forth if check for split Offer to Ask and splitted Ask to offer    
                                    if type(df['User ID'][i]) !=float and type(df['Ask'][i]) !=float and type(df['Offer'][i]) !=float:
                                        if df['User ID'][i] not in repeated_id:
                                            c=0
                                            c1=0
                                            for off_word in df["Offer"][i].split(','):
                                                node2 = df[df.Ask.str.contains(off_word,na=False)]              
                                                if len(node2.index)>0:
                                                    if c1>c:
                                                        temp_node2 = temp_node2.append(node2)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node2 = node2
                                                        c1 +=1
                                            temp_node2 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                            c=0
                                            c1=0
                                            for ask_word in df["Ask"][i].split(','):
                                                node3 = df[df.Offer.str.contains(ask_word,na=False)]
                                                if len(node3.index)>0:
                                                    if c1>c:
                                                        temp_node3 = temp_node3.append(node3)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node3 = node3
                                                        c1 +=1
                                            s1 = pd.merge(temp_node2, temp_node3, how='inner', on=['User ID'])
                                            for id1 in s1.index:
                                                temp_s1.append(s1['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE4444444444444444')
                                            #FIFTH CASE Full OFFER with ASK
                                            single_match_node=df[df.Ask.str.contains(df["Offer"][i],na=False)]
                                            for id1 in single_match_node.index:
                                                temp_s1.append(single_match_node['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE555555555555555555555')
                                            #SIXTH CASE FULL ASK WITH OFFER
                                            single_match_node_offer=df[df.Offer.str.contains(df["Ask"][i],na=False)]
                                            for id1 in single_match_node_offer.index:
                                                temp_s1.append(single_match_node_offer['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE666666666666666666666')
                                            #SEVENTH CASE SPLITTED OFFER WITH ASK
                                            c=0
                                            c1=0
                                            for off_word in df["Offer"][i].split(','):
                                                node2 = df[df.Ask.str.contains(off_word,na=False)]              
                                                if len(node2.index)>0:
                                                    if c1>c:
                                                        temp_node2 = temp_node2.append(node2)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node2 = node2
                                                        c1 +=1
                                            temp_node3 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                            for id1 in temp_node3.index:
                                                temp_s1.append(temp_node3['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE77777777777777777777777')
                                            #EIGHT CASE SPLITTED ASK WITH OFFER
                                            c=0
                                            c1=0
                                            for ask_word in df["Ask"][i].split(','):
                                                node2 = df[df.Offer.str.contains(ask_word,na=False)]              
                                                if len(node2.index)>0:
                                                    if c1>c:
                                                        temp_node2 = temp_node2.append(node2)
                                                        c1 +=1
                                                        c +=1
                                                    else:
                                                        temp_node2 = node2
                                                        c1 +=1
                                            temp_node3 = temp_node2[~temp_node2.index.duplicated(keep="first")]
                                            for id1 in temp_node3.index:
                                                temp_s1.append(temp_node3['User ID'][id1])
                                            print(temp_s1,'TEST CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE8888888888888888888888888')
                                    fixed=[]
                                    for uid in temp_s1:
                                        if uid not in fixed:
                                            fixed.append(uid)
                                    print(fixed)
                                    main_node=pd.DataFrame(columns=list(df.columns))
                                    for user in fixed:
                                        main_node = main_node.append(df[df['User ID'].eq(user)])
                                    print(main_node,'TEST CODE 999999999999999999999999999999999999999999999999999999999999999999999999999')
                        elif prefer[2] ==9 and prefer[1] < 0:#ASK OFFER NEGATIVE CASE
                            print('GOOGLE')
                            if type(df["{}".format(prefer[0])][i]) != float or len(df["{}".format(prefer[0])][i]) > 0:
                                if network_count == 1 or count > 1:
                                    main_node = main_node
                                else:
                                    node1 = df[~df["{}".format(prefer[0])].str.contains('|'.join(df["{}".format('Offer')][i].split(',')))]
                                    main_node = df[df['User ID'].eq(df['User ID'][i])]
                                    user = []
                                    print(node1,main_node)
                                    try:
                                        for k in node1.index:
                                            chk = False
                                            for j in node1['Offer'][k].split(','):
                                                if j in main_node['Ask'][i].split(','):
                                                    chk = True
                                            if chk == False:
                                                user.append(node1['User ID'][k])
                                        for k in user:
                                            main_node = main_node.append((df[df['User ID'].eq(k)]))
                                    except Exception as e:
                                        print(e,'ERROR')
                            
                        else:
                            if prefer[1] >=0:
#                                 print(prefer[1],'#################')
                                try:
#                                     print(main_node,'YYYYYYYYYYYYYYsssssYYYYYYYYYYYYYY')
                                    if len(main_node.index)>0:
#                                         print('HELP')
                                        main_node3 = pd.DataFrame(columns=list(df.columns))
                                        node4 = negative_main_node[negative_main_node["{}".format(prefer[0])].str.contains('|'.join(negative_main_node["{}".format(prefer[0])][i].split(',')))]
                                        print('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
                                        main_node3 = main_node3.append(node4)
                                        main_node=main_node3
                                    if preference[-1][0]==prefer[0]:
                                        if len(main_node.index)<team_size:
                                            main_node = main_node.append(negative_main_node)
                                except Exception as e:
                                    print(e,'ERRRRRRRRRRRRRRRRR')
                                    if count==1:
                                        print('cHECK 1',type(df["{}".format(prefer[0])][i]))
                                        if type(df["{}".format(prefer[0])][i]) != float and len(df["{}".format(prefer[0])][i]) >0:
                                            print('cHECK 2')
                                            node=df[df["{}".format(prefer[0])].str.contains(df[prefer[0]][i],na=False)]
                                            for word in df["{}".format(prefer[0])][i].split(','):
                                                node1 = df[df["{}".format(prefer[0])].str.contains(word,na=False)]
                                                node = node.append(node1)
                                            node = node[~node.index.duplicated(keep="first")]
                                            
                                            try:
                                                if len(main_node.index)>0: # THIS if check that ki askoffer agar pehle chal gya hoga to main node me normal question ki id append ho jay agar ye if remove kar diya to ask offer normal se alag ho jayga
                                                    main_node = main_node.append(node)
                                                else:
                                                    main_node=node
                                                    temp_main_node=node
                                            except Exception as e:
                                                main_node=node
                                                temp_main_node=node
                                            print(main_node,"*************11221***************")
                                            count +=1
                                            if network_count==1:
                                                network_node = network_node.append(main_node)
                                                main_node = network_node
                                                main_node = main_node[~main_node.index.duplicated(keep="first")]
                                                network_count +=1
                                    else:
                                        print('HERE')
                                        if type(df["{}".format(prefer[0])][i]) != float and len(df["{}".format(prefer[0])][i]) >0:
                                            node=df[df["{}".format(prefer[0])].str.contains(df[prefer[0]][i],na=False)]
                                            for word in df["{}".format(prefer[0])][i].split(','):
                                                node1 = df[df["{}".format(prefer[0])].str.contains(word,na=False)]
                                                node = node.append(node1)
                                            node = node[~node.index.duplicated(keep="first")]
                                            main_node=main_node.append(node)
                                            main_node = main_node[~main_node.index.duplicated(keep="first")]
                            else:
                                try:
                                    if len(main_node.index) > 0:
                                        if negative_count == 0:
                                            if type(df["{}".format(prefer[0])][i]) != float and len(df["{}".format(prefer[0])][i]) >0:
                                                if network_count == 1 and prefer[1] < 0:
                                                    node1 = df[~df["{}".format(prefer[0])].str.contains('|'.join(df["{}".format(prefer[0])][i].split(',')))]
                                                    temp_list=[]
                                                    main_node2 = pd.DataFrame(columns=list(df.columns))
                    #                                     print(main_node2['{}'.format(prefer[0])].tolist(),'###########@@@@@@@@@@@@')
                                                    for ind in node1.index:
                                                        print(node1['{}'.format(prefer[0])][ind])
                                                        check1=False
                                                        for word in node1['{}'.format(prefer[0])][ind].split(','):
                                                            if word not in temp_list and node1['User ID'][ind] not in repeated_id:
                                                                check=False
                                                            else:
                                                                check1=True
                                                        if check1==False:
                                                            main_node2= main_node2.append(node1.loc[ind])
                                                            temp_list.extend(node1['{}'.format(prefer[0])][ind].split(','))
                                                    print(main_node2,'JARVIS3')
                                                    main_node = main_node.append(main_node2)
                                                else:
                                                    node=df.iloc[[i]]
                                                    node1 = main_node[~main_node["{}".format(prefer[0])].str.contains('|'.join(main_node["{}".format(prefer[0])][i].split(',')))]
                                                    node = node.append(node1)
                                                    main_node1=node
                                                    temp_list=[]
                                                    main_node2 = pd.DataFrame(columns=list(df.columns))
                    #                                     print(main_node2['{}'.format(prefer[0])].tolist(),'###########@@@@@@@@@@@@')
                                                    for ind in main_node1.index:
                                                        print(main_node1['{}'.format(prefer[0])][ind])
                                                        check1=False
                                                        for word in main_node1['{}'.format(prefer[0])][ind].split(','):
                                                            if word not in temp_list and main_node1['User ID'][ind] not in repeated_id:
                                                                check=False
                                                            else:
                                                                check1=True
                                                        if check1==False:
                                                            main_node2= main_node2.append(main_node1.loc[ind])
                                                            temp_list.extend(main_node1['{}'.format(prefer[0])][ind].split(','))
    #                                                 main_node=main_node.append(main_node2)
                                                    main_node=main_node2
                                                    negative_main_node=main_node2
                                                    negative_count +=1
                                                    try:
                                                        main_node=main_node.append(temp_main_node)
                                                    except Exception as e:
                                                        print(e,'EEEEEEEEEEEEEEEE')
                                        else:
                                            node=df.iloc[[i]]
                                            node1 = negative_main_node[~df["{}".format(prefer[0])].str.contains('|'.join(negative_main_node["{}".format(prefer[0])][i].split(',')))]
                                            node = node.append(node1)
                                            main_node1=node
                                            temp_list=[]
                                            main_node2 = pd.DataFrame(columns=list(df.columns))
                #                                     print(main_node2['{}'.format(prefer[0])].tolist(),'###########@@@@@@@@@@@@')
                                            for ind in main_node1.index:
                                                print(main_node1['{}'.format(prefer[0])][ind])
                                                check1=False
                                                for word in main_node1['{}'.format(prefer[0])][ind].split(','):
                                                    if word not in temp_list and main_node1['User ID'][ind] not in repeated_id:
                                                        check=False
                                                    else:
                                                        check1=True
                                                if check1==False:
                                                    main_node2= main_node2.append(main_node1.loc[ind])
                                                    temp_list.extend(main_node1['{}'.format(prefer[0])][ind].split(','))
                                            main_node=main_node2
                                            negative_main_node=main_node2
                                except Exception as e:
                                    if negative_count == 0:
#                                         print(main_node,'BYE')
                                        if type(df["{}".format(prefer[0])][i]) != float and len(df["{}".format(prefer[0])][i]) >0:
                                            node=df.iloc[[i]]
                                            node1 = df[~df["{}".format(prefer[0])].str.contains('|'.join(df["{}".format(prefer[0])][i].split(',')))]
                                            node = node.append(node1)
                                            main_node1=node
                                            temp_list=[]
                                            main_node2 = pd.DataFrame(columns=list(df.columns))
            #                                     print(main_node2['{}'.format(prefer[0])].tolist(),'###########@@@@@@@@@@@@')
                                            for ind in main_node1.index:
                                                print(main_node1['{}'.format(prefer[0])][ind],'HI')
                                                check1=False
                                                for word in main_node1['{}'.format(prefer[0])][ind].split(','):
                                                    if word not in temp_list and main_node1['User ID'][ind] not in repeated_id:
                                                        check=False
                                                    else:
                                                        check1=True
                                                if check1==False:
                                                    main_node2= main_node2.append(main_node1.loc[ind])
                                                    temp_list.extend(main_node1['{}'.format(prefer[0])][ind].split(','))
                                            main_node=main_node2
                                            negative_main_node=main_node2
                                            try:
                                                if len(preference) > 1 and preference[0][1] < 0 and preference[0][2] == 5:
                                                    list_main_node = main_node['User ID'].tolist()
                                                    check_perfect_network = []
                                                    main_node = main_node.reset_index(drop=True)
                                                    for k in main_node.index:
                                                        for k1 in main_node.loc[main_node["User ID"] == main_node['User ID'][k], preference[0][0]].values[0].split(','):
                                                            try:
                                                                if str(main_node['User ID'][k]) in main_node.loc[main_node["User ID"] == int(k1), preference[0][0]].values[0].split(','):
                                                                    check_perfect_network.append(k1)
                                                                    print('HI3',check_perfect_network)
                                                            except Exception as e:
                                                                pass
                                                    try:        
                                                        check_perfect_network.remove(str(main_node['User ID'][0]))        
                                                        print(check_perfect_network,'PPPPPPPPPPPPPPPPPPPPPP')
                                                    except Exception as e:
                                                        pass
                                                    for rem_id in check_perfect_network:
                                                        main_node = main_node[main_node['User ID'] != int(rem_id)]
                                                    negative_main_node = main_node
                                                    print(main_node,'BYE2')
                                            except Exception as e:
                                                print(e)
                                            
                                            negative_count +=1
                                    else:
                                        node=df.iloc[[i]]
                                        node1 = negative_main_node[~df["{}".format(prefer[0])].str.contains('|'.join(negative_main_node["{}".format(prefer[0])][i].split(',')))]
                                        node = node.append(node1)
                                        main_node1=node
                                        temp_list=[]
                                        main_node2 = pd.DataFrame(columns=list(df.columns))
            #                                     print(main_node2['{}'.format(prefer[0])].tolist(),'###########@@@@@@@@@@@@')
                                        for ind in main_node1.index:
                                            print(main_node1['{}'.format(prefer[0])][ind])
                                            check1=False
                                            for word in main_node1['{}'.format(prefer[0])][ind].split(','):
                                                if word not in temp_list and main_node1['User ID'][ind] not in repeated_id:
                                                    check=False
                                                else:
                                                    check1=True
                                            if check1==False:
                                                main_node2= main_node2.append(main_node1.loc[ind])
                                                temp_list.extend(main_node1['{}'.format(prefer[0])][ind].split(','))
                                        main_node=main_node2
                                        negative_main_node=main_node2
                                        
                                        
                team=[]
                print('check3')
                try:
                    main_node = main_node[~main_node.index.duplicated(keep="first")]
                    print(main_node,'CCCCCCCCCCCCCCCCCCCCCCHHH')
                except Exception as e:
                    main_node = pd.DataFrame()
                if my_teamset_preference >=0:
                    if len(main_node.index)>0:
                        temp_diff_team=None
                        temp_diff_people = []
                        for id1 in main_node.index:
                            if len(team)<team_size and main_node["User ID"][id1] not in team and main_node["User ID"][id1] not in repeated_id:
    #                                 if main_node["User ID"][id1] in people_in_same_team:
    #                                     team.extend(people_in_same_team)
    #                                     repeated_id.extend(people_in_same_team)
    #                                 if main_node["User ID"][id1] in people_in_diff_team:
    #                                     if temp_diff_team not in people_in_diff_team:
    #                                         team.append(main_node["User ID"][id1])
    #                                         repeated_id.append(main_node["User ID"][id1])
    #                                         temp_diff_team=main_node["User ID"][id1]
    #                                 if main_node["User ID"][id1] not in repeated_id and main_node["User ID"][id1] not in people_in_diff_team:
    #                                     team.append(main_node["User ID"][id1])
    #                                     repeated_id.append(main_node["User ID"][id1])

                                for people in people_in_same_team:
                                    if main_node["User ID"][id1] in people:
                                        team.extend(people)
                                        repeated_id.extend(people)

    #                                 if main_node["User ID"][id1] in people_in_diff_team and main_node["User ID"][id1] not in team:
    #                                     if temp_diff_team not in people_in_diff_team:
    #                                         team.append(main_node["User ID"][id1])
    #                                         repeated_id.append(main_node["User ID"][id1])
    #                                         temp_diff_team=main_node["User ID"][id1]

    #                                 if main_node["User ID"][id1] not in repeated_id and main_node["User ID"][id1] not in people_in_diff_team and main_node["User ID"][id1] not in team:
    #                                     team.append(main_node["User ID"][id1])
    #                                     repeated_id.append(main_node["User ID"][id1])
    #                                     if temp_diff_team in people_in_diff_team[:2]:
    #                                         people_in_diff_team = people_in_diff_team[2:]

                                for diff_people in people_in_diff_team:
                                    print('YESS',diff_people)
                                    if main_node["User ID"][id1] in diff_people and main_node["User ID"][id1] not in team:
                                        if temp_diff_team not in diff_people:
                                            print('OHHHH',main_node["User ID"][id1])
                                            team.append(main_node["User ID"][id1])
                                            repeated_id.append(main_node["User ID"][id1])
                                            temp_diff_team=main_node["User ID"][id1]
                                            temp_diff_people.extend(diff_people)
                                            break
                                print(main_node["User ID"][id1],temp_diff_people,team,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')    
                                if main_node["User ID"][id1] not in repeated_id and main_node["User ID"][id1] not in temp_diff_people and main_node["User ID"][id1] not in team:
                                    print(main_node["User ID"][id1],temp_diff_people,'SSSSSSSSSSSSSSSSSSSSSSSSSS')
                                    team.append(main_node["User ID"][id1])
                                    repeated_id.append(main_node["User ID"][id1])
    #                                     if temp_diff_team in people_in_diff_team[:2]:
    #                                         people_in_diff_team = people_in_diff_team[2:]


                        if len(team)==team_size and team not in teams:
                            teams.append(team)
                            tag_dic = {}
                            try:
                                for tm in team[:1]:
                                    for prefer in preference:
        #                                 print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'^^^^^^^^^^^^^^^^^^^^^')
                                        if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                            if prefer[2] == 9:
                                                for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    for ind in range(team_size-1):
                                                        if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                            if tm not in tag_dic.keys():
                                                                tag_dic[tm] = word +','
                                                            else:
                                                                if word not in tag_dic[tm]:
                                                                    tag_dic[tm] += word + ','
                                            elif prefer[2] == 5:
                                                for t,ind in zip(team[1:],range(len(team[1:]))):
                                                    for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                        print(t,'=====',check)
                                                        if t == int(check):
                                                            print('YYY')
                                                            if tm not in tag_dic.keys():
        #                                                         tag_dic[tm] = str(t) +','
                                                                tag_dic[tm] = df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                                            else:
                                                                if df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] not in tag_dic[tm]:
        #                                                             tag_dic[tm] += str(t) + ','
                                                                    tag_dic[tm] += df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                for tm,ind in zip(team[1:],range(len(team[1:]))):
                                    for prefer in preference:
                                        if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                            if prefer[2] ==9:
                                                for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    print('yes')
        #                                             print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'((((((((()))))))))')
                                                    if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]: #THIS CODE NEED TO BE UPDATE 26th MARCH
                                                        if tm not in tag_dic.keys():
                                                            tag_dic[tm] = word +','
                                                        else:
                                                            if word not in tag_dic[tm] and word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                                tag_dic[tm] += word + ','
                                            elif prefer[2] == 5:
                                                for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    if tm == int(check):
                                                        if tm not in tag_dic.keys():
        #                                                     tag_dic[tm] = str(tm) +','
                                                            tag_dic[tm] = df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                                        else:
                                                            if str(tm) not in tag_dic[tm]:
        #                                                         tag_dic[tm] += str(tm) + ','
                                                                tag_dic[tm] += df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','

                                tags.append(tag_dic)
                            except Exception as e:
                                print('TAG ERROR 1')
                        else:
                            if len(team)>1 and len(team) < team_size:
                                teams.append(team)
                                tag_dic = {}
                                try:
                                    for tm in team[:1]:
                                        for prefer in preference:
        #                                     print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'^^^^^^^^^^^^^^^^^^^^^')
                                            if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                                if prefer[2] == 9:
                                                    for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                        for ind in range(len(team)-1):
                                                            if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                                if tm not in tag_dic.keys():
                                                                    tag_dic[tm] = word +','
                                                                else:
                                                                    if word not in tag_dic[tm]:
                                                                        tag_dic[tm] += word + ','
                                                elif prefer[2] == 5:
                                                    for t,ind in zip(team[1:],range(len(team[1:]))):
                                                        for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                            print(t,'=====',check)
                                                            if t == int(check):
                                                                print('YYY')
                                                                if tm not in tag_dic.keys():
            #                                                         tag_dic[tm] = str(t) +','
                                                                    tag_dic[tm] = df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                                                else:
                                                                    if df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] not in tag_dic[tm]:
            #                                                             tag_dic[tm] += str(t) + ','
                                                                        tag_dic[tm] += df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                    for tm,ind in zip(team[1:],range(len(team[1:]))):
                                        for prefer in preference:
                                            if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                                if prefer[2] ==9:
                                                    for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                        print('yes')
            #                                             print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'((((((((()))))))))')
                                                        if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:#THIS CODE NEED TO BE UPDATE 26th MARCH
                                                            if tm not in tag_dic.keys():
                                                                tag_dic[tm] = word +','
                                                            else:
                                                                if word not in tag_dic[tm] and word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                                    tag_dic[tm] += word + ','
                                                elif prefer[2] == 5:
                                                    for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                        if tm == int(check):
                                                            if tm not in tag_dic.keys():
            #                                                     tag_dic[tm] = str(tm) +','
                                                                tag_dic[tm] = df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                                            else:
                                                                if str(tm) not in tag_dic[tm]:
            #                                                         tag_dic[tm] += str(tm) + ','
                                                                    tag_dic[tm] += df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                    tags.append(tag_dic)
                                except Exception as e:
                                    print('TAG ERROR')
                            else:
                                for rem in team:
                                    if rem in repeated_id:
                                        repeated_id.remove(rem)

                else:
                    if len(main_node.index)>0:
                        temp_diff_team=None
                        temp_diff_people=[]
                        for team_id1 in my_first_teamset_list2:
                            if len(team)<team_size and team_id1 not in team and team_id1 not in repeated_id and team_id1 in main_node["User ID"].tolist():
                                for people in people_in_same_team:
                                    if team_id1 in people:
                                        team.extend(people)
                                        repeated_id.extend(people_in_same_team)

    #                                 if team_id1 in people_in_diff_team:
    #                                     if temp_diff_team not in people_in_diff_team:
    #                                         team.append(team_id1)
    #                                         repeated_id.append(team_id1)
    #                                         temp_diff_team=team_id1
    #                                 if team_id1 not in repeated_id and team_id1 not in people_in_diff_team:
    #                                     team.append(team_id1)
    #                                     repeated_id.append(team_id1)
    #                                     if temp_diff_team in people_in_diff_team[:2]:
    #                                         people_in_diff_team = people_in_diff_team[2:]
                                for diff_people in people_in_diff_team:
                                    if team_id1 in diff_people and team_id1 not in team:
                                        if temp_diff_team not in diff_people:
                                            team.append(team_id1)
                                            repeated_id.append(team_id1)
                                            temp_diff_team=team_id1
                                            temp_diff_people.extend(diff_people)
                                            break
                                if team_id1 not in repeated_id and team_id1 not in temp_diff_people:
                                    team.append(team_id1)
                                    repeated_id.append(team_id1)


                        if len(team)==team_size and team not in teams:
                            teams.append(team)
                            tag_dic = {}
                            for tm in team[:1]:
                                for prefer in preference:
    #                                 print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'^^^^^^^^^^^^^^^^^^^^^')
                                    if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                        if prefer[2] == 9:
                                            for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                for ind in range(team_size-1):
                                                    if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                        if tm not in tag_dic.keys():
                                                            tag_dic[tm] = word +','
                                                        else:
                                                            if word not in tag_dic[tm]:
                                                                tag_dic[tm] += word + ','
                                        elif prefer[2] == 5:
                                            for t,ind in zip(team[1:],range(len(team[1:]))):
                                                for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    print(t,'=====',check)
                                                    if t == int(check):
                                                        print('YYY')
                                                        if tm not in tag_dic.keys():
    #                                                         tag_dic[tm] = str(t) +','
                                                            tag_dic[tm] = df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                                        else:
                                                            if df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] not in tag_dic[tm]:
    #                                                             tag_dic[tm] += str(t) + ','
                                                                tag_dic[tm] += df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                            for tm,ind in zip(team[1:],range(len(team[1:]))):
                                for prefer in preference:
                                    if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                        if prefer[2] ==9:
                                            for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                print('yes')
    #                                             print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'((((((((()))))))))')
                                                if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]: #THIS CODE NEED TO BE UPDATE 26th MARCH
                                                    if tm not in tag_dic.keys():
                                                        tag_dic[tm] = word +','
                                                    else:
                                                        if word not in tag_dic[tm] and word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                            tag_dic[tm] += word + ','
                                        elif prefer[2] == 5:
                                            for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                if tm == int(check):
                                                    if tm not in tag_dic.keys():
    #                                                     tag_dic[tm] = str(tm) +','
                                                        tag_dic[tm] = df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                                    else:
                                                        if str(tm) not in tag_dic[tm]:
    #                                                         tag_dic[tm] += str(tm) + ','
                                                            tag_dic[tm] += df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','

                            tags.append(tag_dic)
                        else:
                            if len(team)>1:
                                teams.append(team)
                                tag_dic = {}
                                for tm in team[:1]:
                                    for prefer in preference:
    #                                     print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'^^^^^^^^^^^^^^^^^^^^^')
                                        if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                            if prefer[2] == 9:
                                                for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    for ind in range(len(team)-1):
                                                        if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                            if tm not in tag_dic.keys():
                                                                tag_dic[tm] = word +','
                                                            else:
                                                                if word not in tag_dic[tm]:
                                                                    tag_dic[tm] += word + ','
                                            elif prefer[2] == 5:
                                                for t,ind in zip(team[1:],range(len(team[1:]))):
                                                    for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                        print(t,'=====',check)
                                                        if t == int(check):
                                                            print('YYY')
                                                            if tm not in tag_dic.keys():
        #                                                         tag_dic[tm] = str(t) +','
                                                                tag_dic[tm] = df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                                            else:
                                                                if df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] not in tag_dic[tm]:
        #                                                             tag_dic[tm] += str(t) + ','
                                                                    tag_dic[tm] += df['First Name'][df[df["User ID"] == t].index[0]] +' '+df["Last Name"][df[df["User ID"] == t].index[0]] +','
                                for tm,ind in zip(team[1:],range(len(team[1:]))):
                                    for prefer in preference:
                                        if len(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]]) >0:
                                            if prefer[2] ==9:
                                                for word in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    print('yes')
        #                                             print(df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]],'((((((((()))))))))')
                                                    if word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:#THIS CODE NEED TO BE UPDATE 26th MARCH
                                                        if tm not in tag_dic.keys():
                                                            tag_dic[tm] = word +','
                                                        else:
                                                            if word not in tag_dic[tm] and word in df['{}'.format(prefer[0])][df[df["User ID"] == team[ind+1]].index[0]]:
                                                                tag_dic[tm] += word + ','
                                            elif prefer[2] == 5:
                                                for check in df['{}'.format(prefer[0])][df[df["User ID"] == team[0]].index[0]].split(','):
                                                    if tm == int(check):
                                                        if tm not in tag_dic.keys():
        #                                                     tag_dic[tm] = str(tm) +','
                                                            tag_dic[tm] = df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                                        else:
                                                            if str(tm) not in tag_dic[tm]:
        #                                                         tag_dic[tm] += str(tm) + ','
                                                                tag_dic[tm] += df['First Name'][df[df["User ID"] == team[ind+1]].index[0]] +' '+df["Last Name"][df[df["User ID"] == team[ind+1]].index[0]] +','
                                tags.append(tag_dic)
                            else:
                                for rem in team:
                                    if rem in repeated_id:
                                        repeated_id.remove(rem)
    #             main_node = main_node.drop(main_node.index)
            main_node = None
except Exception as e:
    print(e,"**************hiii**************************")

small_team=[]                    
small_team_tag=[]                    

for k in df.index:
    if df["User ID"][k] not in repeated_id:
        small_team.append(df["User ID"][k])
        small_team_tag.append(df["User ID"][k])
        repeated_id.append(df["User ID"][k])
teams.append(small_team)
teams1=[]
team1 = []
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
#                             for rem in temp:
#                                 print(rem,'#####')
#                                 try:
#                                     small_team.remove(rem)
#                                 except Exception as e:
#                                     continue   
                            if len(team1)==team_size:
                                teams1.append(team1)
                                team1=[]
    #                             for rem in temp:
    #                                 small_team.remove(rem)
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
print(team1)
if len(team1)>1:
    teams1.append(team1)
else:
    if len(teams1)>1:
        teams1[-1].extend(team1)
    

# CODE FOR SORTING OF TAGS
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
sql = "INSERT INTO event_teamset_members (event_teamset_id, member_id,team_id,team_name,tags) VALUES (%s, %s,%s,%s,%s)"
for p in range(len(teams1)):
    for q in range(len(teams1[p])):
        team_ids = p+1
        team_name = "Group "+str(team_ids)
        try:
            matchTags = tags1[p][teams1[p][q]]
        except Exception as e:
            matchTags = ''
        values = (event_teamset_id, int(teams1[p][q]),p+1,team_name,matchTags)
        cursorObject.execute(sql, values)
        dataBase.commit()
exit()
