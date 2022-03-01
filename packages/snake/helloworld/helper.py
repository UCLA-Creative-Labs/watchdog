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
    fileVariable = open(file, 'r+')
    fileVariable.truncate(0)
    fileVariable.close()

def sort_csv(file, list):
    inputfile = csv.reader(open(file,'r'))
    input = []
    for row in inputfile:
        input.append(row)
    input.sort(key = lambda x: int(x[0]))
    input.insert(0, list)
    clear_csv(file)
    write_to_csv(input, file)
