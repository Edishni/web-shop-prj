import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { TabAllOrderComponent } from './tab-all-order/tab-all-order.component';


const routes: Routes = [
    { path: '', redirectTo : 'taballorders' , pathMatch:'full'},
    { path: 'addorder', component: AddOrderComponent },
    { path: 'editorder/:id', component: EditOrderComponent },
    { path: 'viewitems/:id', component: ViewItemsComponent },
    { path: 'allorders', component: AllOrdersComponent },
    { path: 'taballorders', component: TabAllOrderComponent},
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersMngmntRoutingModule { }
