import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let toastrService = inject(ToastrService);
  let pLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('token') != undefined) {
      return true;
    } else {
      toastrService.error('you need to be logged in to access this page');
      return router.parseUrl('/login');
    }
  }
  else{
    return true;
  }
  
};
