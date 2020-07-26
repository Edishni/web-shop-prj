import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  constructor(private http: HttpClient) { }
  selectedProd : Product;
  getAll(): Observable<Product[]> {
    console.log('get all products try');
    return this.http.get<Product[]>(environment.apiProducts);
  }

  getById(id:number) : Observable<Product>
  {
    return this.http.get<Product>(`${environment.apiProducts}/${id}`)
  }

  getListById(orderid:number) : Observable<Product>
  {
    return this.http.get<Product>(`${environment.apiProducts}/OrderItems?${orderid}`)
  }
    
  addProd(prod:Product): Observable<Product>{
      return this.http.post<Product>(environment.apiProducts, prod)
  }
  
  editProd(newprod:Product): Observable<Product>{
    return this.http.put<Product>(`${environment.apiProducts}/${newprod.id}`,newprod)  
  }
  
  deleteProd(id:number): Observable<Product>{
    return this.http.delete<Product>(`${environment.apiProducts}/${id}`)
  }

  findByProdName(prodname:string) {
    return this.http.get<Product>(`${environment.apiProducts}?prodname=${prodname}`);
  }
}

/* 

apiProducts
apiOrders
apiOrderItems
apiUsers */