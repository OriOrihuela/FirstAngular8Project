import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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

  /**
   * CONSTRUCTOR
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * BEHAVIOURS
   */
  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7cXe5AY5NWIZbqV0T50fNGqu5uM06pC0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7cXe5AY5NWIZbqV0T50fNGqu5uM06pC0",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string;
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
        errorMessage = "An unknown error occurred!";
        break;
    }
    return throwError(errorMessage);
  }
}
