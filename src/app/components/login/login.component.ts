import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MessagesService } from '../../services/messages.service';
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
  constructor(private loginService: LoginService,
    private msgs: MessagesService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(resp => {
        if (resp.accessToken) {
          localStorage.setItem('access_token', `Bearer ${resp.accessToken}`);
          this.router.navigate(['/transactions']);
        } else {
          this.msgs.showAlert({ severity: 'danger', text: 'Error logging in', module: 'login' });
        }
      });
    } else {

    }
  }
  isControlInvalid(control) {
    const ctrl = this.loginForm.controls[control];
    return ctrl.invalid && !ctrl.pristine;
  }

}
