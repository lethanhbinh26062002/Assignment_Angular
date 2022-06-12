import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    public toastr: ToastrService
  ) {
    localStorage.removeItem('loggedInUser');
    this.toastr.warning('Log Out thành công', 'Warning');
    setTimeout(() => {
      this.router.navigateByUrl('');
    },1)
    
   }

  ngOnInit(): void {
  }

}
