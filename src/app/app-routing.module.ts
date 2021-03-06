import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CanAccessAdminGuard } from './guards/can-access-admin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AdminCategoryDetailComponent } from './page/admin/admin-category/admin-category-detail/admin-category-detail.component';
import { AdminCategoryFormComponent } from './page/admin/admin-category/admin-category-form/admin-category-form.component';
import { AdminCategoryListComponent } from './page/admin/admin-category/admin-category-list/admin-category-list.component';
import { AdminProductDetailComponent } from './page/admin/admin-product/admin-product-detail/admin-product-detail.component';
import { AdminProductFormComponent } from './page/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './page/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminUserDetailComponent } from './page/admin/admin-user/admin-user-detail/admin-user-detail.component';
import { AdminUserFormComponent } from './page/admin/admin-user/admin-user-form/admin-user-form.component';
import { AdminUserListComponent } from './page/admin/admin-user/admin-user-list/admin-user-list.component';
import { CartPageComponent } from './page/client/cart-page/cart-page.component';
import { HomePageComponent } from './page/client/home-page/home-page.component';
import { LoginComponent } from './page/client/login/login.component';
import { LogoutComponent } from './page/client/logout/logout.component';
import { ProductCategoryComponent } from './page/client/product-category/product-category.component';
import { ProductDetailPageComponent } from './page/client/product-detail-page/product-detail-page.component';
import { SignUpComponent } from './page/client/sign-up/sign-up.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [CanAccessAdminGuard],
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            component: AdminProductListComponent
          },
          {
            path: 'create',
            component: AdminProductFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminProductFormComponent
          },
          {
            path: ':id',
            component: AdminProductDetailComponent
          }, // ?????y /admin/products/id xu???ng d?????i c??ng tr??nh vi???c nh???m id = 'create'
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component:AdminUserListComponent
          },
          {
            path: 'create',
            component:AdminUserFormComponent
          },
          {
            path: 'edit/:id',
            component:AdminUserFormComponent
          },
          {
            path: ':id',
            component:AdminUserDetailComponent
          }
        ]
      },
      {
        path: 'categorys',
        children: [
          {
            path: '',
            component:AdminCategoryListComponent
          },
          {
            path: 'create',
            component: AdminCategoryFormComponent
          },
          {
            path: 'edit/:id',
            component: AdminCategoryFormComponent
          },
          {
            path: ':id',
            component: AdminCategoryDetailComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    component:ClientLayoutComponent,
    children:[
      {
        path: '',
        component:HomePageComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailPageComponent,
      },
      {
        path: 'products/proCate/:id',
        component:ProductCategoryComponent,
      },
      {
        path:'cart',
        component:CartPageComponent,
      },
    ]
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'signup',
    component:SignUpComponent,
  },
  {
    path: '403',
    component:ErrorPageComponent,
  },
  {
    path: 'logout',
    component:LogoutComponent
  }
  // 1. N???u c?? children th?? ko s??? d???ng component ????? render
  // 2. N???u v???n mu???n sd component(khung layout) th?? trong component th?? ph???i sd <router-outlet></router-outlet>
  // {
  //   path: 'users',
  //   component: UserComponent,
  //   children:[
  //     {
  //       path: 'create',
  //       component:UserFormComponent
  //     },
  //     {
  //       path: 'list',
  //       component:UserListComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanAccessAdminGuard]
})
export class AppRoutingModule { }
