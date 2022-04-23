import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import {Instructor} from "../model/instructor.model";

declare function capturePhoto(): any;
declare function captureEditablePhoto(): any;
declare function loadFromPhotoLibrary(): any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  instructor: Instructor = new Instructor("", null);

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  btnCapturePhoto_click(){
    capturePhoto();
  }

  btnCapturePhotoEdit_click(){
    captureEditablePhoto();
  }

  btnLoadFromLibrary_click(){
    loadFromPhotoLibrary();
  }

  btnEnter_click(){

    this.database.insertInstructor(this.instructor, () =>{
      console.log("Instructor added!");
      alert("Instructor added to CourseDB");
    })
  }

}
