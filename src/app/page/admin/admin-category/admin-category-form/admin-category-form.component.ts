import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.css']
})
export class AdminCategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  categoryId: string;

  constructor(
    private categoryService: CategoryService, // các phương thức call API
    private router: Router, // điều hướng
    private activateRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
    this.categoryId = '';
  }

  ngOnInit(): void {
    this.categoryId = this.activateRoute.snapshot.params['id']; // +'5'

    if (this.categoryId) {
      this.categoryService.getCategory(this.categoryId).subscribe(data => {
        this.categoryForm.patchValue({
          name: data.name,
        });
      })
    }
  }
  redirectToList() {
    this.router.navigateByUrl('/admin/categorys');
  }
  onSubmit() {
    const dataUpdate = this.categoryForm.value
    if (this.categoryId !== '' && this.categoryId !== undefined) {
      return this.categoryService.updateCategory(this.categoryId, dataUpdate).subscribe(data => {
        this.redirectToList();
      })
    }
    
    const data = {...this.categoryForm.value,status:1};
    // 2. Call API tạo mới
    return this.categoryService.createCategory(data).subscribe(data => {
      this.toastr.success('Thêm thành công', 'Success');
      // 3. Quay lại danh sách product
      this.redirectToList();
      // 3.1 Khi đã quay về list thì ngOnInit trong list sẽ lại được chạy và call API
      // lấy ds mới
    })
  }
}
