import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/type/Category';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {

  categorys: Category[];

  // Định nghĩa service dưới tên 1 biến, đã tạo bên services
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService) {
    this.categorys = [];
  }

  // Khi component render xong sẽ chạy 1 lần vào ngOnInit
  ngOnInit(): void {
    this.onGetList();
  }
  // Lấy ds sẽ được gọi khi lần đầu render và khi xoá mỗi phần tử
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.categoryService.getCategorys().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.categorys = data;
    });
  }
  onUpdateStatus(categoryId: string, newStatus: number) {
    this.categoryService.updateCategory(categoryId, {
      status: newStatus
    }).subscribe(data => {
      this.onGetList();
      this.toastr.success('Thay đổi status thành công', 'Success');
    });
  }
  onDelete(id: string) {
    // confirm
    const confirmDeleteCategory = confirm('Bạn có chắc chắn xoá danh mục này không?');
    if(confirmDeleteCategory){
      const confirmDeleteProductByCategory = confirm('Nếu xóa nó thì các sản phẩm thuộc danh mục này cũng sẽ bị xóa.          Bạn chắc chứ ?')
        // kiểm tra dữ liệu => xoá
        if (confirmDeleteCategory && confirmDeleteProductByCategory && id) {
          this.categoryService.deleteCategory(id).subscribe((data) => {
            this.toastr.success('Xóa danh mục thành công', 'Success');
            this.toastr.info('Đã xóa sản phẩm thuộc danh mục', 'Success');
            // Cập nhật lại danh sách
            this.onGetList();
          })
        }
    }
  }
}
