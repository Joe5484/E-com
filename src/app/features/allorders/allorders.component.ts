import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/Cart/cart.service';
import { Iorders } from '../../core/models/Iorders/iorders.interface';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})

export class AllordersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  ordersList: WritableSignal<Iorders[]> = signal([]);

  ngOnInit(): void {
    this.getUserOrders();
  }

getUserOrders() {
  if (isPlatformBrowser(this.pLATFORM_ID)) {
    const token = localStorage.getItem('token')!;
    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    this.cartService.getUserOrders(userId).subscribe({
      next: (res) => {
        console.log('all Orders', res);
        this.ordersList.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
}