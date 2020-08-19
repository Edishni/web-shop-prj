import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AcceptDialogComponent } from 'src/app/core/components/accept-dialog/accept-dialog.component';

@Component({
  selector: 'app-tab-all-order',
  templateUrl: './tab-all-order.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./tab-all-order.component.css']
})
export class TabAllOrderComponent implements OnInit {

  dataSource?: Order[];
  originalData: Order[] = [];
  message: string = '';
  columnsToDisplay = ['id', 'name', 'phone', 'city', 'address', 'email', 'sum'];
  expandedOrder: Order | null;
  totalSum: number;
  constructor(public orderAPI: ApiOrdersService, private router: Router, private dialog3: MatDialog) { }

  editSelectedOrder(editselOrder: Order) {
    this.orderAPI.selectedOrder = editselOrder;
    console.log(editselOrder);
    this.router.navigate([`/adminorder/editorder/${editselOrder.id}`]);
  }
  lookItems(orderID: number) {
    this.router.navigate([`/adminorder/viewitems/${orderID}`]);
  }
  //dialog call start

  openDialogForConfirmDeletion(delselOrder: Order) {
    console.log("confirm????");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog3.open(AcceptDialogComponent, {
      width: '350px',
      data: "confirm deletion..."
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        //if was confirm delation so delete item
        if (data) {
          this.deleteSelectedOrder(delselOrder);
        }
      }
    );
  }

  //dialog end

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

    if (ordername) {
      this.dataSource = this.originalData.filter(ele => ele.name.includes(ordername));
    }
    else {
      this.dataSource = this.originalData;
    }
  }

  searchOrderID(orderID) {

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

  totalBalance() {
    this.totalSum = 0;
    this.originalData.forEach(elm =>
      this.totalSum += elm.sum
    )
    return this.totalSum;
  }

  useFilter(deliverycheck: boolean, receivedchecked: boolean) {
    this.dataSource = this.originalData.filter(ele => (ele.delivery == deliverycheck) && (ele.orderstatus == receivedchecked))
  }

  ngOnInit(): void {
    console.log('orders api?');
    this.loadOrders();
  }

}
