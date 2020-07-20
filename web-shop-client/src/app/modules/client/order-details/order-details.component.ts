import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { Product } from 'src/app/shared/models/Product';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { ApiProductsService } from 'src/app/core/services/api-products.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  selectedOrder:Order;
  product_list:Product[];

  constructor(public orderAPI : ApiOrdersService,public prodAPI : ApiProductsService) { }

  loadOrders(id){
    this.orderAPI.getById(id).subscribe(data => this.selectedOrder = data);
    this.prodAPI.getAll().subscribe(data => this.product_list = data);
  }

  ngOnInit():void {
    console.log('orders api?');
    this.loadOrders(1);
  }
}
