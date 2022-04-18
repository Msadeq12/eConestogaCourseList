import {Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {DatabaseService} from "../database.service";
import {Type} from "../model/type.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-insert',
  templateUrl: './course-insert.component.html',
  styleUrls: ['./course-insert.component.css']
})

export class CourseInsertComponent implements OnInit {

  course: Course = new Course("", "", 0,
    "", "");

  types: Type[] = [];


  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {

    this.database.selectAllType()
      .then(data => {
        this.types = data
      })
      .catch(e => {
        console.error(e);
      });

  }

  btnAddCourse_click(){

    this.database.insert(this.course, () => {
      console.log("course added!");
      alert("Course added to CourseDB!");
    });

  }



}
