from mysql.connector import Error as sqlError
from src.fromfile import get_script, read_csv


class Controller:
    def __init__(self, db):
        self.__cnx = db.get_connection()
        self.__cursor, self.__dictcursor = db.get_cursors()
        self.__database = db

    # Accepts sql query as input and executes it
    def query(self, sql_query):
        try:
            self.__cursor.execute(sql_query)
        except sqlError as err:
            print("Something went wrong: {}".format(err))

    # Runs a query from a file
    def query_from_file(self, filename):
        commands = get_script(filename)
        print("Executing " + filename + ".sql...")
        for c in commands:
            self.query(c)
        print("Finished running script.")
        self.__cnx.commit()

    def count_rows(self, table):
        self.query("SELECT COUNT(*) FROM " + table)
        res = self.__cursor.fetchall()
        return res[0][0]

    # Takes as an argument a table, the column names, a format string (variable types) and
    # the given values and inserts it in the database
    def insert_values(self, table, params, format_string, *values):
        sql = "INSERT INTO " + table + '(' + params + ')' + " VALUES " + format_string
        vals = values
        self.__cursor.execute(sql, vals)

    # Fetches a single column from a table and returs it as an arary
    def fetch_attribute(self, attr, table):
        sql = "SELECT " + attr + " FROM " + table
        self.__cursor.execute(sql)
        myresult = self.__cursor.fetchall()
        res = []
        for i in range(len(myresult)):
            res.append(myresult[i][0])
        return res

