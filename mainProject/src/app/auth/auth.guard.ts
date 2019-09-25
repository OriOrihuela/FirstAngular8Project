import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  /**
   * PROPERTIES
   */

  /**
   * CONSTRUCTOR
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * GETTERS
   */
  getAuthService() {
    return this.authService;
  }

  getRouter() {
    return this.router;
  }

  /**
   * BEHAVIOURS
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getAuthService().user.pipe(take(1),
      map(user => {
        const isAuth = !user ? false : true;
        if (isAuth) {
          return true;
        }
        return this.getRouter().createUrlTree(["/auth"]);
      })
    );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
