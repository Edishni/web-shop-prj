import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/Order';
import { OrderItems } from 'src/app/shared/models/OrderItems';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderItemsService {

  constructor(private http: HttpClient) { }
  selectedOrder:Order;
  selectedItems:ApiOrderItemsService;
  
    getAll(): Observable<OrderItems[]> {
      console.log('get all order items try');
      return this.http.get<OrderItems[]>(environment.apiOrderItems);
    }
  
    getById(id: number): Observable<OrderItems> {
      return this.http.get<OrderItems>(`${environment.apiOrderItems}/${id}`)
    }
  
    addOrder(orderItems: OrderItems): Observable<OrderItems> {
      return this.http.post<OrderItems>(environment.apiOrderItems, orderItems)
    }
  
    editOrder(neworderItems: OrderItems): Observable<OrderItems> {
      return this.http.put<OrderItems>(`${environment.apiOrderItems}/${neworderItems.id}`, neworderItems)
    }
  
    deleteOrder(id: number): Observable<OrderItems> {
      return this.http.delete<OrderItems>(`${environment.apiOrderItems}/${id}`)
    }
  }