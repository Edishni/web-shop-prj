import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './add-order/add-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrdersMngmntRoutingModule } from './orders-mngmnt-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddOrderComponent,
    AllOrdersComponent,
    EditOrderComponent,
  ],
  imports: [
    CommonModule,
    OrdersMngmntRoutingModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class OrdersMngmntModule { }
