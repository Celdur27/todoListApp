import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodoDetailsService {
  private apiUrl = 'https://todos.venturedevs.net/api/todos/';
  
    constructor(private http: Http) {
      this.getAllTodos();
    }
  
    getAllTodos() {
      return this.http.get(this.apiUrl).map((res: Response) => res.json());
    }
  
    createTodo(todo) {
      return this.http.post(this.apiUrl, todo).map((res: Response) => res.json());
    }
  
    updateTodo(id: number, todo) {
      return this.http.put(this.apiUrl + id + "/", todo).map((res: Response) => res.json());
    }
  
    deleteTodo(id: number) {
      return this.http.delete(this.apiUrl + id + "/").map((res: Response) => res.json());
    }
}
