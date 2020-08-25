import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CartListService {
  templateProdList: Product[] = [];
  itemsListToOrder: any[] = [];
  constructor() { }

  addToCart(item: Product): void {
    this.templateProdList.push(item);
  }

  delFromCart(prodid: number) {
    const index: number = this.templateProdList.findIndex(item=>item.id==prodid);
    this.templateProdList.splice(index, 1);
  }

  findInCart(prodid: number): boolean {
    if (this.templateProdList.find(item=>item.id==prodid)) {
      return true
    }
    else false
  }
}
