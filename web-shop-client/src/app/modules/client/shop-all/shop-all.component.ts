import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ApiProductsService } from 'src/app/core/services/api-products.service';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.css']
})
export class ShopAllComponent implements OnInit {

  displayedColumns: string[] = ['id','prodname','category','urlpicture','description','cost'];
  dataSource : Product[]=[];
  
   quantity:number=0; 

  constructor(public prodAPI : ApiProductsService) { }

  loadProd(){
    this.prodAPI.getAll().subscribe(data => this.dataSource = data);
  }

  ngOnInit():void {
    console.log('api?');
    this.loadProd();
  }

}
