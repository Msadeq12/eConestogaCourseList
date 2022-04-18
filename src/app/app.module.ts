import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { CourseInsertComponent } from './course-insert/course-insert.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseListComponent } from './course-list/course-list.component';

import { ModifyCourseComponent } from './modify-course/modify-course.component';
import { CameraComponent } from './camera/camera.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseInsertComponent,
    HomepageComponent,
    CourseListComponent,
    ModifyCourseComponent,
    CameraComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
