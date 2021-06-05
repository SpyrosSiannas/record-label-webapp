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
    def insert_values(self, table, params, values):
        for i in range(len(values)):
            values[i] = '"' + values[i] + '"'
        sql = "INSERT INTO " + table + '(' + params + ')' + " VALUES (" + ", ".join(values) + ")"
        print(sql)
        self.__cursor.execute(sql)

    # Fetches a single column from a table and returs it as an arary
    def fetch_attribute(self, attr, table):
        sql = "SELECT " + attr + " FROM " + table
        self.__cursor.execute(sql)
        myresult = self.__cursor.fetchall()
        res = []
        for i in range(len(myresult)):
            res.append(myresult[i][0])
        return res

    def load_database(self):
        print("===== LOADING ARTISTS =======")
        self.add_table_from_csv("artists.csv", "Artist")
        print("===== ARTISTS LOADED =======")
        print("===== LOADING ARTICLES =======")
        self.add_table_from_csv("articles.csv", "Article")
        print("===== ARTICLES LOADED =======")
        print("===== LOADING MERCH =======")
        self.add_table_from_csv("products.csv", "Merch")
        print("===== MERCH LOADED =======")
        print("===== LOADING EVENTS =======")
        self.add_table_from_csv("events.csv", "Event")
        print("===== EVENTS LOADED =======")

    def add_table_from_csv(self, csv_name, table_name):
        columns, body = read_csv(csv_name)
        for table_line in body:
            self.insert_values(table_name,
                               ", ".join(columns),
                               table_line)
        self.__cnx.commit()


    ## Fix later!!! (make relationships with id)
    def add_article_entity(self):
        columns, body = read_csv("articles.csv")
        for table_line in body:
            self.insert_values("Article",
                               ", ".join(columns),
                               table_line)
        self.__cnx.commit()

    def add_event(self):
        columns, body = read_csv("events.csv")
        for table_line in body:
            self.insert_values("Event",
                               ", ".join(columns),
                               table_line)
        self.__cnx.commit()

    def add_article_reference(self):
        columns, body = read_csv("references.csv")
        for table_line in body:
            self.insert_values("references",
                               ", ".join(columns),
                               table_line)
        self.__cnx.commit()

    def get_table_id_by_name(self, table):
        sql = "SELECT * FROM " + table
        self.__dictcursor.execute(sql)
        my_result = self.__dictcursor.fetchone()
        table_id = list(my_result.keys())
        return table_id[0]

    def fetch_entry_id_by_attr(self, table, attr, target):
        table_id = self.get_table_id_by_name(table)
        sql = "SELECT " + table_id + " * FROM " + table + " WHERE " + attr +'=' + str(target)
        self.query(sql)
        res = self.__cursor.fetchone()
        return res
