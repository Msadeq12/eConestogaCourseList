import {Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-course-insert',
  templateUrl: './course-insert.component.html',
  styleUrls: ['./course-insert.component.css']
})
export class CourseInsertComponent implements OnInit {

  course: Course = new Course("", "",
    "", "");

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  btnAddCourse_click(){

    this.database.insert(this.course, () => {
      console.log("course added!");
      alert("Course added to CourseDB!");
    });
  }


}
