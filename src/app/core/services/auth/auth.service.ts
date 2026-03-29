import { HttpClient } from '@angular/common/http';
import { Injectable,WritableSignal,inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient =inject(HttpClient)
  private readonly router =inject(Router)

  isLogdIn: WritableSignal<boolean> = signal(false);

  signUp(data:any) : Observable <any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signup`, data)
  }
  signIn(data:any) : Observable <any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signin`, data)
  }
    forgotPassword(data:any) : Observable <any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`, data)
  }
    verifyResetCode(data:any) : Observable <any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`, data)
  }
  
    resetPassword(data:any) : Observable <any> {
    return this.httpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`, data)
  }

  
changePassword(data: any): Observable<any> {
  return this.httpClient.put(`${environment.baseUrl}api/v1/users/changeMyPassword`, data);
}

updateUserData(data: any): Observable<any> {
  return this.httpClient.put(`${environment.baseUrl}api/v1/users/updateMe`, data);
}
 
}
