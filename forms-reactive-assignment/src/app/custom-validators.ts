import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';

export class CustomValidators {
  /**
   * BEHAVIOURS TO VALIDATE
   */
  static invalidProjectName(control: FormControl) {
    return control.value === "Test" ? { invalidProjectName: true } : null;
  }

  static asyncInvalidProjectName(control: FormControl) {
    const promise = new Promise((resolve, reject) => { 
      setTimeout(() => {
        return control.value === "TestProject" ? resolve({ invalidProjectName: true }) : resolve(null);
      }, 2000);
    })
    return promise;
  }
}
