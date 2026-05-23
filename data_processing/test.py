import pandas as pd

file_path = r"C:\Users\Acer\OneDrive\Desktop\Bluestock internship\all-india-village-api\data_processing\raw_data\Rdir_2011_11_SIKKIM.xls"

df = pd.read_excel(file_path)

print("\n FIRST 5 ROWS:\n")
print(df.head())

print("\n COLUMN NAMES:\n")
print(df.columns)

print("\n DATA INFO:\n")
print(df.info())