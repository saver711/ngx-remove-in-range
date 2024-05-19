import {
  Directive,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

type NumberArray = [number, number?];
// must have at least one inner array
type ArrayOfNumberArrays = [...NumberArray[]];

@Directive({
  selector: '[removeInRange]',
  standalone: true,
})
export class RemoveInRangeDirective implements OnInit {
  @Input({ required: true }) removeInRange!: ArrayOfNumberArrays;
  private elementWasCreated = false;
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.hideHandling(screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = (event.currentTarget as Window).innerWidth;
    this.hideHandling(screenWidth);
  }
  hideHandling(screenWidth: number) {
    const nearestArray = this.findNearestArray(screenWidth, this.removeInRange);
    if (nearestArray) {
      const isInRange = this.isInRange(screenWidth, nearestArray);
      if (nearestArray && isInRange) {
        this.viewContainer.clear();
        this.elementWasCreated = false;
      } else {
        !this.elementWasCreated &&
          this.viewContainer.createEmbeddedView(this.templateRef);
        this.elementWasCreated = true;
      }
    }
  }

  isInRange(num: number, array: NumberArray): boolean {
    const [lower, upper] = array;
    if (upper) {
      return num >= lower && num < upper;
    } else {
      return num >= lower;
    }
  }

  findNearestArray(num: number, arrays: ArrayOfNumberArrays) {
    let nearestArray = null;
    let minDifference = Number.MAX_VALUE;

    for (const array of arrays) {
      const difference = Math.abs(num - array[0]);
      if (difference < minDifference) {
        minDifference = difference;
        nearestArray = array;
      }
    }

    return nearestArray;
  }
}
