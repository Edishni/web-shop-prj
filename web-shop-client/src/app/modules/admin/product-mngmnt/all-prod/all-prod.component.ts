import { Component, OnInit, ElementRef } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcceptDialogComponent } from 'src/app/core/components/accept-dialog/accept-dialog.component';
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
  constructor(public prodAPI: ApiProductsService, private router: Router, private dialog: MatDialog) { }

  loadProd() {
    this.prodAPI.getAll().subscribe(data => {
      data.forEach(item => item.prodname = item.prodname.toUpperCase());
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
  // confirm dialog
  openDialogForConfirmDeletion(delselProd: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AcceptDialogComponent, {
      width: '350px',
      data: "confirm item deletion..."
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        //if was confirm delation so delete item
        if (data) {
          this.deleteSelectedProduct(delselProd);
        }
      }
    );
  }

  //end confirm dialog

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

  searchName(prodname: string) {
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
