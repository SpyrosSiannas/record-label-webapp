import os
import csv


def get_script(filename):
    sql_path = "sql_queries" + os.path.sep + filename + ".sql"
    fd = open(sql_path, 'r')
    sql_file = fd.read()
    fd.close()
    sql_commands = sql_file.split(';')
    return sql_commands


# Reads the contents of a csv file and returns the column names
# as well as all the rows
def read_csv(path_to_file):
    filepath = "contents" + os.path.sep + path_to_file
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        headers = []
        body = []
        for row in csv_reader:
            if line_count == 0:
                headers = row
            else:
                attrs = []
                for i in range(len(row)):
                    attrs.append(row[i])
                if attrs:
                    body.append(attrs)
            line_count += 1
        return headers, body
