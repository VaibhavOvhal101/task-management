import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task.constant';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/Task`);
  }
  
  editTask(payload: Task, id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/Task/${id}`, payload);
  }
  deleteTask(id:number):Observable<Task>{
    return this.http.delete<Task>(`${this.apiUrl}/Task/${id}`);
  }
  addTask(payload: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/Task`, payload);
  }

}
