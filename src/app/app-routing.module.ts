import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task/component/task-list/task-list.component';

const routes: Routes = [
  {path:'dashboard', component:TaskListComponent},
  {path:'',component:TaskListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
