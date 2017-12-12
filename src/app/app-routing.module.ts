import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListsComponent },
  { path: 'todos/:id', component: TodoDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
