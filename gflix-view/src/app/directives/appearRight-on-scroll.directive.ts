import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppearRightOnScroll]'
})
export class AppearRightOnScrollDirective implements OnInit, OnDestroy {
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '0px';
  @HostBinding('class.appearRight') isVisible = false;

  private observer!: IntersectionObserver;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isVisible = true;
        this.observer.unobserve(this.element.nativeElement);
      }
    }, options);

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
