import {Directive, ElementRef, OnChanges, Input} from "@angular/core";

declare var MathJax: {
  Hub: {
    Queue: (param: Object[]) => void;
  }
}
@Directive({
    selector: '[MathJax]'
})
export class MathJaxDirectiveDirective {
    @Input('MathJax') fractionString: string;

    constructor(private el: ElementRef) {
    }

    ngOnChanges() {
      console.log('>> ngOnChanges');
       this.el.nativeElement.innerHTML = this.fractionString;
       MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement]);
    }
}