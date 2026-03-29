import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Iproducts } from '../../core/models/Iproducts/iproducts.interface';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/models/IBrands/ibrands.interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  imports: [RouterLink,NgxPaginationModule ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
    private readonly brandsService = inject(BrandsService);
  brandsList: WritableSignal<IBrands[]> = signal([]);
  pageSize:WritableSignal<number>= signal(0)
  p:WritableSignal<number>= signal(0)
  total:WritableSignal<number>= signal(0)

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(pageNumber: any = 1) {
    this.brandsService.getAllBrands(pageNumber).subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
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
    this.getAllBrands(e)
    
  }
}
