import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public formgroup: FormGroup;
    public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    public validation_messages;
  constructor(public formBuilder: FormBuilder,
              public auth: AuthService) { }

  ngOnInit() {
      this.formgroup = this.formBuilder.group({
          email: ['', Validators.compose([
              Validators.required,
              Validators.pattern(this.EMAILPATTERN)])],
          password: ['',
              Validators.compose([
                  Validators.required,
                  Validators.maxLength(12),
                  Validators.minLength(5),
                  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]
              )]
      });
      this.validation_messages = {
          'email': [
              { type: 'required', message: 'Email is required' },
              { type: 'pattern', message: 'Enter a valid email' }
          ],
          'password': [
              { type: 'required', message: 'Password is required' },
              { type: 'minlength', message: 'Password must be at least 5 characters long' },
              { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
          ]
      };
  }
    get email() { return this.formgroup.get('email'); }
    get password() { return this.formgroup.get('password'); }

    checkData() {
      this.auth.loginUser(this.email.value, this.password.value).subscribe(
          value => {
              console.log(value);
          },
          error => {
              console.log(error);
          }
      );
    }

}
