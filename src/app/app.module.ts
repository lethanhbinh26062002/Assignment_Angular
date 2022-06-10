import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowValidateComponent } from './components/show-validate/show-validate.component';
import { FormsModule } from '@angular/forms';
import { LayoutsComponent } from './layouts/layouts.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminProductDetailComponent } from './page/admin/admin-product/admin-product-detail/admin-product-detail.component';
import { AdminProductListComponent } from './page/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './page/admin/admin-product/admin-product-form/admin-product-form.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUserDetailComponent } from './page/admin/admin-user/admin-user-detail/admin-user-detail.component';
import { AdminUserListComponent } from './page/admin/admin-user/admin-user-list/admin-user-list.component';
import { AdminUserFormComponent } from './page/admin/admin-user/admin-user-form/admin-user-form.component';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCategoryDetailComponent } from './page/admin/admin-category/admin-category-detail/admin-category-detail.component';
import { AdminCategoryListComponent } from './page/admin/admin-category/admin-category-list/admin-category-list.component';
import { AdminCategoryFormComponent } from './page/admin/admin-category/admin-category-form/admin-category-form.component';
import { HomePageComponent } from './page/client/home-page/home-page.component';
import { ProductDetailPageComponent } from './page/client/product-detail-page/product-detail-page.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { ProductCategoryComponent } from './page/client/product-category/product-category.component';
import { CartComponent } from './components/cart/cart.component';
import { CartPageComponent } from './page/client/cart-page/cart-page.component';
import { LoginComponent } from './page/client/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowValidateComponent,
    LayoutsComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    AdminProductDetailComponent,
    AdminProductListComponent,
    AdminProductFormComponent,
    AdminUserDetailComponent,
    AdminUserListComponent,
    AdminUserFormComponent,
    AdminCategoryDetailComponent,
    AdminCategoryListComponent,
    AdminCategoryFormComponent,
    HomePageComponent,
    ProductDetailPageComponent,
    ErrorPageComponent,
    ProductCategoryComponent,
    CartComponent,
    CartPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, // FormsModule đc sử dụng trong các component đã  có bên trên
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
