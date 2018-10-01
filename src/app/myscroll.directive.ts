import { Directive } from '@angular/core';

@Directive({
  selector: '[appMyscroll]'
})
export class MyscrollDirective {
    host: {
        '(ionScroll)': 'onContentScroll($event)',
        '(window:resize)': 'onWindowResize($event)',
        '(click)': 'fff($event)'
    }
  constructor() {
      console.log('hello from directive');
  }
    onContentScroll(event) {
      console.log('privet blyaa!');
    }
    fff() {
      console.log('fsdfsd');
    }
}
