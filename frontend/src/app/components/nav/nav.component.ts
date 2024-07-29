import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/auth/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private http: AuthserviceService, private router: Router) {}
  logout() {
    this.http.logout();
    this.router.navigateByUrl('');
  }
}
