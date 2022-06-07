import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent implements OnInit {

  userForm: FormGroup;
  userId: string;

  constructor(
    private userService: UserService,
    private router: Router, // điều hướng
    private activateRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.userForm = new FormGroup({
      // name: new FormControl('', Validators.required), // FormControl(giá trị mặc định)
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        // this.onValidateNameHasProduct 
      ]), // FormControl(giá trị mặc định)
      email: new FormControl('',[    
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
      ])
    });
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['id']; // +'5'

    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(data => {
        // Cập nhật data cho form (data: {id: 5, name: '...'})
        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          password: data.password
        });
      })
    }
  }

  redirectToList() {
    this.router.navigateByUrl('/admin/users');
  }
  onSubmit() {
    const dataUpdate = this.userForm.value
    if (this.userId !== '' && this.userId !== undefined) {
      return this.userService.updateUser(this.userId, dataUpdate).subscribe(data => {
        this.redirectToList();
      })
    }
    
    const data = {...this.userForm.value,status:1};
    // 2. Call API tạo mới
    return this.userService.createUser(data).subscribe(data => {
      this.toastr.success('Thêm user thành công', 'Success');
      this.redirectToList();
    })
  }
}
