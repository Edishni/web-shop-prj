import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service'


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dataSource?: Order[];
  selectedOrder: Order;

  constructor(public orderAPI: ApiOrdersService) { }

  loadOrders(id) {
    this.orderAPI.getById(id).subscribe(data => this.selectedOrder = data);
  }

  ngOnInit(): void {
    console.log('orders api?');
    this.loadOrders(1);
  }
}
