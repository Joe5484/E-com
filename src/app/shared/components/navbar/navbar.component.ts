import { Component, computed,inject,OnInit, PLATFORM_ID,Signal} from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/Cart/cart.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  cartItems: Signal<number> = computed(() => this.cartService.numberOfCartItem());
  isLogdIn: Signal<boolean>=computed(()=>this.authService.isLogdIn());
  ngOnInit(): void {
    this.chackUser()
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  getLoggedUserCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numberOfCartItem.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logout() {
    this.spinner.show();

    setTimeout(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.spinner.hide();
      this.authService.isLogdIn.set(false)
    }, 1000);
  }

  chackUser() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('token') != undefined) {
        this.authService.isLogdIn.set(true);
        this.getLoggedUserCart();
      } else {
        this.authService.isLogdIn.set(false);
      }
    }
  }
}
