import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/Product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductService,
  ) { 
    this.products = [];
  }

  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.productService.getProducts().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.products = data;
    });
  }
}
