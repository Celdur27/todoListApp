import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodoListsService {

  private apiUrl = 'https://todos.venturedevs.net/api/todolists/';

  constructor(private http: Http) {
    this.getAllTodoLists();
  }

  getAllTodoLists() {
    return this.http.get(this.apiUrl).map((res: Response) => res.json());
  }

  createTodoList(todoList: string) {
    return this.http.post(this.apiUrl, { name: todoList }).map((res: Response) => res.json());
  }

  updateTodoList(id: number, todoList) {
    return this.http.put(this.apiUrl + id + "/", { name: todoList }).map((res: Response) => res.json());
  }

  deleteTodoList(id: number) {
    return this.http.delete(this.apiUrl + id + "/").map((res: Response) => res.json());
  }

  getTodoDetails(id: number) {
    return this.http.get(this.apiUrl + id).map((res: Response) => res.json());
  }
}