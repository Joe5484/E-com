import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from '../../core/services/Cart/cart.service';

@Component({
  selector: 'app-chackout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './chackout.component.html',
  styleUrl: './chackout.component.css',
})
export class ChackoutComponent implements OnInit{
  private readonly formBuilder= inject(FormBuilder)
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly cartService= inject(CartService)
  cartId:WritableSignal<string|null>=signal('')
  checkOutForm!:FormGroup;
  ngOnInit(): void {
    this.checkOutForm=this.formBuilder.group({
        details:[null , [Validators.required]],
        phone:[null , [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]],
        city:[null , [Validators.required]],
    })

    this.activatedRoute.paramMap.subscribe({
      next:(urlPath)=>{
        this.cartId.set(urlPath.get('cartId'))
      }
    })
  }


  checkOutSession(){
    let payLoad = {
  shippingAddress:this.checkOutForm.value
}
    console.log(this.checkOutForm.value);
    this.cartService.checkOutSession(this.cartId(),payLoad).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status== 'success') {
          window.open(res.session.url, '_self')
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
