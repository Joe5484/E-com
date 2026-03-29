import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/Products/products.service';
import { Iproducts } from '../../core/models/Iproducts/iproducts.interface';
import { CartService } from '../../core/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productId: WritableSignal<string | null> = signal('');
  prodData: WritableSignal<Iproducts> = signal({} as Iproducts);
  selectedImage = signal(0);
  ngOnInit(): void {
    this.getProductIdFromRoute();
  }

  getProductIdFromRoute() {
    this.activatedRoute.paramMap.subscribe((url) => {
      if (url.get('id')) {
        this.productId.set(url.get('id'));
        this.getSpecificProduct();
      }
    });
  }
  getSpecificProduct() {
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (res) => {
        console.log(res);
        this.prodData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getDiscount(): number {
    const price = this.prodData().price;
    const quantity = this.prodData().quantity;
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
        this.toastrService.success(res.message);
        this.cartService.numberOfCartItem.set(res.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message);
      },
    });
  }
}
