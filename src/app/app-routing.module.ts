import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CourseInsertComponent} from "./course-insert/course-insert.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'addCourse', component: CourseInsertComponent},
  {path: 'list', component: CourseListComponent},
  {path: 'setting', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
