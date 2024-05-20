import {
  Directive,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core"

type NumberArray = [number, number?]
// must have at least one inner array
type ArrayOfNumberArrays = [...NumberArray[]]

@Directive({
  selector: "[removeInRange]",
  standalone: true
})
export class RemoveInRangeDirective implements OnInit {
  @Input({ required: true }) removeInRange!: ArrayOfNumberArrays
  private elementWasCreated = false

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    const screenWidth = window.innerWidth
    this.hideHandling(screenWidth)
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    const screenWidth = (event.currentTarget as Window).innerWidth
    this.hideHandling(screenWidth)
  }

  hideHandling(screenWidth: number) {
    const isInRange = this.isInAnyRange(screenWidth, this.removeInRange)
    if (isInRange) {
      this.viewContainer.clear()
      this.elementWasCreated = false
    } else {
      if (!this.elementWasCreated) {
        this.viewContainer.createEmbeddedView(this.templateRef)
        this.elementWasCreated = true
      }
    }
  }

  isInRange(num: number, array: NumberArray): boolean {
    const [lower, upper] = array
    if (upper !== undefined) {
      return num >= lower && num < upper
    } else {
      return num >= lower
    }
  }

  isInAnyRange(num: number, arrays: ArrayOfNumberArrays): boolean {
    return arrays.some(array => this.isInRange(num, array))
  }
}
