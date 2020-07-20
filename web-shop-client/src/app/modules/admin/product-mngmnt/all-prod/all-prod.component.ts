import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { ProductMngmntModule } from '../product-mngmnt.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-prod',
  templateUrl: './all-prod.component.html',
  styleUrls: ['./all-prod.component.css']
})
export class AllProdComponent implements OnInit {

  displayedColumns: string[] = ['id', 'prodname', 'category', 'urlpicture', 'description', 'cost'];
  dataSource?: Product[];
  message: string = '';
  quantity: number = 0;

  constructor(public prodAPI: ApiProductsService, private router: Router) { }

  loadProd() {
    this.prodAPI.getAll().subscribe(data => this.dataSource = data);
  }


  editSelectedProduct(editselProd: Product) {
    this.prodAPI.selectedProd = editselProd;
    console.log(editselProd);
    this.router.navigate([`/adminprod/editprod/${editselProd.id}`]);
   
  }

  deleteSelectedProduct(delselProd: Product) {
    this.prodAPI.deleteProd(delselProd.id).subscribe(data => {
      this.loadProd();
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

  searchName(prodname) {
    this.prodAPI.getAll()
      .subscribe(
        data => {
          this.dataSource = data.filter(ele => ele.prodname.includes(prodname));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    console.log('api?');
    this.loadProd();
  }
}
