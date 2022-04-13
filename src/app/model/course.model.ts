export class Course{

  id: number = -1;
  courseName: string = "";
  courseCode: string = "";
  room: string = "";
  instructor: string = "";

  constructor(courseName?: string, courseCode?: string,
              room?: string, instructor?: string) {

    this.courseName = courseName;
    this.courseCode = courseCode;
    this.room = room;
    this.instructor = instructor;
  }

}
