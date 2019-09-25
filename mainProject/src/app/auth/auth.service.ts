import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  /**
   * PROPERTIES
   */
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  /**
   * PROPERTIES
   */
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  /**
   * CONSTRUCTOR
   */
  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * GETTERS
   */
  getHttpClient() {
    return this.httpClient;
  }

  getRouter() {
    return this.router;
  }

  getTokenExpirationTimer() {
    return this.tokenExpirationTimer;
  }

  /**
   * BEHAVIOURS
   */
  signUp(email: string, password: string) {
    return this.getHttpClient()
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7cXe5AY5NWIZbqV0T50fNGqu5uM06pC0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.getHttpClient()
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7cXe5AY5NWIZbqV0T50fNGqu5uM06pC0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );
    if (loadedUser.getToken()) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.getRouter().navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.getTokenExpirationTimer()) {
      clearTimeout(this.getTokenExpirationTimer());
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = "An unknown error occurred!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage =
          "No account found. Check if you entered your email correctly or sign up!";
        break;
      case "INVALID_PASSWORD":
        errorMessage =
          "Invalid password. Please check your password and try again!";
        break;
      case "USER_DISABLED":
        errorMessage =
          "The user account has been disabled by an administrator.";
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
