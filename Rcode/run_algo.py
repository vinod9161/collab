#!/usr/bin/python
"""
This is the entrypoint file which runs the algo and produces the results
"""
# Importing the libraries
import pandas as pd
import math
import sys
from tqdm import tqdm
from utility_func import preprocess_data, assign_temp_grp, fill_grps, swap_groups, get_results
# NOTE:
# 1. Change the path of the excel file accordingly
# 2. Change the iterations 
input_path = '/var/www/vhosts/collaboration/development-brickwin-ui/webroot/'+sys.argv[1]
output_path = '/var/www/vhosts/collaboration/development-brickwin-ui/webroot/uploads/excels/'
n_iter = 10

###############################################################################################################
# Loading the data
school_data = pd.read_excel(input_path)

# Creating a family_dict to store all the necessary details
family_dict, temp_school_data = preprocess_data(school_data)

# Assigning a temp grp to a family
family_dict['family_grp_assigned'] = assign_temp_grp(family_frnd=family_dict['family_frnd_id'], 
                                                     family_frnd_sibs=family_dict['family_frnd_sibs'], 
                                                     family_grp_assigned=family_dict['family_grp_assigned'])

# Populating the temp data in the dataframe
temp_school_data['A/B Placement'] = temp_school_data.apply(lambda row: fill_grps(family_dict, row['Family ID']), axis=1)

# Swapping the groups A and B where necessary
temp_school_data = swap_groups(data=temp_school_data, 
                               pre_defined_groups=family_dict['pre_assigned_families'], 
                               n_iter=n_iter)

# Getting the final results
school_groups_final = get_results(temp_school_data)

###############################################################################################################

# Saving the data as a csv file
school_groups_final.to_csv(output_path + "Final_output.csv")
# print(school_groups_final)
# exit()

# Saving the file used
temp_school_data.to_csv(output_path + "Original_sheet_with_groups.csv")

print('*****DONE*****')