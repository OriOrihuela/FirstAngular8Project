import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  /**
   * PROPERTIES
   */
  @HostBinding("class.open") isOpen: boolean = false;
  /**
   * BEHAVIOURS
   */
  @HostListener("click") toggleOpen() {
      this.isOpen = !this.isOpen;
  }
}
