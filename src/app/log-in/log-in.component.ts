import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LayoutService } from '../helpers/layout.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
display: false | any;
formData: FormGroup;
// isDisabled:boolean = false;
userType: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private layoutService: LayoutService) { }

  ngOnInit(): void {

  this.formData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    checkbox: [false, Validators.requiredTrue]
})
// this.formData.valueChanges.subscribe((v) => {
//   this.isDisabled = !this.formData.valid;
// })
this.layoutService.getUserList().subscribe((res:any)=> {
  console.log(res);
})

  }
  get f() { return this.formData.controls; }


onSubmit(){
  this.display = true;
  console.log(this.userType);
  if(this.formData.valid){
    this.userType = JSON.parse(localStorage.getItem('userType'));
  if(this.formData.value.email == this.userType.email && this.formData.value.password == this.userType.password) {
    this.toastr.success('Login Successful','', {positionClass:'toast-top-center', closeButton: true, timeOut: 3000});
    this.router.navigate(['/dashboard']);
  }
  else {
    this.toastr.error('Login Unsuccessful', 'Check Credentials', {positionClass:'toast-top-center', closeButton: true, timeOut: 3000});
  }
}
  console.log(this.formData.valid);
}
}
