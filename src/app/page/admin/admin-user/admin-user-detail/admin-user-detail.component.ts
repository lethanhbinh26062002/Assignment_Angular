import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/type/User';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {
    this.user = {
      _id: '',
      name: '',
      email: '',
      password: '',
      status: 0,
    };
  }

  ngOnInit(): void {
    // ActivateRoute sẽ có thể đọc biến được truyền vào trên url
    // tên id được định nghĩa ở app-routing :id
    const idFromUrl = this.activateRoute.snapshot.params['id'];

    this.userService.getUser(idFromUrl).subscribe(data => {
      this.user = data;
    })
  }
}
