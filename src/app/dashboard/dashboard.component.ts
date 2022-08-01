import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../helpers/layout.service';
import { Users, UserInformation } from '../helpers/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo: UserInformation;
  status:any;
  isEditable: boolean = true;

  constructor(private layout: LayoutService, private router: Router, private toastr: ToastrService) {
    this.userInfo = {} as UserInformation;
   }

  ngOnInit(): void {
    this.layout.getUserList().subscribe(( response: UserInformation) => {
      console.log(response);
      this.userInfo.data = response?.data?.map((item) => {
        var user = {} as Users;
        user.avatar = item?.avatar;
        user.email = item?.email;
        user.first_name = item?.first_name;
        user.last_name = item?.last_name;
        user.id = item?.id;
        return user;
      });
    });

  }
logOut(){}
deleteUser(user){
  this.layout.deleteUserList().subscribe(() =>{
    this.status = this.userInfo.data.splice(user, 1);
    this.toastr.warning('This user is deleted', '', {positionClass:'toast-top-center', closeButton: true, timeOut: 3000})
    console.log(this.status);
  });
}
updateUser(item){
  this.layout.updateList(item.name, item.job).subscribe(()=>{
    // this.userInfo.data = response?.data?.map(()=>{
      item.isEditable = !item.isEditable;
    // })
    });
  }
  addUser(item: any){
    this.layout.addUserList(item.id).subscribe(()=>{
    const randomElement = Math.floor(Math.random() * this.userInfo.data.length);
    this.userInfo.data.push(this.userInfo.data[randomElement]);
  });
  }
  cancelUpdate(item){
    item.isEditable = !item.isEditable;
  }
  saveData(item){
    this.layout.updateList(item.name, item.job).subscribe(()=>{
      if(this.userInfo.data !== item.name && this.userInfo.data !== item.job){
        // var res = confirm('Are you sure?');
    if(item !== null) {
      item.isEditable = !item.isEditable;
      console.log(item);
      confirm('Are you sure?');
      this.toastr.info('Data is Saved...', '',{positionClass:'toast-top-center', closeButton: true, timeOut: 3000})
    }
    }
  });
  }
}
