import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
// import { CustomValidators } from '../providers/customValidators';
import { MustMatch } from '../providers/must-match.validators';
@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {
display = false;
formData: FormGroup;
isDisabled: boolean = true;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkbox: [false, Validators.requiredTrue],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
   validator: MustMatch('password', 'confirmPassword')
  });
  // this.formData.valueChanges.subscribe((v) => {
  //   this.isDisabled = !this.formData.valid;
  // });

   }

  ngOnInit(): void {}

  get f() {
    return this.formData.controls;
  }
onSubmit() {
  this.display = true;
  console.log(this.formData.value);
  if(this.formData.valid) {
    localStorage.setItem('userType', JSON.stringify(this.formData.value));
    this.toastr.success('Registration Successful','', {positionClass:'toast-top-center', closeButton: true, timeOut: 3000});
    this.router.navigate(['/log-in']);
  }
}
onReset() {
  this.display = false;
  this.formData.reset();
}
}
