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
selectedOrder:Order;

  getAll(): Observable<Order[]> {
    console.log('get all orders try');
    return this.http.get<Order[]>(environment.apiOrders);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiOrders}/${id}`)
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.apiOrders, order)
  }

  editOrder(neworder: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.apiOrders}/${neworder.id}`, neworder)
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.apiOrders}/${id}`)
  }
}
