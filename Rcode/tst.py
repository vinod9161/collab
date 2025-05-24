try:
    import sys
    print('sys installed')
except Exception as e:
    print(e.__repr__())
print("Python "+sys.version)
try:
    import pandas as pd
    print('pandas installed')
except Exception as e:
    print(e.__repr__())

try:
    from tqdm import tqdm
    print('tqdm installed')
except Exception as e:
    print(e.__repr__())
try:
    from utility_func import preprocess_data, assign_temp_grp, fill_grps, swap_groups, get_results
    print('tqdmwww installed')
except Exception as e:
    print(e.__repr__())
try:
    import xlrd
    print('xlrd installed')
except Exception as e:
    print(e.__repr__())