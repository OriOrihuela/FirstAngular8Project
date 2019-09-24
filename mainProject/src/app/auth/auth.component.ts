import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

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
    this.isLoading = true;
    if (this.isLoginMode) {
      /* ... */
    } else {
      this.authService.signUp(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        error => {
          this.error = "An error occurred!";
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}
