import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminProductDetailComponent } from './page/admin/admin-product/admin-product-detail/admin-product-detail.component';
import { AdminProductFormComponent } from './page/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './page/admin/admin-product/admin-product-list/admin-product-list.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
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
          }, // đẩy /admin/products/id xuống dưới cùng tránh việc nhầm id = 'create'
        ]
      }
    ]
  },
  {
    path: '',
    component:ClientLayoutComponent,
    children: [

    ]
  }
  // 1. Nếu có children thì ko sử dụng component để render
  // 2. Nếu vẫn muốn sd component(khung layout) thì trong component thì phải sd <router-outlet></router-outlet>
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
