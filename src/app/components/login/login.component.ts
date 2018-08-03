import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValid = true;
  loginForm: FormGroup;
  showSpinner = false;
  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['']
    });
  }

  onSubmit() {
    this.showSpinner = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(resp => {
        this.showSpinner = false;
        if (resp.accessToken) {
          localStorage.setItem('access_token', `Bearer ${resp.accessToken}`);
          this.router.navigate(['/transactions']);
        } else {
          this.router.navigate(['login']);
        }
      });
    } else {
      this.showSpinner = false;
    }
  }
}
