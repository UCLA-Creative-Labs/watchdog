import gspread
import csv
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("clauth.json")
firebase_admin.initialize_app(cred)
gc = gspread.service_account("auth.json")
db = firestore.client()

members = gc.open("All Quarters")
leads = gc.open("All PLead Apps")

member_list = members.worksheets()
lead_list = leads.worksheets()

member_title = ["application_id", "applicant_name", "applicant_email", "applicant_year",
                "applicant_major", "status", "quarter", "timestamp", "first_choice",
                "second_choice", "third_choice"]
lead_title = ["project_id", "project_name", "project_description", "status", "lead_name",
            "lead_email", "lead_year", "open_spots"]

def store_data(list, update):
    id = 0
    for sheet in list:
        vals = sheet.get_all_values()
        for row in vals:
            if update=="member-applications":
                if row[0]!="Accepted" and sheet.title!="All Quarters":
                    data = {
                        "applicant_name": row[2],
                        "applicant_email": row[3],
                        "applicant_year": row[4],
                        "applicant_major": row[5],
                        "status": row[0],
                        "quarter": sheet.title,
                        "timestamp": row[1],
                        "first_choice": row[6],
                        "second_choice": row[7],
                        "third_choice": row[8],
                    }
                    db.collection(update).document(str(id)).set(data)
            elif update=="plead-applications":
                if row[0]!="Description":
                    data = {
                        "project_name": row[1],
                        "project_description": row[0],
                        "status": row[2],
                        "lead_name": row[3],
                        "lead_email": row[4],
                        "lead_year": row[5],
                        "open_spots": row[6],
                    }
                    db.collection(update).document(str(id)).set(data)
            id+=1

def write_to_csv(context, file):
    f = open(file, 'w', newline='',encoding="utf-8")
    writer = csv.writer(f)
    for row in context:
        writer.writerow(row)
    f.close()

def pull_data(list, update):
    docs = db.collection(update+'-applications').stream()
    input = []
    for doc in docs:
        ref = doc.to_dict()
        if update=="member":
            app = [int(doc.id), ref['applicant_name'], ref['applicant_email'], ref['applicant_year'],
                ref['applicant_major'], ref['status'], ref['timestamp'],
                ref['first_choice'], ref['second_choice'], ref['third_choice']]
            input.append(app)
        elif update=="plead":
            app = [int(doc.id), ref['project_name'], ref['project_description'], ref['status'],
                ref['lead_name'], ref['lead_email'], ref['lead_year'], ref['open_spots']]
            input.append(app)
    input.sort(key = lambda x: x[0])
    input.insert(0, list)
    write_to_csv(input, './'+update+'.csv')

def main():
    store_data(member_list, "member-applications")
    store_data(lead_list, "plead-applications")
    pull_data(member_title, "member")
    pull_data(lead_title, "plead")

main()