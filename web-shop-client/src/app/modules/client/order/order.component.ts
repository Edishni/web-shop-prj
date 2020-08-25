import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { OrderItem } from 'src/app/shared/models/Order-Items';

import { ApiOrdersService } from 'src/app/core/services/api-orders.service'
import { ApiOrderItemsService } from 'src/app/core/services/api-order-items.service'
import { CartListService } from 'src/app/core/services/cart-list.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City} from 'src/app/shared/models/Cities'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcceptDialogComponent } from 'src/app/core/components/accept-dialog/accept-dialog.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderDetails: any[]=[];
  dataSource?: Order[]=[];
  selectedOrder: Order;
  totalSum = 0;
  citylist=City.map(city => city.toUpperCase());
  cityCntrl=new FormControl('', Validators.required);
hasOrder:boolean=false;
  showTEMPLATE: Order;
  invalidLogin: boolean = false;
  message = '';
  addForm;
  constructor(private formBuilder: FormBuilder, public orderItemsAPI: ApiOrderItemsService,
     public orderAPI: ApiOrdersService, private router: Router, private cart: CartListService, private dialog4: MatDialog) { }

  loadOrders(id) {
    this.orderAPI.getById(id).subscribe(data => this.selectedOrder = data);
  }

  goBack() {
    this.router.navigate([`shopforclient/orderdetails`]);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      console.log("failed to add new order")
      return;
    } 
    console.log("New order start...");
    const order: Order = {
      name: this.addForm.controls.name.value,
      phone: this.addForm.controls.phone.value,
      city: this.cityCntrl.value,
      address: this.addForm.controls.address.value,
      email: this.addForm.controls.email.value,
      sum: this.addForm.controls.sum.value,
      delivery: this.addForm.controls.delivery.value,
      orderstatus: this.addForm.controls.orderstatus.value,
      wishes: this.addForm.controls.wishes.value,
      notes: this.addForm.controls.notes.value,
    }
    this.openDialogForConfirmNewOrder(order);
/*     console.log(order); 
   this.orderAPI.addOrder(order).subscribe(data => {
      this.message = 'New order has created';
      console.log(data.id);
       this.putItems(data.id);     
    });  */
  }

//dialog call start

openDialogForConfirmNewOrder(neworder: Order) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  const dialogRef = this.dialog4.open(AcceptDialogComponent, {
    width: '350px',
    data: "confirm the order..."
  });

  dialogRef.afterClosed().subscribe(
    data => {
      console.log("Dialog output:", data);
      //if was confirm action so do it
      if (data) {
        console.log("new order added");
        console.log(neworder); 
        this.orderAPI.addOrder(neworder).subscribe(data => {
           this.message = 'New order has created';
           console.log(data.id);
            this.putItems(data.id);     
         });
      }
    }
  );
}

//dialog end

putItems(addOrderId:number){
   //contain array of production and his quantity { Product , quantity}
    this.cart.itemsListToOrder.forEach(item => { 
     const addNewItem: OrderItem = {
        orderID: addOrderId,
        productID: item.elem.id,
        quantity: item.quantity
      } 
      this.orderItemsAPI.addItem(addNewItem).subscribe(newItem=>{
       console.log(newItem);
       this.hasOrder=true;
     }); 
    }); 
}
//count total sum in the order
  Total() {
    this.totalSum = 0;
    if (this.cart.itemsListToOrder.length > 0) {
      this.cart.itemsListToOrder.forEach(item => {
        this.totalSum += item.elem.cost * item.quantity;
      });
    }
    return this.totalSum;
  }

  ngOnInit(): void {

    this.orderDetails = this.cart.itemsListToOrder;
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.required],
      
      city: [''],
      address: ['', Validators.required],
      email: ['', Validators.required],
      sum: [this.Total()],
      delivery: [false],
      orderstatus: [false],
      wishes: [''],
      notes: [''],
    });

    this.showTEMPLATE = this.addForm;
    this.message = '';

  }
}
