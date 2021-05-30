import os


def get_script(filename):
    sql_path = "sql_queries" + os.path.sep + filename + ".sql"
    fd = open(sql_path, 'r')
    sql_file = fd.read()
    fd.close()
    sql_commands = sql_file.split(';')
    return sql_commands
