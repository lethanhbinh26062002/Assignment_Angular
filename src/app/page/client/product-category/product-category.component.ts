import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/type/Category';
import { Product } from 'src/app/type/Product';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css',
  "../../../../assets/client/css/bootstrap.css",
  "../../../../assets/client/css/bootstrap-responsive.css",
  "../../../../assets/client/css/prettyPhoto.css",
  "../../../../assets/client/css/flexslider.css",
  "../../../../assets/client/css/custom-styles.css"]
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
      const filteredArray = data.filter(function(item){
        return item.status !== 0;
      });
      console.log(filteredArray);
      this.products = filteredArray;
    });
  }
}
