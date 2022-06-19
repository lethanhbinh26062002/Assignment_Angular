import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',
      [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('',
      [
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // 1. Nhận dữ liệu từ form và call API login
    this.authService.login(this.loginForm.value).subscribe(data => {
      // 2. Lưu thông tin user vào localStorage: setItem(tên key lưu vào ls, dữ liệu string)
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      //3 check role === 1 
      const User = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
      if(User.user.role === 1 && User.user.status === 1) {
        this.toastr.success('Login admin thành công', 'Success');
        this.router.navigateByUrl('/admin/products');
      }else if(User.user.role === 0 && User.user.status === 1){
        this.toastr.success('Login user thành công', 'Success');
        this.router.navigateByUrl('');
      }else if(User.user.role === 0 || User.user.role === 1 && User.user.status === 0){
        this.toastr.error('Tài khoản đã bị vô hiệu hóa. Đăng nhập tài khoản khác hoặc đăng ký mới', 'Error')
        this.router.navigateByUrl('/login');
      }
    });
  }
  checkRole() {
    const User = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
    if(User.user.role === 1) {
      this.router.navigateByUrl('/admin/products');
    }
  }

}
