from helper import write_to_csv

def func(update, doc, ref):
    if update=="member-applications":
        app = [int(doc.id), ref['applicant_name'], ref['applicant_email'], ref['applicant_year'],
            ref['applicant_major'], ref['status'], ref['timestamp'],
            ref['first_choice'], ref['second_choice'], ref['third_choice']]
    elif update=="plead-applications":
        app = [int(doc.id), ref['project_name'], ref['project_description'], ref['status'],
            ref['lead_name'], ref['lead_email'], ref['lead_year'], ref['open_spots']]
    return app

def write_data(list, update, db):
    docs = db.collection(update).stream()
    input = []
    for doc in docs:
        ref = doc.to_dict()
        app = func(update, doc, ref)
        input.append(app)
    input.sort(key = lambda x: x[0])
    input.insert(0, list)
    write_to_csv(input, './'+update+'.csv')