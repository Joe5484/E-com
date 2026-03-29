import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/Cart/cart.service';
import { ICart } from '../../core/models/ICart/icart.interface';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  
  cartDetails: WritableSignal<ICart> = signal({} as ICart);
  isLogdIn: Signal<boolean>= computed(()=>this.authService.isLogdIn());
  ngOnInit(): void {
    this.getLoggedUserCart();
    this.cartService.cartUpdated$.subscribe(() => {
      this.getLoggedUserCart();
    });
  }

  

  getLoggedUserCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItemFromCart(id: any) {
    this.cartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
        this.cartService.numberOfCartItem.set(res.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails.set({} as ICart)
        this.cartService.numberOfCartItem.set(res.numOfCartItems)
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  updeateItemQuantity(itemId: any , newCount:any){
    this.cartService.updeateItemQuantity(itemId , newCount).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails.set(res)
        },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
