import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/Product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css',
    "../../../../assets/client/css/bootstrap.css",
    "../../../../assets/client/css/bootstrap-responsive.css",
    "../../../../assets/client/css/prettyPhoto.css",
    "../../../../assets/client/css/flexslider.css",
    "../../../../assets/client/css/custom-styles.css"]
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
      const filteredArray = data.filter(function(item){
        return item.status !== 0;
      });
      console.log(filteredArray);
      this.products = filteredArray;
    });
  }
}
