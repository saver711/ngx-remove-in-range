# NgxRemoveInRange

A Directive to entirely remove elements from the dom in specific screen width ranges.

## Installation

```bash
  npm i ngx-remove-in-range
  # or
  yarn add ngx-remove-in-range
```

## Usage/Examples

#### TS

```javascript
import { RemoveInRangeDirective } from "ngx-remove-in-range";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RemoveInRangeDirective],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
```

#### HTML

```html
<!-- Remove starting from 300px up to 600px -->
<h1 *removeInRange="[[300, 600]]">Ahmed</h1>

<!-- Remove starting from 300px -->
<h1 *removeInRange="[[300]]">Ahmed</h1>
```

## Author

[@AhmedHassan](https://www.linkedin.com/in/ahmedhassan711/)
