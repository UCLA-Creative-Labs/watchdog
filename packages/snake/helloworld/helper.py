import csv

def write_to_csv(context, file):
    f = open(file, 'w', newline='',encoding="utf-8")
    writer = csv.writer(f)
    for row in context:
        writer.writerow(row)
    f.close()