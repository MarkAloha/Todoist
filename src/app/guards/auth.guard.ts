import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';


// const authService = new AuthService (router)

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authService = inject(AuthService);
  const router = inject(Router)

  if (!authService.isLoggedIn()) {
    router.navigate(['login']);
    return false;
  } else {
  return true;
  }
};
