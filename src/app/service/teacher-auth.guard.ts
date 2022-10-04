import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private routes: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('username')
      && localStorage.getItem('role') == "teacher") {
      return true;
    } else {
      this.routes.navigate([''])
      return false;
    }
  }

}
