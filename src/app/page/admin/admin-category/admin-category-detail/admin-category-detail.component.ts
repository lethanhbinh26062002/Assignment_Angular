import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/type/Category';

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css']
})
export class AdminCategoryDetailComponent implements OnInit {

  category: Category;

  constructor(
    private categoryService: CategoryService,
    private activateRoute: ActivatedRoute
  ) {
    this.category = {
      _id: '',
      name: '',
      status: 0,
    };
  }

  ngOnInit(): void {
    // ActivateRoute sẽ có thể đọc biến được truyền vào trên url
    // tên id được định nghĩa ở app-routing :id
    const idFromUrl = this.activateRoute.snapshot.params['id'];

    this.categoryService.getCategory(idFromUrl).subscribe(data => {
      this.category = data;
    })
  }

}
