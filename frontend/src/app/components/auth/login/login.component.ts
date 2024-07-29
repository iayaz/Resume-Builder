import { AuthserviceService } from './../../../services/auth/authservice.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthserviceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: (v) => this.router.navigateByUrl('home'),
      error: ({error}) => window.alert(error.msg),
  });
  }

  navigateToSignup() {
    this.router.navigateByUrl('signup');
  }
}
