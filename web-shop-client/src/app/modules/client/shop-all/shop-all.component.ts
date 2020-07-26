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
  
  dataSource: Product[] = [];

  quantity: number = 0;

  constructor(public prodAPI: ApiProductsService, public cart: CartListService,private router : Router) { }

  addItemToCart(item: Product) {
    this.cart.addToCart(item);  
  }

  removeFromCart(item: Product) {
    this.cart.delFromCart(item);
  }

  goToCartList(){
    this.router.navigate([`shopforclient/orderdetails`]);
  }

  searchPerfume(item) {
    this.prodAPI.getAll()
      .subscribe(
        data => {
          this.dataSource = data.filter(ele => ele.prodname.includes(item));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  loadProd() {
    this.prodAPI.getAll().subscribe(data => this.dataSource = data);
  }

  ngOnInit(): void {
    console.log('api?');
    this.loadProd();
  }

}
