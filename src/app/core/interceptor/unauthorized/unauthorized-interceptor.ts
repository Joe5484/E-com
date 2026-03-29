import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  let toastrService = inject(ToastrService);
  let pLATFORM_ID = inject(PLATFORM_ID);
  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(pLATFORM_ID)) {
        if (err.status == 401 && err.statusText == 'unauthorized') {
          toastrService.error(err.error.message);
          router.navigate(['/login']);
        } 
      }
      return throwError(() => err);
    }),
  );
};
