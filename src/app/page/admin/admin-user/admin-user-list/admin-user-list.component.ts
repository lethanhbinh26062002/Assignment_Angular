import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/type/User';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users: User[];

  // Định nghĩa service dưới tên 1 biến, đã tạo bên services
  constructor(
    private userService: UserService,
    private toastr: ToastrService) {
    this.users = [];
  }

  // Khi component render xong sẽ chạy 1 lần vào ngOnInit
  ngOnInit(): void {
    this.onGetList();
  }
  // Lấy ds sẽ được gọi khi lần đầu render và khi xoá mỗi phần tử
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.userService.getUsers().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.users = data;
    });
  }
  onUpdateStatus(userId: string, newStatus: number) {
    this.userService.updateUser(userId, {
      status: newStatus
    }).subscribe(data => {
      this.onGetList();
      this.toastr.success('Thay đổi status thành công', 'Success');
    });
  }
  onUpdateRole(userId: string, newRole: number) {
    this.userService.updateUser(userId, {
      role: newRole
    }).subscribe(data => {
      this.onGetList();
      this.toastr.success('Thay đổi role thành công', 'Success');
    });
  }
  onDelete(id: string) {
    // confirm
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    // kiểm tra dữ liệu => xoá
    if (confirmDelete && id) {
      this.userService.deleteUser(id).subscribe((data) => {
        this.toastr.success('Xóa user thành công', 'Success');
        // Cập nhật lại danh sách
        this.onGetList();
      })
    }

  }
}
