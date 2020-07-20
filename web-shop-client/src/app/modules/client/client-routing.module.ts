import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RegistrationComponent } from './registration/Registration.component';


const routes: Routes = [
  { path: '', redirectTo : 'shopall' , pathMatch:'full'},
  { path: 'order', component: OrderComponent },
  { path: 'orderdetails', component: OrderDetailsComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'shopall', component: ShopAllComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
