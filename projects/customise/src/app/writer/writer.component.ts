import {Component} from "@angular/core";
import {NGXLogger} from "../../../../ngx-logging-kit/src/public-api";

@Component({
  templateUrl: './writer.component.html',
  standalone: false
})
export class WriterComponent {

  constructor(private logger: NGXLogger) {
  }

  log(): void {
    this.logger.debug('Test');
  }
}
