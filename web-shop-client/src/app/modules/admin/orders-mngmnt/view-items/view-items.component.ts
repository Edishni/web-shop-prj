import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { Product } from 'src/app/shared/models/Product';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { CartListService } from 'src/app/core/services/cart-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiOrderItemsService } from 'src/app/core/services/api-order-items.service';
import { OrderItem } from 'src/app/shared/models/Order-Items';
import { summaryFileName } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  sub: any; //in use
  findOrderID: number; //in use
  cartPerfumeList: any = []; //in use
  totalSum: number;  //in use
  /*   selectedOrder: Order; */
  ItemsInOrder: OrderItem[] = [];

  constructor(private route: ActivatedRoute, public orderAPI: ApiOrdersService,
    public ItemsInOrderAPI: ApiOrderItemsService, public prodAPI: ApiProductsService, public cart: CartListService, private router: Router) { }

  /*   loadItems() {
      this.itemsInOrder.getAll()
        .subscribe(
          data => {
             this.ItemsInOrder= data.filter(ele => {ele.orderID == this.findOrderID});
              console.log("items array:"+this.itemsInOrder);
              this.ItemsInOrder.forEach(item => (this.prodAPI.getById(item.productID).subscribe(
                    elem => {
                      this.cartPerfumeList.push({ product : elem, quantity: item.quantity });
                      console.log("element:"+elem);
                    },
                    error => {
                      console.log("error:"+error);
                    })));  
            },
          error => {
            console.log(error);
          });
    } */

  loadItems() {
    this.ItemsInOrderAPI.getAll()
      .subscribe(
        data => {
          this.ItemsInOrder = data.filter(ele => ele.orderID == this.findOrderID);
          console.log(this.ItemsInOrder);
          this.TakeItem();
        },
        error => {
          console.log(error);
        });
  }

  TakeItem() {
    this.totalSum = 0;
    this.cartPerfumeList = [];
    this.ItemsInOrder.forEach(item => {
      this.prodAPI.getById(item.productID)
        .subscribe(data => {
          this.cartPerfumeList
          .push({
            id: data.id,
            prodname: data.prodname,
            category: data.category,
            urlpicture: data.urlpicture,
            description: data.description,
            cost: data.cost,
            quantity: item.quantity,
            sum: data.cost * item.quantity
          })
          this.totalSum += data.cost * item.quantity;
        });
    })
    console.log(this.cartPerfumeList);
  }

  goBack() {
    this.router.navigate([`administrator/adminorder`]);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.findOrderID = +params['id']; // (+) converts string 'id' to a number
    });
    this.loadItems();
    this.totalSum = 0;
     }
}
