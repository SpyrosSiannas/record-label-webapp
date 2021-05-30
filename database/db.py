import src.database as database
import src.controller as controller

ascii= '''
  .oooooo.              .o88o.  .o88o.                      .oooooo..o     .              o8o                              .o8       
 d8P'  `Y8b             888 `"  888 `"                     d8P'    `Y8   .o8              `"'                             "888       
888           .ooooo.  o888oo  o888oo   .ooooo.   .ooooo.  Y88bo.      .o888oo  .oooo.   oooo  ooo. .oo.    .ooooo.   .oooo888       
888          d88' `88b  888     888    d88' `88b d88' `88b  `"Y8888o.    888   `P  )88b  `888  `888P"Y88b  d88' `88b d88' `888       
888          888   888  888     888    888ooo888 888ooo888      `"Y88b   888    .oP"888   888   888   888  888ooo888 888   888       
`88b    ooo  888   888  888     888    888    .o 888    .o oo     .d8P   888 . d8(  888   888   888   888  888    .o 888   888       
 `Y8bood8P'  `Y8bod8P' o888o   o888o   `Y8bod8P' `Y8bod8P' 8""88888P'    "888" `Y888""8o o888o o888o o888o `Y8bod8P' `Y8bod88P"      
                                                                                                                                     
                                                                                                                                     
                                                                                                                                     
ooooooooo.                                                .o8                                                                        
`888   `Y88.                                             "888                                                                        
 888   .d88'  .ooooo.   .ooooo.   .ooooo.  oooo d8b  .oooo888   .oooo.o                                                              
 888ooo88P'  d88' `88b d88' `"Y8 d88' `88b `888""8P d88' `888  d88(  "8                                                              
 888`88b.    888ooo888 888       888   888  888     888   888  `"Y88b.                                                               
 888  `88b.  888    .o 888   .o8 888   888  888     888   888  o.  )88b                                                              
o888o  o888o `Y8bod8P' `Y8bod8P' `Y8bod8P' d888b    `Y8bod88P" 8""888P'                                                              
                                                                                                                                     
                                                                                                                                     
                                                                                                                                     
oooooooooo.   oooooooooo.                                                                                                            
`888'   `Y8b  `888'   `Y8b                                                                                                           
 888      888  888     888                                                                                                           
 888      888  888oooo888'                                                                                                           
 888      888  888    `88b                                                                                                           
 888     d88'  888    .88P                                                                                                           
o888bood8P'   o888bood8P'                                                                                                            
                                                                                                                                     
                                                                                                                                     
'''

if __name__ == "__main__":
    print(ascii)
    # Initialize database and create cursors and connection
    my_db = database.Database()
    my_db.create_connection()
    my_db.create_cursors()
    # Initialize controller
    my_ctrl = controller.Controller(my_db)

    # Print options list
    option_list='''What would you like to do?
    1. Create database
    2. Empty database
    3. Load database
    4. Reset database
    5. Print ascii art
    0. Exit
    '''

    # Main loop
    while True:
        print(option_list)
        cmd = int(input())
        try:
            if cmd == 1:
                print("===== CREATING DATABASE =======")
                my_ctrl.query_from_file("create_db")
                print("===== DATABASE CREATED ======")

            if cmd == 2:
                print("===== DROPPING DATABASE =======")
                my_ctrl.query_from_file("drop_db")
                print("===== DATABASE DROPPED ======")
            if cmd == 3:
                break
            if cmd == 4:
                print("===== RESETTING DATABASE =======")
                my_ctrl.query_from_file("drop_db")
                # load DB should go here
                my_ctrl.query_from_file("create_db")
                print("===== DATABASE RESET COMPLETE ======")
            if cmd == 5:
                print(ascii)
            if cmd == 0:
                break
        except Exception as e:
            print("Something went wrong! {}".format(e))
