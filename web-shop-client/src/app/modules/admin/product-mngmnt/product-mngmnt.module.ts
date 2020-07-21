import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProdComponent } from './add-prod/add-prod.component';
import { AllProdComponent } from './all-prod/all-prod.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { ProductMngmntRoutingModule } from './product-mngmnt-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProdComponent,
    AllProdComponent,
    EditProdComponent,
  ],
  imports: [
    CommonModule,
    ProductMngmntRoutingModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class ProductMngmntModule { }
