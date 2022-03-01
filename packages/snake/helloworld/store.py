def format_member_data(row, sheet, db, id):
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
      "id": id,
    }
    key = row[3]+'_'+sheet.title
    if not key:
      db.collection("member-applications").document(key).set(data)
      return data
 
def format_plead_data(row, sheet, db, id):
    data = {
      "project_name": row[1],
      "project_description": row[0],
      "status": row[2],
      "quarter": sheet.title,
      "lead_name": row[3],
      "lead_email": row[4],
      "lead_year": row[5],
      "open_spots": row[6],
      "id": id,
    }
    key = row[3]+sheet.title
    if not key:
      db.collection("plead-applications").document(key).set(data)
      return data

def store_data(list, db, format_func):
    id = 1
    for sheet in list:
        vals = sheet.get_all_values()
        vals.pop(0)
        for row in vals:
            format_func(row, sheet, db, id)
            id+=1