import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { Product } from 'src/app/shared/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {
  showTEMPLATE:Product;
  invalidLogin: boolean = false;
  message='';
  constructor(private formBuilder: FormBuilder, private apiProd: ApiProductsService,private router: Router) { }
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


  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
     const prod: Product = {
      prodname: this.addForm.controls.prodname.value,
      category: this.addForm.controls.category.value,
      urlpicture: this.addForm.controls.urlpicture.value,
      description: this.addForm.controls.description.value,
      cost: this.addForm.controls.cost.value,
    }
    /* console.log(prod); */
    this.apiProd.addProd(prod).subscribe(data => {
      this.message='New perfume was added into list'
      console.log(data);
      this.addForm.reset();
    }); 
   
  }
goBack(){
  this.router.navigate([`administrator/adminprod/allprod`]);
}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      prodname: ['', Validators.compose([Validators.required])],
      category: ['', Validators.required],
      urlpicture: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
    });
    this.showTEMPLATE=this.addForm;
    this.message='';
  }

}
