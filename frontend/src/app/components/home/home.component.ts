import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      tenPercent: ['', Validators.required],
      twelvePercent: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: ['', Validators.required],
      achievements: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      
    } else {
      console.log('Form is invalid');
    }
  }
}
