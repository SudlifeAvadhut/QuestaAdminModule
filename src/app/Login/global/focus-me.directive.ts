import { Directive, ElementRef, Input, OnChanges, SimpleChanges, HostListener, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[codfFocusMe]'
})
export class FocusMeDirective implements OnChanges {
  @Input() codfFocusMe: boolean;
  @Input() removeFocus: boolean;
  @Output() isFocused: EventEmitter<any> = new EventEmitter();

  element: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  @HostListener('focus') onFocus() {
    this.isFocused.emit();
    this.element.setSelectionRange(0, this.element.value.length);
  }

  focusIt() {
    this.element.focus();
  }

  blurIt() {
    this.element.blur();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['codfFocusMe']) {
      const currentValue = simpleChanges['codfFocusMe'].currentValue;
      if (currentValue) {
        this.focusIt();
      }
    }

    if (simpleChanges['removeFocus']) {
      const currentValue = simpleChanges['removeFocus'].currentValue;
      if (currentValue) {
        this.blurIt();
      }
    }
  }

}
