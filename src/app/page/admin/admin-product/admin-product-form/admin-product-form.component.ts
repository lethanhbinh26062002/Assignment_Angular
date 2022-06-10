import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import {ToastrService} from 'ngx-toastr'
import { Category } from 'src/app/type/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  categorys: Category[];

  constructor(
    private productService: ProductService, // các phương thức call API
    private router: Router, // điều hướng
    private activateRoute: ActivatedRoute,
    public toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.categorys = [];
    this.productForm = new FormGroup({
      // name: new FormControl('', Validators.required), // FormControl(giá trị mặc định)
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        // this.onValidateNameHasProduct 
      ]), // FormControl(giá trị mặc định)
      price: new FormControl(0,[    
        Validators.required,
        Validators.min(0),
      ]),
      sale_price: new FormControl(0,[
        Validators.required,
        Validators.min(0),
      ]),
      category: new FormControl({},[
        Validators.required,
      ]),
      description: new FormControl('',[
        Validators.required,
      ])
    });
    this.productId = '';
  }

  ngOnInit(): void {
    this.onGetList();
    this.productId = this.activateRoute.snapshot.params['id']; // +'5'

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(data => {
        // Cập nhật data cho form (data: {id: 5, name: '...'})
        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          sale_price: data.sale_price,
          description: data.description
        });
      })
    }
  }
  redirectToList() {
    this.router.navigateByUrl('/admin/products');
  }
  onSubmit() {
    const dataUpdate = this.productForm.value
    // console.log(this.productForm.value);
    // 1. nhận dữ liệu từ form => this.productForm.value
    if (this.productId !== '' && this.productId !== undefined) {
      return this.productService.updateProduct(this.productId, dataUpdate).subscribe(data => {
        this.toastr.success('Sửa thành công', 'Success');
        this.redirectToList();
      })
    }
    
    const data = {
      ...this.productForm.value,
      status:1
    };
    // 2. Call API tạo mới
    return this.productService.createProduct(data).subscribe(data => {
      this.toastr.success('Thêm thành công', 'Success');
      // 3. Quay lại danh sách product
      this.redirectToList();
      // 3.1 Khi đã quay về list thì ngOnInit trong list sẽ lại được chạy và call API
      // lấy ds mới
    })
  }
  // Lấy ds sẽ được gọi khi lần đầu render và khi xoá mỗi phần tử
  onGetList() {
    // Lắng nghe API trả về kq, bao giờ trả về xong thì data sẽ có dữ liệu
    this.categoryService.getCategorys().subscribe((data) => {
      // Khi có dữ liệu sẽ gán về cho danh sách
      this.categorys = data;
      console.log(data );
    });
  }
}
