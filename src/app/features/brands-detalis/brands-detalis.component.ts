import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Det } from '../../core/models/brand-det/brand/det.interface';

@Component({
  selector: 'app-brands-detalis',
  imports: [],
  templateUrl: './brands-detalis.component.html',
  styleUrl: './brands-detalis.component.css',
})
export class BrandsDetalisComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly brandsService = inject(BrandsService)
  brandId : WritableSignal <string |null> = signal('')
  brandData: WritableSignal<Det>=signal({} as Det)
  ngOnInit(): void {
    this.getBrandId()
  }
  getBrandId(){
    this.activatedRoute.paramMap.subscribe( (url)=>{
      if (url.get('id')) {
        this.brandId.set(url.get('id'))
        this.getSpecificbrand()
      }
      
    } )
  }
   getSpecificbrand() {
    this.brandsService.getSpecificBrands(this.brandId()).subscribe({
      next: (res) => {
        console.log(res);
        this.brandData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
