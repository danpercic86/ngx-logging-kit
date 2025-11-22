import { Component } from "@angular/core";
import { NGXLogger } from "src/public_api";

@Component({
    templateUrl: './main.component.html',
    standalone: false
})
export class MainComponent {

  constructor(public logger: NGXLogger) {
  }

  log(): void {
    this.logger.debug('Test');
  }
}
