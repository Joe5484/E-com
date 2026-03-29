import { ProductsService } from '../../core/services/Products/products.service';
import { Iproducts } from '../../core/models/Iproducts/iproducts.interface';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-shop',
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList: WritableSignal<Iproducts[]> = signal([]);
  pageSize:WritableSignal<number>= signal(0)
  p:WritableSignal<number>= signal(0)
  total:WritableSignal<number>= signal(0)

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(pageNumber: any = 1) {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        console.log(res);
        this.pageSize.set(res.metadata.limit)
        this.p.set(res.metadata.currentPage)
        this.total.set(res.results)
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  pageChanged(e:any){
    console.log(e);
    this.getAllProducts(e)
    
  }
}
