import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    private readonly httpClient=inject(HttpClient)

  getAllCategorys():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/v1/categories`)
  }
}
