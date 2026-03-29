import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsDetailsComponent } from './features/products-details/products-details.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { SupportComponent } from './features/support/support.component';

import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { CartComponent } from './features/cart/cart.component';
import { ChackoutComponent } from './features/chackout/chackout.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { ShopComponent } from './features/shop/shop.component';
import { BrandsDetalisComponent } from './features/brands-detalis/brands-detalis.component';
import { AllordersComponent } from './features/allorders/allorders.component';
import { AddressUserComponent } from './features/address-user/address-user.component';
import { SettingsComponent } from './features/settings/settings.component';


export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'login', component:LoginComponent , title:'fresh cart/home'},
    {path:'register', component:RegisterComponent , title:'fresh cart/home'},
    {path:'home', component:HomeComponent , title:'fresh cart/home'},
    {path:'shop', component:ShopComponent,title:'fresh cart/products'},
    {path:'products-details/:id', component:ProductsDetailsComponent ,title:'fresh cart/products-details'},
    {path:'brands-details/:id', component:BrandsDetalisComponent ,title:'fresh cart/brands-details'},
    {path:'brands', component:BrandsComponent , title:'fresh cart/brands'},
    {path:'categories', component:CategoriesComponent, title:'fresh cart/categories'},
    {path:'support', component:SupportComponent , title:'fresh cart/support'},
    {path:'address-user', component:AddressUserComponent , title:'fresh cart/address-user'},
    {path:'settings', component:SettingsComponent , title:'fresh cart/settings'},
    {path:'cart', component:CartComponent ,title:'fresh cart/cart', canActivate:[authGuard]},
    {path:'allorders', component:AllordersComponent ,title:'fresh cart/allorders', canActivate:[authGuard]},
    {path:'chackout/:cartId', component:ChackoutComponent ,title:'fresh cart/checkout', canActivate:[authGuard]},
    {path:'forgot-Password', component:ForgotPasswordComponent ,title:'fresh cart/forgot-Password'},
    {path:'**', component:NotFoundComponent, title:'fresh cart'}
]
