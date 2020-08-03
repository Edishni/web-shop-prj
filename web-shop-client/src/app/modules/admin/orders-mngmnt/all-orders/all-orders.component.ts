import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Order } from 'src/app/shared/models/Order';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  @ViewChild('byorder') byorder: ElementRef;
  @ViewChild('byorderid') byorderid: ElementRef;
  dataSource?: Order[];
  originalData: Order[];
  message: string = '';

  constructor(public orderAPI: ApiOrdersService, private router: Router) { }

  editSelectedOrder(editselOrder: Order) {
    this.orderAPI.selectedOrder = editselOrder;
    console.log(editselOrder);
    this.router.navigate([`/adminorder/editorder/${editselOrder.id}`]);
  }
  lookItems(orderID: number) {
    this.router.navigate([`/adminorder/viewitems/${orderID}`]);
  }

  deleteSelectedOrder(delselOrder: Order) {
    this.orderAPI.deleteOrder(delselOrder.id).subscribe(data => {
      this.loadOrders();
      this.message = `The order for ${delselOrder.name} was deleted`;
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

  searchOrder(ordername) {
    this.byorderid.nativeElement.value = "";
    if (ordername) {
      this.dataSource = this.originalData.filter(ele => ele.name.includes(ordername));
    }
    else {
      this.dataSource = this.originalData;
    }
  }

  searchOrderID(orderID) {
    this.byorder.nativeElement.value = "";
    if (orderID) {
      this.dataSource = this.originalData.filter(ele => ele.id == orderID);
    }
    else {
      this.dataSource = this.originalData;
    }
  }

  loadOrders() {
  
    this.orderAPI.getAll().subscribe(data => {
      this.dataSource = data;
      this.originalData = data;
    });
  }

  ngOnInit(): void {
    console.log('orders api?');
    this.loadOrders(); 
     this.byorder.nativeElement.value = "";
    this.byorderid.nativeElement.value = "";
  }
}
