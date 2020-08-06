import { Component, OnInit, ElementRef } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-all-prod',
  templateUrl: './all-prod.component.html',
  styleUrls: ['./all-prod.component.css']
})
export class AllProdComponent implements OnInit {

  dataSource?: Product[] = [];
  originalList: Product[] = [];
  categoryList: string[] = [];

  message: string = '';
  quantity: number = 0;

  constructor(public prodAPI: ApiProductsService, private router: Router) { }

  loadProd() {
    this.prodAPI.getAll().subscribe(data => {
      this.dataSource = data;
      this.originalList = data;

      this.originalList.forEach(item => {
        if (!this.categoryList.includes(item.category))
          this.categoryList.push(item.category)
      });
    });
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

  searchCategory(cat) {
      if (cat) {
      this.dataSource = this.originalList.filter(ele => ele.category.includes(cat));
    }
    else {
      this.dataSource = this.originalList;
    }
  }

  searchName(prodname:string) {
    if (prodname) {
      this.dataSource = this.originalList.filter(ele => ele.prodname.includes(prodname));
    }
    else {
      this.dataSource = this.originalList;
    }
  }

  ngOnInit(): void {

    console.log('api?');
    this.loadProd();

  }
}
