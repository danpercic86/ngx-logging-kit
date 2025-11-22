import {Component} from "@angular/core";
import {NGXLogger} from "../../../../ngx-logging-kit/src/public-api";

@Component({
  templateUrl: './forchild.component.html',
  standalone: false
})
export class ForchildComponent {

  constructor(private logger: NGXLogger) {
  }

  log(): void {
    this.logger.debug('Test');
  }
}
