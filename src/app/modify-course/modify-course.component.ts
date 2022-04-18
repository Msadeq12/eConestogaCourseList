import { Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {DatabaseService} from "../database.service";
import {ActivatedRoute} from "@angular/router";
import {Type} from "../model/type.model";

@Component({
  selector: 'app-modify-course',
  templateUrl: './modify-course.component.html',
  styleUrls: ['./modify-course.component.css']
})
export class ModifyCourseComponent implements OnInit {

  course: Course = new Course();
  types: Type[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService) {

  }

  ngOnInit(): void {

    let courseID: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.database.select(courseID)
      .then((data) => {
        this.course = data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.database.selectAllType()
      .then(data => {
        this.types = data
      })
      .catch(e => {
        console.error(e);
      });
  }

  UpdateCourseBtn_click(){

    this.database.update(this.course, () =>{
      alert("Updated course successfully!");
    });
  }

}
