"""
This file contains all the functions that are being used for the grouping task
"""

# Importing the libraries
import numpy as np
import pandas as pd
import math
from tqdm import tqdm

###############################################################################################################

# Function to preprocess the data and return some important dictionaries
def preprocess_data(raw_df):
    """
    This function preprocesses the data and returns some dictionaries which will be used further
    
    Parameters:
    -----------
        raw_df : pd.DataFrame,
            The original Data Frame
    
    Returns:
    --------
        processed_dict: dict,
            dict containing all the information for the family
    """
    # Dict that contains all the data
    final_dict = {}

    # Getting all the family IDs that are already assigned
    pre_assign_grps = raw_df.loc[raw_df['A/B Placement'].notnull(), ['Family ID', 'A/B Placement']]
    # Creating a dict of assigned families
    final_dict['pre_assigned_families'] = pre_assign_grps.set_index('Family ID').sort_index().to_dict()['A/B Placement']

    # Replacing the NaN with empty string
    raw_df['A/B Placement'].fillna("", inplace=True)

    # Making a dict with count of siblings for each family
    final_dict['siblings_count'] = raw_df['Family ID'].value_counts().sort_index().to_dict()

    # Family friends dict
    final_dict['family_frnd_id'] = raw_df.set_index('Family ID').sort_index().to_dict()['Friend ID']

    # Counting the number of students in the family friend circle
    final_dict['family_frnd_sibs'] = {}
    for fmly, sibs in final_dict['siblings_count'].items():
        for famly, frnd in final_dict['family_frnd_id'].items():
            if not math.isnan(frnd):
                if famly == fmly:
                    sib_sum = final_dict['siblings_count'][famly] + final_dict['siblings_count'][int(frnd)]
                    final_dict['family_frnd_sibs'][famly] = sib_sum  
            else:
                final_dict['family_frnd_sibs'][famly] = final_dict['siblings_count'][famly]
    
    # Store the Current assigned groups 
    final_dict['family_grp_assigned'] = raw_df.set_index('Family ID').sort_index().to_dict()['A/B Placement']
    
    return final_dict, raw_df

###############################################################################################################

# Assign a temp group to all the families and Family Friends
def assign_temp_grp(family_frnd, family_frnd_sibs, family_grp_assigned):
    """
    This function finds and add a temp group to the family ID
    """
    # Temp variable
    both_assigned = []
    
    # Looping over all family ids
    for family_id in family_frnd.keys():

        # Initializing the current assignment for this family
        current_assign_grp = 'A'
        alternate_group = 'B'

        # Take the count of number of students in all family friend circle 
        # and only consider those families having count > 1
        if family_frnd_sibs[family_id] > 1:

            # Check if the family is assigned to a group : (A / B) OR it is NaN
            # If the family alreay has an assignment go to next family
            
            # Check if the family is assigned to any group or Contains NaN assignment
            if (family_grp_assigned[family_id] == current_assign_grp):
                # This means the family is already assigned to a group
                # Check if the friend family is also NaN or is assigned to any group
                if not math.isnan(family_frnd[family_id]):
                    if (family_grp_assigned[int(family_frnd[family_id])] == current_assign_grp):
                        # This means the family is assigned to a group and the friend too is assigned to a group
                        # Check if they are in the same group or not
                        if family_grp_assigned[int(family_frnd[family_id])] == family_grp_assigned[family_id]:
                            both_assigned.append(True)
                        else:
                            both_assigned.append(False)
                    else:
                        # This means the family friend is NaN
                        # Assign the same group to the friend
                        family_grp_assigned[int(family_frnd[family_id])] = family_grp_assigned[family_id]
            else:
                # This means the family is not assigned to any group. So Assign the group to the friend
                family_grp_assigned[family_id] = current_assign_grp

        # If there is only 1 sibling we can assign them alternate group 
        # and later swap the families as per the schools and grades
        else:

            # Check if the family is assigned to a group : (A / B) OR it is NaN
            # If the family alreay has an assignment go to next family
            
            # Check if the family is assigned to any group or Contains NaN assignment
            if (family_grp_assigned[family_id] == alternate_group):
                # This means the family is already assigned to a group
                # Check if the friend family is also NaN or is assigned to any group
                if not math.isnan(family_frnd[family_id]):
                    if (family_grp_assigned[int(family_frnd[family_id])] == alternate_group):
                        # This means the family is assigned to a group and the friend too is assigned to a group
                        # Check if they are in the same group or not
                        if family_grp_assigned[int(family_frnd[family_id])] == family_grp_assigned[family_id]:
                            both_assigned.append(True)
                        else:
                            both_assigned.append(False)
                    else:
                        # This means the family friend is NaN
                        # Assign the same group to the friend
                        family_grp_assigned[int(family_frnd[family_id])] = family_grp_assigned[family_id]
            else:
                # This means the family is not assigned to any group. So Assign the group to the friend
                family_grp_assigned[family_id] = alternate_group
                
    return family_grp_assigned

###############################################################################################################

# Function to Fill the temp groups in the dataframe
def fill_grps(data, family_id):
    """
    Function to fill the data in the empty groups and assign temporary groups
    """
    for key,val in data['family_grp_assigned'].items():
        if int(family_id) == int(key):
            return val

# Function to count the frequency of A and B in each group of classes
def CountFrequency(ls, check): 
    """
    Function to count the groups A and B in each class
    
    Parameters:
    -----------
        ls: list
        check: {'A' or 'B'}
    """
    # Creating an empty dictionary  
    freq = {} 
    for item in ls: 
        if (item in freq): 
            freq[item] += 1
        else: 
            freq[item] = 1
    if check in list(freq.keys()):
        if check == 'A':
            return freq[check]
        else:
            return freq[check]

###############################################################################################################

# Swapping algo:
# 1. Group by School -> Student_Grade -> A/B Placement
# 2. Get the total of individual groups i.e A and B
# 3. See if there is uneven distribution of the groups, If Yes, Swap B to A ONLY as B is a family with 1 child
# 4. Do the above till the groups are balanced

def swap_groups(data, pre_defined_groups, n_iter=10):
    """
    Function to swap the groups if the groups are imbalanced.
    
    Parameters:
    -----------
        data: DataFrame,
            The Dataframe that will contain all the data along with Temp Assigned Groups
            
        n_iter: int, Default: 10,
            Number of iteration required to optimize the groups distribution
            
        pre_defined_groups: dict,
            The dict that contains predefined family groups that is present in the data
            
    Returns:
    --------
        data
    """
    # Variables to store A count and B count
    counts_a_b = {}
    
    # Grouping the data as School -> Student_Grade -> A/B Placement
    # Grouping by each groups in a class
    class_groups_dict = data.groupby(['School', 'Student Grade'])['A/B Placement'].apply(lambda x: x.tolist()).to_dict()
    # Grouping by each family ID in a class
    class_family_id_groups_dict = data.groupby(['School', 'Student Grade'])['Family ID'].apply(lambda x: x.tolist()).to_dict()
    
    # Find the total in A and total in B
    # Find overall total in class
    # Swap from B to A if total of B is more till both become equal and vice-versa
    # Looping over all the (School, Student Grade) pair
    for key, val in class_groups_dict.items():
        # Finding the total A and B
        count_a = CountFrequency(val, 'A')
        count_b = CountFrequency(val, 'B')
        if (count_b == None):
            counts_a_b[key] = (len(val), count_a, 0)
        elif (count_a == None):
            counts_a_b[key] = (len(val), 0, count_b)
        else:
            counts_a_b[key] = (len(val), count_a, count_b)
        
    print("Please wait while the swapping occurs:")
    print("Progress: ")
    # Check if the size of Group B is greater
    for i in tqdm(range(len(class_groups_dict)*n_iter)):
        ## Iterate over all the groups
        for key, val in class_groups_dict.items():
            
            # If total of B > total of A
            if (counts_a_b[key][2] > counts_a_b[key][1]):
                # Check if the difference is more than 1
                if (counts_a_b[key][2] - counts_a_b[key][1]) > 1:
                    # Get the list of Groups and it's respective family ID
                    temp_family_id_list = class_family_id_groups_dict[key]
                    temp_groups_list = class_groups_dict[key]
                    for comb in zip(temp_groups_list, temp_family_id_list):
                        # Check if there is a predefined group for that family ID
                        if comb[1] not in list(pre_defined_groups.keys()):
                            # Replacing the group as A
                            if comb[0] == 'B':
                                data.loc[data['Family ID'] == comb[1], 'A/B Placement'] = "A"
                                break
                            
            # If total of A > total of B
            elif (counts_a_b[key][1] > counts_a_b[key][2]):
                # Check if the difference is more than 1
                if (counts_a_b[key][1] - counts_a_b[key][2]) > 1:
                    # Get the list of Groups and it's respective family ID
                    temp_family_id_list = class_family_id_groups_dict[key]
                    temp_groups_list = class_groups_dict[key]
                    for comb in zip(temp_groups_list, temp_family_id_list):
                        # Check if there is a predefined group for that family ID
                        if comb[1] not in list(pre_defined_groups.keys()):
                            # Replacing the group as B
                            if comb[0] == 'A':
                                data.loc[data['Family ID'] == comb[1], 'A/B Placement'] = "B"
                                break
        
        # # Recreating the total counts
        # Grouping by each groups in a class
        class_groups_dict = data.groupby(['School', 'Student Grade'])['A/B Placement'].apply(lambda x: x.tolist()).to_dict()
        # Grouping by each family ID in a class
        class_family_id_groups_dict = data.groupby(['School', 'Student Grade'])['Family ID'].apply(lambda x: x.tolist()).to_dict()
        for key, val in class_groups_dict.items():
            # Finding the total A and B
            count_a = CountFrequency(val, 'A')
            count_b = CountFrequency(val, 'B')
            if (count_b == None):
                counts_a_b[key] = (len(val), count_a, 0)
            elif (count_a == None):
                counts_a_b[key] = (len(val), 0, count_b)
            else:
                counts_a_b[key] = (len(val), count_a, count_b)
    
    return data

###############################################################################################################

# Function to get the final statistics
def get_results(temp_school_data):
    """
    This function performs some analysis of the final groupings and returns a DataFrame with the results

    Parameters:
    -----------
        temp_school_data: DataFrame,
            The Dataframe that contains the temporary allocated groups

    Returns:
    --------
        school_groups_final: DataFrame,
            DataFrame with all the test statistics and final results of the grouping
    """
    # Some test and analysis
    # Creating a new Dataframe to get the students groups list so as to count the number of students in group A and B
    school_groups_final = temp_school_data.groupby(['School', 'Student Grade'])['A/B Placement'].apply(lambda x: x.tolist()).reset_index(level=1)

    # Resetting index to obtain the complete data as required
    school_groups_final.reset_index(inplace=True)

    # Counting the number of groups (A and B) in each class and in each school
    school_groups_final['Count A'] = school_groups_final.apply(lambda row: CountFrequency(row['A/B Placement'], 'A'), axis=1)
    school_groups_final['Count B'] = school_groups_final.apply(lambda row: CountFrequency(row['A/B Placement'], 'B'), axis=1)

    # Adding more information like each grade strength, Families belonging to that grade and Unique families
    school_groups_final['Grade strength'] = temp_school_data.groupby(['School', 'Student Grade'])['Family ID'].apply(lambda x: len(x.tolist())).reset_index(level=1)['Family ID'].values
    school_groups_final['Unique Families'] = temp_school_data.groupby(['School', 'Student Grade'])['Family ID'].apply(lambda x: len(np.unique(x.tolist()))).reset_index(level=1)['Family ID'].values

    # Adding percentages
    school_groups_final['A % present'] = (school_groups_final['Count A']/school_groups_final['Grade strength'])*100
    school_groups_final['B % present'] = (school_groups_final['Count B']/school_groups_final['Grade strength'])*100

    school_groups_final['Family IDs'] = temp_school_data.groupby(['School', 'Student Grade'])['Family ID'].apply(lambda x: x.tolist()).reset_index(level=1)['Family ID'].values
    school_groups_final['Student IDs'] = temp_school_data.groupby(['School', 'Student Grade'])['Student ID'].apply(lambda x: x.tolist()).reset_index(level=1)['Student ID'].values

    return school_groups_final
