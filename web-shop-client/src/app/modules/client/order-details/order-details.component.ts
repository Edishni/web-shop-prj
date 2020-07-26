import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { Product } from 'src/app/shared/models/Product';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { CartListService } from 'src/app/core/services/cart-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  cartPerfumeList: any[] = [];
  totalSum: number ;
  selectedOrder: Order;
  product_list: Product[] = [];

  constructor(public orderAPI: ApiOrdersService, public prodAPI: ApiProductsService, public cart: CartListService, private router: Router) { }

  loadOrders() {
    let quantity: number = 1;
    this.cart.templateProdList.forEach(elem => (this.cartPerfumeList.push({ elem, quantity })));
  }

  Total(){
    this.totalSum=0;
    if (this.cartPerfumeList.length > 0) {
      this.cartPerfumeList.forEach(item => {
        this.totalSum += item.elem.cost * item.quantity;
      });    
    }
    return this.totalSum;
  }

  goBack(){
    this.router.navigate([`shopforclient/shopall`]);
  }

  goToOrder(){
    console.log(this.cartPerfumeList);
    this.cart.itemsListToOrder=this.cartPerfumeList;
    this.router.navigate([`shopforclient/order`]);
  }
  
  ngOnInit(): void {
    console.log('orders api?');
    this.loadOrders();
    this.totalSum=0;
  }
}
