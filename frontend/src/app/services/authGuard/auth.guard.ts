import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../auth/authservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;
  else return router.createUrlTree(['/login']);
};
