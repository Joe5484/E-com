import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/services/Products/products.service';
import { Iproducts } from '../../core/models/Iproducts/iproducts.interface';
import { CategoryCardComponent } from "../../shared/components/category-card/category-card.component";
import { CategoryService } from '../../core/services/Category/category.service';
import { Icategory } from '../../core/models/Icategory/icategory.interface';
import { NgStyle } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CategoryCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  private readonly productsService = inject(ProductsService)
  private readonly categoryService = inject(CategoryService)
  productList:WritableSignal<Iproducts[]>=signal([])
  categoryList:WritableSignal<Icategory[]>=signal([])
  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()
  }

  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList.set(res.data)
        console.log('all products',this.productList());
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategorys().subscribe({
        next:(res)=>{
          this.categoryList.set(res.data)
        console.log( 'all category',this.categoryList());
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    }
    
  }

