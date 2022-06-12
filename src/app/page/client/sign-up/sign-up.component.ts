import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('',
      [
        Validators.required, 
        Validators.minLength(6)
      ]),
      email: new FormControl('',
      [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // 1. Nhận dữ liệu từ form và call API login
      const data = this.signUpForm.value
      // 2. Call API tạo mới
      return this.userService.signup(data).subscribe(data => {
        this.toastr.success('Đăng ký thành công', 'Success');
        this.router.navigateByUrl('/login');
      })
  }
}
