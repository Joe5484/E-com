import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
    private readonly httpClient=inject(HttpClient)

  getAllBrands(pageNumber:any=1 ):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/v1/brands`,{
      params:{
        page : pageNumber
      }
    }
      
    )
  }
  
    getSpecificBrands(id:string |null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/v1/brands/${id}`)
  }

}
