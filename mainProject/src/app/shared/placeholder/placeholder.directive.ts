import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  /**
   * CONSTRUCTOR
   */
  constructor(public viewContainerRef: ViewContainerRef) { }

}
