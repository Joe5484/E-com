import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  private readonly httpClient = inject(HttpClient);

  addAddress(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/addresses`, data);
  }

  getLoggedAdressUser(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/addresses`);
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/addresses/${addressId}`);
  }



  getAddressById(addressId: string): Observable<any> {
  return this.httpClient.get(`${environment.baseUrl}api/v1/addresses/${addressId}`);
}

updateAddress(addressId: string, data: any): Observable<any> {
  return this.httpClient.put(`${environment.baseUrl}api/v1/addresses/${addressId}`, data);
}
}
