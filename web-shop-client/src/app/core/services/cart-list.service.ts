import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CartListService {
  templateProdList: Product[]=[];
  itemsListToOrder:any[];
  constructor() { }

  addToCart(item: Product): void {
    this.templateProdList.push(item);
   
  }

  delFromCart(item: Product){
    const index: number = this.templateProdList.indexOf(item);
    this.templateProdList.splice(index, 1);
  }

  findInCart(item:Product):boolean{
    if(this.templateProdList.indexOf(item)>=0){
      return true
    }
    else false
  }
  makeOrder(items){

  }

}
