import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  showTEMPLATE:Order;
  invalidLogin: boolean = false;
  message='';
  constructor(private formBuilder: FormBuilder, private apiOrder: ApiOrdersService,private router: Router) { }
  addForm;

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
     const order: Order = {
      name: this.addForm.controls.prodname.value,
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
    this.apiOrder.addOrder(order).subscribe(data => {
      this.message='The Order was updated '
      console.log(data);
      this.addForm.reset();
    }); 
   
  }

goBack(){
  this.router.navigate([`administrator/adminorder/allorders`]);
}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: [this.apiOrder.selectedOrder.name, Validators.compose([Validators.required])],
      phone: [this.apiOrder.selectedOrder.phone, Validators.required],
      city: [this.apiOrder.selectedOrder.city, Validators.required],
      address: [this.apiOrder.selectedOrder.address, Validators.required],
      email: [this.apiOrder.selectedOrder.email, Validators.required],
      sum: [this.apiOrder.selectedOrder.sum, Validators.required],
      delivery: [this.apiOrder.selectedOrder.delivery, Validators.required],
      orderstatus: [this.apiOrder.selectedOrder.orderstatus, Validators.required],
      wishes: this.apiOrder.selectedOrder.wishes,
      notes: this.apiOrder.selectedOrder.notes,
    });
    
    this.showTEMPLATE=this.addForm;
    this.message='';
  }

}
