import gspread
import firebase_admin
from store import store_data, format_member_data, format_plead_data
from write import write_data, format_applications, format_projects
from firebase_admin import credentials, firestore

gc = gspread.service_account("auth.json")
cred = credentials.Certificate("clauth.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

member_sheet = gc.open("All Quarters").worksheets()
lead_sheet = gc.open("All PLead Apps").worksheets()

member_title = ["application_id", "applicant_name", "applicant_email", "applicant_year",
                "applicant_major", "status", "quarter", "timestamp", "first_choice",
                "second_choice", "third_choice"]
lead_title = ["project_id", "project_name", "project_description", "status", "lead_name",
            "lead_email", "lead_year", "open_spots"]

def store():
    store_data(member_sheet, db, format_member_data)
    store_data(lead_sheet, db, format_plead_data)

def write():
    member_data = db.collection("member-applications").stream()
    lead_data = db.collection("plead-applications").stream()
    write_data(member_title, member_data, format_applications, './member-applications.csv')
    write_data(lead_title, lead_data, format_projects, './plead-applications.csv')

def main():
    store()
    write()

main()