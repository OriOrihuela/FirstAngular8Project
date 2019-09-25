import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
