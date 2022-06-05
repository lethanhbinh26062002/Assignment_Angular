import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../type/Product';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  products: Product[];

  // Định nghĩa service dưới tên 1 biến, đã tạo bên services
  constructor(private productService: ProductService) {
    this.products = [];
  }

  // Khi component render xong sẽ chạy 1 lần vào ngOnInit
  ngOnInit(): void {
    this.onGetList();
  }
  // Lấy ds sẽ được gọi khi lần đầu render và khi xoá mỗi phần tử
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.productService.getProducts().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.products = data;
    });
  }
  onUpdateStatus(productId: number, newStatus: number) {
    this.productService.updateProduct(`${productId}`, {
      status: newStatus
    }).subscribe(data => {
      this.onGetList();
    });
  }
  onDelete(id: string | number) {
    // confirm
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    // kiểm tra dữ liệu => xoá
    if (confirmDelete && id) {
      this.productService.deleteProduct(id).subscribe((data) => {
        // Cập nhật lại danh sách
        this.onGetList();
      })
    }

  }

}
