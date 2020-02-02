import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[categories-host]',
})
export class CategoriesDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
