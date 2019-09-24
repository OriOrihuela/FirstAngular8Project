import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData {
  /**
   * PROPERTIES
   */
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
    return this.httpClient.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7cXe5AY5NWIZbqV0T50fNGqu5uM06pC0",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
