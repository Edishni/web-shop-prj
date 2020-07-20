import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'adminorder',pathMatch:'full'},
  {path: 'adminorder' , loadChildren : ()=>import('src/app/modules/admin//orders-mngmnt/orders-mngmnt.module').then(m=>m.OrdersMngmntModule)},
  {path: 'adminprod' , loadChildren : ()=>import('src/app/modules/admin/product-mngmnt/product-mngmnt.module').then(m=>m.ProductMngmntModule)},
  {path: 'adminuser' , loadChildren : ()=>import('src/app/modules/admin/user-mngmnt/user-mngmnt.module').then(m=>m.UserMngmntModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
