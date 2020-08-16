import { Component, OnInit, ElementRef } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { Router } from '@angular/router';
/* import { ViewChild } from '@angular/core'; */

@Component({
  selector: 'app-all-prod',
  templateUrl: './all-prod.component.html',
  styleUrls: ['./all-prod.component.css']
})
export class AllProdComponent implements OnInit {

  dataSource?: Product[] = [];
  originalList: Product[] = [];
  categoryList: string[] = [];
  result: string = '';
  message: string = '';
  quantity: number = 0;
/* ,public dialog: MatDialog */
  constructor(public prodAPI: ApiProductsService, private router: Router) { }

  loadProd() {
    this.prodAPI.getAll().subscribe(data => {
      data.forEach(item =>item.prodname= item.prodname.toUpperCase());
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

/*   confirmDialog():void{
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    }); 
  
  }*/

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
