import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { CartListService } from 'src/app/core/services/cart-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.css']
})
export class ShopAllComponent implements OnInit {
  arrayCart: any[] = [];
  originalList: Product[] = [];
  categoryList: string[] = ["FOR MEN","FOR WOMEN"];
  dataSource: Product[] = [];

  quantity: number = 0;

  constructor(public prodAPI: ApiProductsService, public cart: CartListService, private router: Router) { }

  addItemToCart(item: Product) {
    this.cart.addToCart(item);
  }

  removeFromCart(item: Product) {
    this.cart.delFromCart(item);
  }

  goToCartList() {
    this.router.navigate([`shopforclient/orderdetails`]);
  }

  searchPerfume(item: string ) {
    if (item) {
      this.dataSource = this.originalList.filter(ele => ele.prodname.includes(item.toUpperCase()));
    }
    else {
      this.dataSource = this.originalList;
    }
  }

  searchCategory(cat) {
    if (cat) {
      this.dataSource = this.originalList.filter(ele => ele.category.includes(cat));
    }
    else {
      this.dataSource = this.originalList;
    }
  }

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

  ngOnInit(): void {
    console.log('api?');
    this.loadProd();
  }

}
