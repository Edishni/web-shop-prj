import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/Order';
import { OrderItem } from 'src/app/shared/models/Order-Items';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderItemsService {

  constructor(private http: HttpClient) { }
  selectedOrder:Order;
  selectedItems:OrderItem;
  
    getAll(): Observable<OrderItem[]> {
      console.log('get all order items try');
      return this.http.get<OrderItem[]>(environment.apiOrderItems);
    }
  
    getById(id: number): Observable<OrderItem> {
      return this.http.get<OrderItem>(`${environment.apiOrderItems}/${id}`)
    }
  
   addItem(orderItems: OrderItem): Observable<OrderItem> {
     console.log(orderItems);
     console.log("post item try...");
      return this.http.post<OrderItem>(environment.apiOrderItems, orderItems)
    }
  
    editOrder(neworderItem: OrderItem): Observable<OrderItem> {
      return this.http.put<OrderItem>(`${environment.apiOrderItems}/${neworderItem.id}`, neworderItem)
    }
  
    deleteOrder(id: number): Observable<OrderItem> {
      return this.http.delete<OrderItem>(`${environment.apiOrderItems}/${id}`)
    }
  }