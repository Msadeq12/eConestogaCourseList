import { Injectable } from '@angular/core';



declare function openDatabase(dbName, version, name, size, successCreate): any;
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: any = null;

  constructor() { }

  private static errorHandler(error): any {
    console.error("Some error: " + error);
  }

  private CreateDatabase(): void {
    let dbName = "CourseDB";
    let version = "1.0";
    let name = "Db for Conestoga courses";
    let size = 2 * 1024 * 1024;

    this.db = openDatabase(dbName, version, name, size, () => {
      console.log("Success, database created !");
    });
  }

  private createDBTables(): void{
    function txFunction(tx: any): void{
      var sqlCommands: string = "CREATE TABLE IF NOT EXISTS Courses(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "courseName VARCHAR(20) NOT NULL, " +
        "courseCode VARCHAR(20) NOT NULL, " +
        "roomNumber VARCHAR(20), " +
        "instructor VARCHAR(20));";

      var options = [];

      tx.executeSql(sqlCommands, options, () => {
        console.info("Table: Courses successfully created!");
      }, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Table transaction successfully created!");
    });
  }

  private dropTableCourse(): void{
    function txFunction(tx: any): void{
      var sqlCommand: string = "DROP TABLE IF EXISTS Courses;";

      var options = [];

      tx.executeSql(sqlCommand, options, DatabaseService.errorHandler, () => {
        console.log("Table: Courses dropped successfully!");
      }, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Table drop transaction successful.");
    });
  }

  // initializing database
  public initDB(): void{
    if (this.db == null){

      try{
        this.CreateDatabase();
        this.createDBTables();
      }
      catch(e){
        console.error("Error: initDB function" + e);
      }
    }

  }

  // used for clearing database
  public clearDB(): void{
    let output = confirm("Clear Database: CourseDB ?");

    if(output){
      this.dropTableCourse();
      this.db = null;
      alert("CourseDB cleared!");
    }
  }

  // get DB instance
  getDB(): any{
    this.initDB();

    return this.db;
  }



}
