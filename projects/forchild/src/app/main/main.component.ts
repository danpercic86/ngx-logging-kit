import { Component, inject } from "@angular/core";
import {NGXLogger} from "../../../../ngx-logging-kit/src/public-api";

@Component({
  templateUrl: './main.component.html',
  standalone: false
})
export class MainComponent {
  private logger = inject(NGXLogger);


  log(): void {
    this.logger.debug('Test');
  }
}
