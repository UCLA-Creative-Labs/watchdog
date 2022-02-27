import gspread
import firebase_admin
from store import store_data
from write import write_data
from firebase_admin import credentials, firestore

gc = gspread.service_account("auth.json")
cred = credentials.Certificate("clauth.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

members = gc.open("All Quarters").worksheets()
leads = gc.open("All PLead Apps").worksheets()
member_title = ["application_id", "applicant_name", "applicant_email", "applicant_year",
                "applicant_major", "status", "quarter", "timestamp", "first_choice",
                "second_choice", "third_choice"]
lead_title = ["project_id", "project_name", "project_description", "status", "lead_name",
            "lead_email", "lead_year", "open_spots"]

def main():
    store_data(members, "member-applications", db)
    store_data(leads, "plead-applications", db)
    write_data(member_title, "member-applications", db)
    write_data(lead_title, "plead-applications", db)

main()