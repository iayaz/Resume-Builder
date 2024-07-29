import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/formCall/form.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
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
    console.log('Form Data:', this.form.value);
    this.formService.compilepdf(this.form.value).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
