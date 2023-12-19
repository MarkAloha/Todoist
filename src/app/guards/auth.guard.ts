import { AuthService } from './../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,  Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(route.routeConfig?.path)

  // if (!this.authService.isLoggedIn()) {
  //   this.router.navigate(['login'])
  //   return false
  // }
  return true
};
