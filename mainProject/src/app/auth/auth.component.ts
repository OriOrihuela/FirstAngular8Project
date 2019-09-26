import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

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
  // @ViewChild(PlaceholderDirective, { static: false })
  // alertHost: PlaceholderDirective;
  // private closeSub: Subscription;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) // private componentFactoryResolver: ComponentFactoryResolver
  {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  // ngOnDestroy() {
  //   if (this.closeSub) {
  //     this.closeSub.unsubscribe();
  //   }
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    this.isLoginMode
      ? (authObservable = this.authService.login(email, password))
      : (authObservable = this.authService.signUp(email, password));
    authObservable.subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMessage => {
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(message: string) {
  //   const alertComponent = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //   const componentRef = hostViewContainerRef.createComponent(alertComponent);
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
}
