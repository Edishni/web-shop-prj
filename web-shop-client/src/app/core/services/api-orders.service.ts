import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/Order';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiOrdersService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    console.log('get all orders try');
    return this.http.get<Order[]>(environment.apiOrders);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiOrders}/${id}`)
  }

  addPost(post: Order): Observable<Order> {
    return this.http.post<Order>(environment.apiOrders, post)
  }

  editPost(neworder: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.apiOrders}/${neworder.id}`, neworder)
  }

  deletePost(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.apiOrders}/${id}`)
  }
}
