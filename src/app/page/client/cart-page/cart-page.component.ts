import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductCart } from 'src/app/type/Product';

@Component({ 
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  products: ProductCart[];
  constructor(
    public toastr: ToastrService,
  ) { 
    this.products = []
  }

  ngOnInit(): void {
    this.onGetCart();
  }
  onGetCart(): void {
    const Cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.products = Cart
  }
  onDelete(id: string): void {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if(confirmDelete && id){
      const result = JSON.parse(localStorage.getItem('cart') || '[]');
      const newData = result.filter((x: any) => x._id !== id);
      localStorage.setItem('cart', JSON.stringify(newData));
      this.toastr.success('Xóa thành công', 'Success');
    }
    this.onGetCart()
  }

}
