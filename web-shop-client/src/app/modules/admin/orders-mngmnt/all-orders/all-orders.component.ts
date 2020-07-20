import { Component, OnInit } from '@angular/core';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  dataSource? : Order[];

  constructor(public orderAPI : ApiOrdersService) { }

  loadOrders(){
    this.orderAPI.getAll().subscribe(data => this.dataSource = data);
  }

  ngOnInit():void {
    console.log('orders api?');
    this.loadOrders();
  }


}
