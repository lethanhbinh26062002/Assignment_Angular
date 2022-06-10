import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/type/Category';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  categorys: Category[];
  constructor(
    private categoryService: CategoryService) {
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
}
