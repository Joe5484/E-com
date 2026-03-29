import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient=inject(HttpClient)

  getAllProducts(pageNumber:any=1 ):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/v1/products`,{
      params:{
        page : pageNumber
      }
    }
      
    )
  }
    getSpecificProduct(id:string |null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/v1/products/${id}`)
  }
}
