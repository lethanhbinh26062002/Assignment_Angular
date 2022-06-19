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

  constructor(
    private userService: UserService,
    private toastr: ToastrService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.onGetList();
  }
  
  onGetList() {
    const UserLoacl = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
    this.userService.getUsers().subscribe((data) => {
      const filteredArray = data.filter(function(user){
        return user._id !== UserLoacl.user._id;
      });
      console.log(filteredArray);
      this.users = filteredArray;
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
