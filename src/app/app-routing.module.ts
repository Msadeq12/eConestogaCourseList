import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CourseInsertComponent} from "./course-insert/course-insert.component";

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'addCourse', component: CourseInsertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
