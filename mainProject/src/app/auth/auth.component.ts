import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  /**
   * PROPERTIES
   */
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  form: FormGroup;

  /**
   * CONSTRUCTOR
   */
  constructor(private authService: AuthService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    this.isLoginMode ? authObservable = this.authService.login(email, password) : authObservable = this.authService.signUp(email, password);
    authObservable.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}