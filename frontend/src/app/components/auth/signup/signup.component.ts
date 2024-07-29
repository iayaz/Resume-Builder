import { AuthserviceService } from './../../../services/auth/authservice.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthserviceService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // console.log(this.signupForm.value);
    const { name, email, password } = this.signupForm.value;
    this.auth.register(name, email, password).subscribe({
      next: ({ msg }) => {
        window.alert(msg);
        this.router.navigateByUrl('');
      },
      error: ({ error }) => window.alert(error.msg),
    });
  }
}
