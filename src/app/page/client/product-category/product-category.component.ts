import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/type/Category';
import { Product } from 'src/app/type/Product';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute
  ) { 
    this.products = [];
  }
  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    const idFromUrl = this.activateRoute.snapshot.params['id'];
    this.productService.getProductsByCategory(idFromUrl).subscribe((data) => {
      this.products = data;
    });
  }
}
