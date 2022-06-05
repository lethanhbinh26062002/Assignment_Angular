import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;

  constructor(
    private productService: ProductService, // các phương thức call API
    private router: Router, // điều hướng
    private activateRoute: ActivatedRoute
  ) {
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
      description: new FormControl('',[
        Validators.required,
      ])
    });
    this.productId = '';
  }

  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.params['id']; // +'5'

    if (this.productId) {
      this.productService.getProduct(+this.productId).subscribe(data => {
        // Cập nhật data cho form (data: {id: 5, name: '...'})
        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          description: data.description
          // price: data.price
        });
      })
    }
  }
  onValidateNameHasProduct (control: AbstractControl): ValidationErrors|null {
    const inputValue = control.value;

    if (!inputValue.includes('product')) {
      return {hasProductError: true};
    }

    return null;
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
        this.redirectToList();
      })
    }
    
    const data = {...this.productForm.value,status:1};
    // 2. Call API tạo mới
    return this.productService.createProduct(data).subscribe(data => {
      // 3. Quay lại danh sách product
      this.redirectToList();
      // 3.1 Khi đã quay về list thì ngOnInit trong list sẽ lại được chạy và call API
      // lấy ds mới
    })
  }
}
