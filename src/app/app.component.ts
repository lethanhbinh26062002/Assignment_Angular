import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_SP22';
  name = 'Binhltph16803';
  id = 'PH16803';
  teachers = [
    {
      id: 1,
      name: "John",
      age: 30,
      gender: 0,
      avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/3-8.png",
      status:0
    },
    {
      id: 2,
      name: "John",
      age: 35,
      gender: 1,
      avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/3-8.png",
      status:1
    },
    {
      id: 3,
      name: "Binh",
      age: 32,
      gender: 1,
      avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/3-8.png",
      status:1
    },
    {
      id: 4,
      name: "Dung",
      age: 26,
      gender: 1,
      avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/3-8.png",
      status:0
    }
  ]
  // Định nghĩa hàm
  schoolName = "";
  clickH1(){
    console.log("Đã click");
    this.schoolName = 'Poly';
  }
  status = true;
  changeStatus(){
    this.status = !this.status
  }
  valueInput = '';
  changeInput(event: any){
    this.valueInput = event.target.value
  }

  //Hàm nhận giá trị từ Input
  inputValue = {
    name: '', 
    age: '',
    gender: '',
    avatar: '',
    status: '',
  } 
  // onInputName(event: any,info : string) {
  //   console.log(event.target.value, info);
  //   this.inputValue['name'] = event.target.value
    
  // }
  // onInputAge(event: any,info : string) {
  //   console.log(event.target.value, info);
  //   this.inputValue['age'] = event.target.value
    
  // }
  onInput(event: any, key : 'name' | 'age' | 'gender' | 'avatar' | 'status'){ // key: 'name','age' -> key chỉ đc là giá trị thuộc inputValue
    this.inputValue[key] = event.target.value
  }
  submitForm() {
    console.log(this.inputValue);
    //Thêm dữ liêu từ form vào mảng teacher
    this.teachers.push({
      ...this.inputValue,
      age: +this.inputValue.age, // đưa age từ chuỗi về số
      gender: +this.inputValue.gender,
      status: + this.inputValue.status,
      id: this.teachers.length + 1
    })
    // Cập nhật lại giá trị cho form 
    this.inputValue = {
      name:'',
      age: '',
      gender: '',
      avatar: '',
      status: '',
    }
  }
}
