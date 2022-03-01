from helper import write_line_to_csv, sort_csv

def format_applications(doc, ref):
    data = [int(doc.id), ref['applicant_name'], ref['applicant_email'], ref['applicant_year'],
            ref['applicant_major'], ref['status'], ref['timestamp'],
            ref['first_choice'], ref['second_choice'], ref['third_choice']]
    write_line_to_csv('./member-applications.csv', data)

def format_projects(doc, ref):
    data = [int(doc.id), ref['project_name'], ref['project_description'], ref['status'],
            ref['lead_name'], ref['lead_email'], ref['lead_year'], ref['open_spots']]
    write_line_to_csv('./plead-applications.csv', data)

def write_data(list, docs, format_func, file):
    for doc in docs:
        ref = doc.to_dict()
        format_func(doc, ref)
    sort_csv(file, list)