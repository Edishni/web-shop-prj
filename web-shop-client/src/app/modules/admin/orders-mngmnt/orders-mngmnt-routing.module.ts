import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';


const routes: Routes = [
    { path: '', redirectTo : 'allorders' , pathMatch:'full'},
    { path: 'addorder', component: AddOrderComponent },
    { path: 'editorder/:id', component: EditOrderComponent },
    { path: 'allorders', component: AllOrdersComponent },
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersMngmntRoutingModule { }
