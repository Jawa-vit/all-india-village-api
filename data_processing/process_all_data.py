import pandas as pd
import glob

# Folder containing all Excel files
folder_path = r"C:\Users\Acer\OneDrive\Desktop\Bluestock internship\all-india-village-api\data_processing\raw_data\*.xls"

# Get all Excel files
files = glob.glob(folder_path)

print(f"\nTotal Files Found: {len(files)}")

# Empty lists
all_states = []
all_districts = []
all_subdistricts = []
all_villages = []

# =========================
# PROCESS EACH FILE
# =========================

for file in files:

    try:

        print(f"\nProcessing File: {file}")

        # Read Excel
        df = pd.read_excel(file)

        # Clean column names
        df.columns = df.columns.str.strip()

        print("Columns Found:")
        print(df.columns)

        # =========================
        # CHECK REQUIRED COLUMNS
        # =========================

        required_columns = [
            "MDDS STC",
            "STATE NAME",
            "MDDS DTC",
            "DISTRICT NAME",
            "MDDS Sub_DT",
            "SUB-DISTRICT NAME",
            "MDDS PLCN",
            "Area Name"
        ]

        missing_columns = [
            col for col in required_columns
            if col not in df.columns
        ]

        if missing_columns:
            print(f"Skipping file due to missing columns: {missing_columns}")
            continue

        # =========================
        # STATES
        # =========================

        states_df = df[[
            "MDDS STC",
            "STATE NAME"
        ]].drop_duplicates()

        states_df.columns = [
            "state_code",
            "state_name"
        ]

        all_states.append(states_df)

        # =========================
        # DISTRICTS
        # =========================

        districts_df = df[[
            "MDDS DTC",
            "DISTRICT NAME",
            "MDDS STC"
        ]].drop_duplicates()

        districts_df.columns = [
            "district_code",
            "district_name",
            "state_code"
        ]

        all_districts.append(districts_df)

        # =========================
        # SUBDISTRICTS
        # =========================

        subdistricts_df = df[[
            "MDDS Sub_DT",
            "SUB-DISTRICT NAME",
            "MDDS DTC"
        ]].drop_duplicates()

        subdistricts_df.columns = [
            "subdistrict_code",
            "subdistrict_name",
            "district_code"
        ]

        all_subdistricts.append(subdistricts_df)

        # =========================
        # VILLAGES
        # =========================

        villages_df = df[[
            "MDDS PLCN",
            "Area Name",
            "MDDS Sub_DT"
        ]].drop_duplicates()

        villages_df.columns = [
            "village_code",
            "village_name",
            "subdistrict_code"
        ]

        all_villages.append(villages_df)

    except Exception as e:

        print(f"\nError processing file: {file}")
        print(e)

# =========================
# COMBINE ALL DATA
# =========================

final_states = pd.concat(all_states).drop_duplicates()

final_districts = pd.concat(all_districts).drop_duplicates()

final_subdistricts = pd.concat(all_subdistricts).drop_duplicates()

final_villages = pd.concat(all_villages).drop_duplicates()

# =========================
# SAVE CLEANED FILES
# =========================

final_states.to_csv("cleaned_states.csv", index=False)

final_districts.to_csv("cleaned_districts.csv", index=False)

final_subdistricts.to_csv("cleaned_subdistricts.csv", index=False)

final_villages.to_csv("cleaned_villages.csv", index=False)

print("\nALL FILES PROCESSED SUCCESSFULLY")

print(f"\nTotal States: {len(final_states)}")
print(f"Total Districts: {len(final_districts)}")
print(f"Total SubDistricts: {len(final_subdistricts)}")
print(f"Total Villages: {len(final_villages)}")