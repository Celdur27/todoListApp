import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetailsService } from '../todo-details.service';
import { TodoListsService } from '../todo-lists.service';
import { Location } from '@angular/common';

enum CompleteState {
  all,
  incompleted,
  completed
}

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  private todosToShow: any = [];
  private allTodos: any = [];
  private id: number;
  private listName: string;
  private newTodoName: string = "";
  private status: string;
  private completeStateEnum;
  private completeState: CompleteState;
  private filterName: string;  

  constructor(private route: ActivatedRoute, private todoDetailsService: TodoDetailsService, private todoListsService: TodoListsService, private location: Location) {
    this.status = "loading";
    this.completeStateEnum = CompleteState;
    this.completeState = CompleteState.all;
    this.filterName = "";
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getTodoListName();
    this.refresh();
  }

  refresh() {
    this.getTodoDetails();
  }

  getTodoListName() {
    this.todoListsService.getAllTodoLists().subscribe(list => {
      for(let todo of list) {
        if (todo.id === this.id) {
          this.listName = todo.name;
        }
      }
    });
  }

  getTodoDetails() {
    this.todoListsService.getTodoDetails(this.id).subscribe(todoDetails => {
      this.todosToShow = todoDetails;
      this.allTodos = todoDetails;
      this.setTodosToShow(this.completeState);
      this.status = "active";
    });
  }

  goBack(): void {
    this.location.back();
  }

  addTodo() {
    let newTodo = {
      name: this.newTodoName,
      is_complete: false,
      todo_list: this.id
    };

    this.todoDetailsService.createTodo(newTodo).subscribe(list => {
      this.newTodoName = "";
      this.refresh();
     });
  }

  updateTodo(id: number, isComplete: boolean, updatedName: string) {
    let updatedTodo = {
      name: updatedName,
      is_complete: isComplete,
      todo_list: this.id
    };

    this.todoDetailsService.updateTodo(id, updatedTodo).subscribe(list => {
      this.refresh();
    });
  }

  deleteTodo(id: number) {
    this.todoDetailsService.deleteTodo(id).subscribe(list => {
      this.refresh();
     });
  }

  changeCompleteState(state: CompleteState) {
    if(state === CompleteState.all) {
      this.completeState = CompleteState.all;
    } else if(state === CompleteState.incompleted) {
      this.completeState = CompleteState.incompleted;
    } else if(state === CompleteState.completed) {
      this.completeState = CompleteState.completed;
    }
    this.setTodosToShow(this.completeState);
  }

  setTodosToShow(state: CompleteState) {
    switch(state) {
      case CompleteState.all:
        this.todosToShow = this.allTodos;
        break;
      case CompleteState.incompleted:
        this.todosToShow = [];
        for(let todo of this.allTodos) {
          if(!todo.is_complete) {
            this.todosToShow.push(todo);
          }
        }
        break;
      case CompleteState.completed:
        this.todosToShow = [];
        for(let todo of this.allTodos) {
          if(todo.is_complete) {
            this.todosToShow.push(todo);
          }
        }
        break;
    }
  }
}
