import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RegistrationComponent } from './registration/Registration.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { ClientRoutingModule } from './client-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    RegistrationComponent,
    ShopAllComponent,

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
 ReactiveFormsModule
  ]
})
export class ClientModule { }
