import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersMngmntModule} from './orders-mngmnt/orders-mngmnt.module';
import { ProductMngmntModule} from './product-mngmnt/product-mngmnt.module';
import { UserMngmntModule} from './user-mngmnt/user-mngmnt.module';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    OrdersMngmntModule,
    ProductMngmntModule,
    UserMngmntModule,
    MaterialModule,
    ReactiveFormsModule 
   
  ]
})
export class AdminModule { }
