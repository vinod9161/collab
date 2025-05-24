# try:
#     import pke
#     print("module 'pke' is installed")
# except ModuleNotFoundError:
#     print("module 'pke' is not installed")
# try:
#     import sklearn
#     print("module 'sklearn' is installed")
# except ModuleNotFoundError:
#     print("module 'sklearn' is not installed")
# try:
#     import pandas
#     print("module 'pandas' is installed")
# except ModuleNotFoundError:
#     print("module 'pandas' is not installed")
# try:
#     import sys
#     print("module 'sys' is installed")
# except ModuleNotFoundError:
#     print("module 'sys' is not installed")
# exit()

import pandas as pd
import sys
url = sys.argv[1]
team_size=int(sys.argv[2])
data = pd.read_csv(url)

final_team = []
perfect_team = []
single_Perfect_team = []
partial_team = []
single_partial_team = []
final_match_team = []
selected_member = []
single_member = []
# df_s = data[0:]
# df_s.set_index('First Name', inplace=True)

# df_s = df_s.drop(data["First Name"][2])

dic = {'perfect_team': [], 'partial_team': [], 'single_Perfect_team': [], 'single_partial_team': []}

v=0
for i in data.index:
    # if data["First Name"][i] not in selected_member:
    match_team = []
    # print(len(data["Offer22"].tolist()))
    # print(data.head())
    # print(list(data.columns))
    # exit()
    column = list(data.columns)
    if "Ask" in column:
        for j in range(len(data["Offer"].tolist())):
            if data["Ask"][i] == data["Offer"][j]:  # 1st condition : iterate each offer with single row of ASK(basedon index) and 2nd condition :iterate each Ask with single row of OFFER(based on index).
                if data["First Name"][j] not in match_team and len(match_team) < team_size:
                    if data["First Name"][i] not in selected_member:
                        match_team.insert(j, data["First Name"][i])
                        selected_member.append(data["First Name"][i])
                    if data["First Name"][j] not in selected_member:
                        match_team.insert(j, data["First Name"][j])
                        selected_member.append(data["First Name"][j])
                # if len(match_team) < team_size:
                #     for l in range(len(data["Offer"].tolist())):
                #         if data["Ask"][j] == data["Offer"][l]:
                #             if data["First Name"][l] not in match_team and len(match_team) < team_size:
                #                 if data["First Name"][l] not in selected_member:
                #                     match_team.insert(j, data["First Name"][l])
                #                     selected_member.append(data["First Name"][l])
        if len(match_team) < team_size:
            for k in range(len(data["Ask"].tolist())):
                if data["Offer"][i] == data["Ask"][k]:
                    if data["First Name"][k] not in match_team and len(match_team) < team_size:
                        if data["First Name"][k] not in selected_member:
                            match_team.insert(j, data["First Name"][k])
                            selected_member.append(data["First Name"][k])
                    if len(match_team) < team_size:
                        for m in range(len(data["Ask"].tolist())):
                            if data["Offer"][k] == data["Ask"][m]:
                                if data["First Name"][m] not in match_team and len(match_team) < team_size:
                                    if data["First Name"][m] not in selected_member:
                                        match_team.insert(j, data["First Name"][m])
                                        selected_member.append(data["First Name"][m])
        if len(match_team) < team_size:
            if type(data["Ask"][i]) == float:
                li = []
            else:
                li = data["Ask"][i].split(",")
            match_team2=''
            match_team3=[]
            for ask in range(len(li)):
                for n in range(len(data["Offer"].tolist())):
                    li2 = data["Ask"][n].split(",")
                    li3 = data["Ask"][i].split(",")
                    for check in data["Offer"][n].split(','):
                        if li[ask] == check and li[ask] not in li2 and len(match_team) < team_size:
                            for check1 in data["Ask"][n].split(','):
                                if check1 in li:
                                    match_team2="vinod"
                            if match_team2=='':
                                if data["First Name"][i] not in selected_member:
                                    match_team.insert(n, data["First Name"][i])
                                    selected_member.append(data["First Name"][i])
                                if data["First Name"][n] not in selected_member:
                                    match_team.insert(n, data["First Name"][n])
                                    selected_member.append(data["First Name"][n])
        if len(match_team) < team_size:
            if type(data["Offer"][i]) == float:
                li1 = []
            else:
                li1 = data["Offer"][i].split(",")
            for ask1 in range(len(li1)):
                for m in range(len(data["Ask"].tolist())):
                    li4 = data["Offer"][m].split(",")
                    li5 = data["Offer"][i].split(",")
                    for check2 in data["Ask"][m].split(','):
                        if li1[ask1] == check2 and li1[ask1] not in li4 and len(match_team) < team_size:
                            if data["First Name"][i] not in selected_member:
                                match_team.insert(n, data["First Name"][i])
                                selected_member.append(data["First Name"][i])
                            if data["First Name"][m] not in selected_member:
                                match_team.insert(n, data["First Name"][m])
                                selected_member.append(data["First Name"][m])

        if match_team:
            final_match_team.append(match_team)
    else:
        questions = column[2:]
        for qst in questions:
            if len(match_team) < team_size:
                for j in range(len(data[qst].tolist())):
                    if data[qst][i] == data[qst][j]:  # 1st condition : iterate each offer with single row of ASK(basedon index) and 2nd condition :iterate each Ask with single row of OFFER(based on index).
                        if data["First Name"][j] not in match_team and len(match_team) < team_size:
                            if data["First Name"][i] not in selected_member:
                                match_team.insert(j, data["First Name"][i])
                                selected_member.append(data["First Name"][i])
                            if data["First Name"][j] not in selected_member:
                                match_team.insert(j, data["First Name"][j])
                                selected_member.append(data["First Name"][j])
        if match_team:
            final_match_team.append(match_team)
    v=v+1
# print(final_match_team)
# print(selected_member)
# exit()
for final in final_match_team:
    if len(final) == team_size:
        perfect_team.append(final)
    else:
        if len(final) == 1:
            single_member.append(final)
        else:        
            partial_team.append(final)
# print(perfect_team)
# print(single_member)
# print(partial_team)
# exit()
for partial in partial_team:
    if len(partial) < team_size:
        for single in single_member:
            if len(partial) < team_size:
                partial.append(single[0])
                single_member.remove(single)
    if len(partial) == team_size:
        perfect_team.append(partial)
        partial_team.remove(partial)
# print(perfect_team)
# print(single_member)
# print(partial_team)
# exit()
partial_team_member =[]
for pa in partial_team:
    if len(pa) > 1:
        for pa2 in pa:
            partial_team_member.append(pa2)
    else:
        partial_team_member.append(pa[0])
for pa in single_member:
    if len(pa) > 1:
        for pa2 in pa:
            partial_team_member.append(pa2)
    else:
        partial_team_member.append(pa[0])

if len(partial_team_member) == team_size:
    perfect_team.append(partial_team_member)
else:
    end = len(partial_team_member)
    for i in range(0, end, team_size):
        x = i
        if len(partial_team_member[x:x+team_size])==1:
            perfect_team[len(perfect_team)-1].append(partial_team_member[x])
        else:
            perfect_team.append(partial_team_member[x:x+team_size])
print(perfect_team)
# print(selected_member)
exit()
print(final_match_team)
exit()