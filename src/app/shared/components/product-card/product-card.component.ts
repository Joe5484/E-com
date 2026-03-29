import { Component, inject, input, InputSignal } from '@angular/core';
import { Iproducts } from '../../../core/models/Iproducts/iproducts.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  data: InputSignal<Iproducts> = input.required<Iproducts>();

  getDiscount(): number {
    const price = this.data().price;
    const quantity = this.data().quantity;
    return Math.round(((quantity - price) / quantity) * 100);
  }

  getStars(rating: number): { full: number; half: boolean; empty: number } {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return { full, half, empty };
  }

  addProductToCart(id: any) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message)
        this.cartService.numberOfCartItem.set(res.numOfCartItems)
       },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message);
      },
    });
  }



}
