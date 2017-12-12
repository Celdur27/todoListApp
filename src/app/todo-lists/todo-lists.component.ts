import { Component, OnInit } from '@angular/core';
import { TodoListsService } from '../todo-lists.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit {
  private todos: any = [];
  private newListName: string = "";
  private status: string;
  private filterName: string;  

  constructor(private todoListsService: TodoListsService) { 
    this.status = "loading";
    this.filterName = "";
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getTodos();
  }

  getTodos() {
    this.todoListsService.getAllTodoLists().subscribe(lists => {
      this.todos = lists;
      this.status = "active";
    });
  }

  addList() {
    this.todoListsService.createTodoList(this.newListName).subscribe(list => {
      this.refresh();
     });
  }

  deleteList(id: number) {
    this.todoListsService.deleteTodoList(id).subscribe(list => {
      this.refresh();
     });
  }

  updateList(id: number, newName: string) {
    this.todoListsService.updateTodoList(id, newName).subscribe(list => {
      this.refresh();
     });
  }

  getTodoListDetails(id: number) {
    this.todoListsService.getTodoDetails(id).subscribe(todo => { });
  }

}