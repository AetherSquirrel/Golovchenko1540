import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './shared/ui/mainpage/mainpage/mainpage.component';
import { StudentsComponent } from './shared/ui/students/students/students.component';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
