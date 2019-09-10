import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  /**
   * PROPERTIES
   */
  subscriptions: string[] = ["Basic", "Advanced", "Pro"];
  selectedSubscription: string = "Advanced";
  @ViewChild("signUpForm", {static: false}) sgnForm: NgForm;

  /**
   * BEHAVIOURS
   */
  onSubmit() {
    console.log(this.sgnForm.value);
  }
}
