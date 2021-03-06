import {Injectable,} from '@angular/core';
import {Course} from "./model/course.model";
import {Type} from "./model/type.model";


declare function openDatabase(dbName, version, name, size, successCreate): any;
@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  private db: any = null;

  constructor() {

  }

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
        "delivery INTEGER NOT NULL, " +
        "roomNumber VARCHAR(20), " +
        "instructor VARCHAR(20), " +
        "FOREIGN KEY (delivery) REFERENCES Type(typeId));";

      var options = [];

      tx.executeSql(sqlCommands, options, () => {
        console.info("Table: Courses successfully created!");
      }, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Table transaction successfully created!");
    });
  }

  private createType(): void{
    function txFunction(tx: any): void{
      var sqlCommands: string = "CREATE TABLE IF NOT EXISTS Type(" +
        "typeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "courseDelivery VARCHAR(20));";

      var sqlInsert: string = "INSERT INTO Type (typeId, courseDelivery) VALUES(1, 'Online');"
      var sqlInsert2: string = "INSERT INTO Type (typeId, courseDelivery) VALUES(2, 'In-person');"

      var options = [];


      tx.executeSql(sqlCommands, options, () => {
        console.info("Table: Type successfully created!");
      }, DatabaseService.errorHandler);

      tx.executeSql(sqlInsert, options, () => {
        console.info("Table: Type insert successfully!");
      }, DatabaseService.errorHandler);

      tx.executeSql(sqlInsert2, options, () => {
        console.info("Table: Type insert2 successfully!");
      }, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Table type transaction successfully created!");
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
        this.createType();
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

  public insert(course: Course, callback){
    function txFunction(tx: any){
      var sqlCommands: string = "INSERT INTO Courses(courseName, courseCode, delivery, roomNumber, instructor)" +
        " VALUES(?,?,?,?,?)";

      var options = [course.courseName, course.courseCode.toUpperCase(), course.delivery, course.room.toUpperCase()
        ,course.instructor];

      tx.executeSql(sqlCommands, options, callback, DatabaseService.errorHandler);

    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Course inserted successfully!");
    });
  }

  public selectAll(): Promise<any>{
    let options = [];
    let courses: Course[] = [];

    return new Promise((resolve, reject) => {

      function txFunction(tx){

        let sqlCommands: string = "SELECT * FROM Courses;";

        tx.executeSql(sqlCommands, options, (tx, dbResults) => {

          if(dbResults.rows.length > 0){

            for(let i =0; i < dbResults.rows.length; i++){
              let row = dbResults.rows[i];
              let course = new Course(row['courseName'], row['courseCode'], row['delivery'],
                row['roomNumber'], row['instructor']);

              course.id = row['id'];

              courses.push(course);
            }

            resolve(courses);

          }

          else{
            reject("No courses found in CourseDB");
          }

        }, DatabaseService.errorHandler);

      }

      this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("selectAll successfully performed!");
      });

    });

  }

  public selectAllType(): Promise<any>{
    let options = [];
    let types: Type[] = [];

    return new Promise((resolve, reject) => {

      function txFunction(tx){

        let sqlCommands: string = "SELECT * FROM Type;";

        tx.executeSql(sqlCommands, options, (tx, dbResults) => {

          if(dbResults.rows.length > 0){

            for(let i =0; i < dbResults.rows.length; i++){
              let row = dbResults.rows[i];
              let type = new Type(row['courseDelivery']);

              type.typeId = row['typeId'];

              types.push(type);
            }

            resolve(types);

          }

          else{
            reject("No types found in CourseDB");
          }

        }, DatabaseService.errorHandler);

      }

      this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("selectAll types successfully performed!");
      });

    });

  }

  public delete(course: Course, callback){

    function txFunction(tx: any){

      var sqlCommands: string = "DELETE FROM Courses WHERE id=?;";

      var options = [course.id];

      tx.executeSql(sqlCommands, options, callback, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () =>{
      console.log("Delete successfully performed!");
    });

  }

  public update(course: Course, callback){
    function txFunction(tx: any){

      var sqlCommmands = "UPDATE Courses SET courseName=?, courseCode=?, " +
        "delivery=?, roomNumber=?, instructor=? WHERE id=?;";

      var options = [course.courseName, course.courseCode.toUpperCase(), course.delivery, course.room.toUpperCase(),
      course.instructor, course.id];

      tx.executeSql(sqlCommmands, options, callback, DatabaseService.errorHandler);
    }

    this.getDB().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Updated transaction successfully!");
    });
  }

  public select(id: number): Promise<any>{
    let options = [id];
    let course : Course[] = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx){

        let sqlCommands = "SELECT * FROM Courses WHERE id=?";

        tx.executeSql(sqlCommands, options, (tx, dbResults) => {

          if(dbResults.rows.length > 0){

            let row = dbResults.rows[0];
            let course = new Course(row['courseName'], row['courseCode'], row['delivery'],
              row['roomNumber'], row['instructor']);
            course.id = row['id'];

            resolve(course);
          }

          else{
            reject("No courses found in CourseDB!");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDB().transaction(txFunction, DatabaseService.errorHandler, () =>{
        console.log("Select transaction successfully completed!");
      });
    });

  }



}
