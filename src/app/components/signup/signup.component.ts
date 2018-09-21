import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../services/common/loader.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private loader: LoaderService, private login: LoginService, private router: Router) { }

  ngOnInit() {
    this.initiateForm()
  }
  initiateForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['']
    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password, name } = this.signupForm.controls;
      this.loader.shown();
      this.login.signup(username.value, password.value, name.value).subscribe((v) => {
        this.login.login(username.value, password.value).subscribe((v) => {
          this.loader.hide();
          if (v.accessToken) {
            localStorage.setItem('access_token', `Bearer ${v.accessToken}`);
            this.router.navigate(['/transactions']);
          } else {
            this.router.navigate(['/login'])
          }
        })
      });
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
