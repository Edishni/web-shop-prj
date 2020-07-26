import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service'
import { CartListService } from 'src/app/core/services/cart-list.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
orderDetails : any[];
  dataSource?: Order[];
  selectedOrder: Order;
totalSum=0;

showTEMPLATE: Order;
invalidLogin: boolean = false;
deliveryCntr = new FormControl(false);
orderstatusCntr = new FormControl(false);

message = '';

addForm;
  constructor(private formBuilder: FormBuilder,public orderAPI: ApiOrdersService, private router: Router ,private cart : CartListService) { }

  loadOrders(id) {
    this.orderAPI.getById(id).subscribe(data => this.selectedOrder = data);
  }

  goBack(){
    this.router.navigate([`shopforclient/orderdetails`]);
  }
  
  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
     const order: Order = {
      name: this.addForm.controls.name.value,
      phone: this.addForm.controls.phone.value,
      city: this.addForm.controls.city.value,
      address: this.addForm.controls.address.value,
      email: this.addForm.controls.email.value,
      sum: this.addForm.controls.sum.value,
      delivery: this.addForm.controls.delivery.value,
      orderstatus: this.addForm.controls.orderstatus.value, 
      wishes: this.addForm.controls.wishes.value,
      notes: this.addForm.controls.notes.value,
    }
    /* console.log(order); */
    this.orderAPI.addOrder(order).subscribe(data => {
      this.message='New order has created'
      console.log(data);
    }); 
   
  }
  Total(){
    this.totalSum=0;
    if (this.cart.itemsListToOrder.length > 0) {
      this.cart.itemsListToOrder.forEach(item => {
        this.totalSum += item.elem.cost * item.quantity;
      });    
    }
    return this.totalSum;
  }

  ngOnInit(): void {
  
    this.orderDetails=this.cart.itemsListToOrder;
    
      this.addForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.required],
        sum: [this.Total(), Validators.required],
        delivery: ['', Validators.required],
        orderstatus: ['', Validators.required],
        wishes: ['', Validators.required],
        notes: ['', Validators.required],
      });
      
      this.showTEMPLATE=this.addForm;
      this.message='';
    
  }
}
