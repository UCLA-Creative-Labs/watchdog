def format_data(update, row, sheet):
    if update=="member-applications":
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
    elif update=="plead-applications":
        data = {
            "project_name": row[1],
            "project_description": row[0],
            "status": row[2],
            "lead_name": row[3],
            "lead_email": row[4],
            "lead_year": row[5],
            "open_spots": row[6],
        }
    return data

def store_data(list, update, db):
    id = 0
    for sheet in list:
        vals = sheet.get_all_values()
        vals.pop(0)
        for row in vals:
            data = format_data(update, row, sheet)
            db.collection(update).document(str(id)).set(data)
            id+=1