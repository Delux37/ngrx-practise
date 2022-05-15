import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../features/home/models/user.model';
import { map, Observable } from 'rxjs';
import { getActiveUser } from '../features/home/state/home.reducer';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(getActiveUser)
      .pipe(
        map(state => {
          if(!!state){
            return true;
          }

          this.router.navigate(['']);
          return false;
          
        })
      )
      
  }
  
}
