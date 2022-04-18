import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CourseInsertComponent} from "./course-insert/course-insert.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {ModifyCourseComponent} from "./modify-course/modify-course.component";
import {CameraComponent} from "./camera/camera.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'addCourse', component: CourseInsertComponent},
  {path: 'list', component: CourseListComponent},
  {path: 'edit/:id', component: ModifyCourseComponent},
  {path: 'camPic', component: CameraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
