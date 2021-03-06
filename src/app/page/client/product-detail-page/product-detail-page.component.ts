import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/Product';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: [
    './product-detail-page.component.css',
    "../../../../assets/client/css/bootstrap.css",
    "../../../../assets/client/css/bootstrap-responsive.css",
    "../../../../assets/client/css/prettyPhoto.css",
    "../../../../assets/client/css/custom-styles.css"
  ]
})
export class ProductDetailPageComponent implements OnInit {
  product: Product;
  cartValue: number;
  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private lsService: LocalStorageService,
    public toastr: ToastrService,
  ) {
    this.product = {
      _id: '',
      name: '',
      price: 0,
      sale_price: 0,
      category:'',
      description: '',
      status: 0,
    };
    this.cartValue = 1;
   }
  ngOnInit(): void {
    // ActivateRoute sẽ có thể đọc biến được truyền vào trên url
    // tên id được định nghĩa ở app-routing :id
    const idFromUrl = this.activateRoute.snapshot.params['id'];

    this.productService.getProduct(idFromUrl).subscribe(data => {
      this.product = data;
    })
  }
  onChangeCartValue(event: any) {
    this.cartValue = event.target.value;
  }
  onAddToCart() {
    const addItem = {
      ...this.product,
      value: +this.cartValue
    };
    this.lsService.setItem(addItem);
    this.cartValue = 1;
    this.toastr.success('Thêm vào giỏ hàng thành công', 'Success')

  }

}
