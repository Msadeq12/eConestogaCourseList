export class Course{

  id: number = -1;
  courseName: string = "";
  courseCode: string = "";
  delivery: number = -1;
  room: string = "";
  instructor: string = "";

  constructor(courseName?: string, courseCode?: string,
              delivery?: number, room?: string, instructor?: string) {

    this.courseName = courseName;
    this.courseCode = courseCode;
    this.delivery = delivery;
    this.room = room;
    this.instructor = instructor;
  }

}
