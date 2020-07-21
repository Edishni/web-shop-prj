import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProdComponent } from './add-prod/add-prod.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { AllProdComponent } from './all-prod/all-prod.component';


const routes: Routes = [
  { path: '', redirectTo : 'allprod' , pathMatch:'full'},
  { path: 'addprod', component: AddProdComponent },
  { path: 'editprod/:id', component: EditProdComponent },
  { path: 'allprod', component: AllProdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMngmntRoutingModule { }
