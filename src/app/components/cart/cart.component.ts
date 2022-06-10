import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductCart } from 'src/app/type/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: ProductCart[];
  cartItemValues: number = 0;
  constructor(private lsService: LocalStorageService) {
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.onSetCart();
    // Khi setItem được chạy, thì next('') cũng được chạy -> có thể subscribe được
    this.lsService.watchStorage().subscribe(data => {
      this.onSetCart();
    })
  }

  onSetCart() {
    this.cartItems = this.lsService.getItem();
    // this.cartItemValues = 0;
    // this.cartItems.forEach(item => {
    //   this.cartItemValues += item.value;
    // })
    this.cartItemValues = this.cartItems.reduce((a, b) => a + b.value, 0);
  }
}
