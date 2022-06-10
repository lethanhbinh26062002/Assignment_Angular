import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Product, ProductCart } from 'src/app/type/Product';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  products: ProductCart[];
  constructor(
    private lsService: LocalStorageService,
  ) { 
    this.products = []
  }

  ngOnInit(): void {
    this.lsService.getItem().subscribe((data: ProductCart[]) => {
      this.products = data;
      console.log(data);
    })
  }

}
