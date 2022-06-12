import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/type/Category';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: [
    './client-layout.component.css',
    "../../../assets/client/css/bootstrap.css",
    "../../../assets/client/css/bootstrap-responsive.css",
    "../../../assets/client/css/prettyPhoto.css",
    "../../../assets/client/css/flexslider.css",
    "../../../assets/client/css/custom-styles.css"
]
})
export class ClientLayoutComponent implements OnInit {
  categorys: Category[];
  @Input() role:number
  @Input() name:string
  @Input() log:boolean = false
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public toastr: ToastrService) {
    this.categorys = [];
    this.role = 0;
    this.name = '';
  }
  // Khi component render xong sẽ chạy 1 lần vào ngOnInit
  ngOnInit(): void {
    this.onGetList();
    this.checkRole()
  }

  // Lấy ds sẽ được gọi khi lần đầu render và khi xoá mỗi phần tử
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.categoryService.getCategorys().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.categorys = data;
    });
  }
  checkRole(){
    const User = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
    if(User){
      const roleUser = User.user.role
      const nameUser = User.user.name
      this.name = nameUser;
      this.role = roleUser;
    }
    if(User){
      this.log = true
    }
  }
}
