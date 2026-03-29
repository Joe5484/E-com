import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUpdated$ = new Subject<void>();

  private readonly httpClient = inject(HttpClient);
  
  numberOfCartItem : WritableSignal<number>= signal(0)

  addProductToCart(prodId: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/cart`, {
      productId: prodId,
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/cart`);
  }

  removeItemFromCart(itemId: any): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart/${itemId}`);
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart/`);
  }

  
  updeateItemQuantity(itemId: any , itemCount:any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}api/v1/cart/${itemId}`, {
      count: itemCount,
    });
  }

  checkOutSession(cartId:any, data:any): Observable<any> {
  return this.httpClient.post(`${environment.baseUrl}api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/allorders`,data);
}

  getUserOrders(id:string |null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/orders/user/${id}`);
  }
}
