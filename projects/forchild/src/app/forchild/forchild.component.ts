import { Component } from "@angular/core";
import { NGXLogger } from "src/public_api";

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
