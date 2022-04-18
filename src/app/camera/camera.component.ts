import { Component, OnInit } from '@angular/core';

declare function capturePhoto(): any;
declare function captureEditablePhoto(): any;
declare function loadFromPhotoLibrary(): any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor() { }

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

}
