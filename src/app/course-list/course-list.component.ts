import { Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {DatabaseService} from "../database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  editPath: string = "../assets/images/edit.png";
  deletePath: string = "../assets/images/trash.png";


  constructor(private database: DatabaseService, private router: Router) {

  }

  ngOnInit(): void {

    this.database.selectAll()
      .then(data => {
        this.courses = data;
        console.info(data);
      })

      .catch(error => {
        console.error(error);
      });
  }

  // edits the page
  btnEdit_click(course){
    this.router.navigate(['edit/' + course.id]);
  }

  // removes course
  btnRemove_click(course){
    this.database.delete(course, () => {
      alert("Course deleted!");
    })

    window.location.reload();

  }

}
