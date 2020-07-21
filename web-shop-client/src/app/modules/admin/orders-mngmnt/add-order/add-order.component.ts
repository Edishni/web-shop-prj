import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
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
      this.message='New order was added into list'
      console.log(data);
      this.addForm.reset();
    }); 
   
  }
goBack(){
  this.router.navigate([`administrator/adminorder/allorder`]);
}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      sum: [0, Validators.required],
      delivery: [false, Validators.required],
      orderstatus: [false, Validators.required],
      wishes: '',
      notes: '',
    });
    
    this.showTEMPLATE=this.addForm;
    this.message='';
  }
}
