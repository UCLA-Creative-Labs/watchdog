import gspread
import csv

gc = gspread.service_account("auth.json")

sh = gc.open("All Quarters")
hs = gc.open("All PLead Apps")

member_list = sh.worksheets()
lead_list = hs.worksheets()

member_values = ["Accepted", "Timestamp", "Name", "Email", "Year", "Major", "First Choice:", "Second Choice:", "Third Choice:"]
lead_values = ["Description", "Project", "Accepted", "Name", "Email", "Year", "Open Spots"]
member_title = ["application_id", "applicant_name", "applicant_email", "applicant_year", "applicant_major", "application_status", "time_period", "timestamp", "project_order"]
lead_title = ["project_id", "project_name", "project_description", "project_status", "lead_name", "lead_email", "lead_year", "open_spots"]

def write_to_csv(context, file):
    f = open(file, 'w', encoding="utf-8")
    writer = csv.writer(f)
    writer.writerow(context)
    f.close()

def member():
    application_id = 0
    applications = []
    for sheet in member_list:
        list = sheet.get_all_values()
        for row in list:
            if row[0]!="Accepted" and sheet.title!="All Quarters":
                app = [application_id, row[2], row[3], row[4], row[5], row[0], sheet.title, row[1], [row[6], row[7], row[8]]]
                applications.append(app)
                application_id+=1
    applications.insert(0, member_title)
    write_to_csv(applications, './member.csv')

def lead():
    project_id = 0
    projects = []
    for sheet in lead_list:
        list = sheet.get_all_values()
        for row in list:
            if row[0]!="Project":
                app = [project_id, row[1], row[0], row[2], row[3], row[4], row[5], row[6]]
                projects.append(app)
                project_id+=1
    projects.insert(0, lead_title)
    write_to_csv(projects, './projects.csv')

def main():
    member()
    lead()

main()