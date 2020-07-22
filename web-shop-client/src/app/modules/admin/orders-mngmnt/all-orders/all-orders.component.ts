import { Component, OnInit } from '@angular/core';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Order } from 'src/app/shared/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  dataSource?: Order[];
  message: string = '';
  constructor(public orderAPI: ApiOrdersService, private router: Router) { }

  editSelectedOrder(editselOrder: Order) {
    this.orderAPI.selectedOrder = editselOrder;
    console.log(editselOrder);
    this.router.navigate([`/adminorder/editorder/${editselOrder.id}`]);

  }

  deleteSelectedOrder(delselOrder: Order) {
    this.orderAPI.deleteOrder(delselOrder.id).subscribe(data => {
      this.loadOrders();
      this.message=`The order for ${delselOrder.name} was deleted`;
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }
  searchOrder(ordername) {
    this.orderAPI.getAll()
      .subscribe(
        data => {
          this.dataSource = data.filter(ele => ele.name.includes(ordername));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  loadOrders() {
    this.orderAPI.getAll().subscribe(data => this.dataSource = data);
  }

  ngOnInit(): void {
    console.log('orders api?');
    this.loadOrders();
  }
}
