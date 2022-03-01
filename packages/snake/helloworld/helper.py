import csv

def write_to_csv(context, file):
    f = open(file, 'w', newline='',encoding="utf-8")
    writer = csv.writer(f)
    for row in context:
        writer.writerow(row)
    f.close()

def write_line_to_csv(file, entry):
    with open(file, 'a+', newline='') as write_obj:
        csv_writer = csv.writer(write_obj)
        csv_writer.writerow(entry)

def clear_csv(file):
    edit = open(file, 'r+')
    edit.truncate(0)
    edit.close()

def sort_csv(file, list):
    f = csv.reader(open(file,'r'))
    input = []
    for row in f:
        input.append(row)
    input.sort(key = lambda x: int(x[-1]))
    input.insert(0, list)
    clear_csv(file)
    write_to_csv(input, file)
