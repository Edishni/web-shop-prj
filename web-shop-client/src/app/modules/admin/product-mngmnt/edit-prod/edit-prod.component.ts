import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent implements OnInit {
  showTEMPLATE:Product;
  message:string='';
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiProd: ApiProductsService, private router:Router) { }
  addForm;

  showPreviewCard(){
    this.showTEMPLATE={
      prodname: this.addForm.controls.prodname.value,
      category: this.addForm.controls.category.value,
      urlpicture: this.addForm.controls.urlpicture.value,
      description: this.addForm.controls.description.value,
      cost: this.addForm.controls.cost.value,
    }
  }

  goBack(){
    this.router.navigate([`administrator/adminprod/allprod`]);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
     const prod: Product = {
       id:this.apiProd.selectedProd.id,
      prodname: this.addForm.controls.prodname.value,
      category: this.addForm.controls.category.value,
      urlpicture: this.addForm.controls.urlpicture.value,
      description: this.addForm.controls.description.value,
      cost: this.addForm.controls.cost.value,
    }
    /* console.log(prod); */
    this.apiProd.editProd(prod).subscribe(data => {
           this.message='The perfume was updated '
      console.log(data);
      this.addForm.reset();
    }); 

  }

  ngOnInit(): void {
    this.message = '';
    this.addForm = this.formBuilder.group({
      prodname: [this.apiProd.selectedProd.prodname, Validators.compose([Validators.required])],
      category: [this.apiProd.selectedProd.category, Validators.required],
      urlpicture: [this.apiProd.selectedProd.urlpicture, Validators.required],
      description: [this.apiProd.selectedProd.description, Validators.required],
      cost: [this.apiProd.selectedProd.cost, Validators.required],
    });
    this.showTEMPLATE=this.addForm;
    this.message='';
  }
}
