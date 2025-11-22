import {Component} from "@angular/core";
import {NGXLogger} from "../../../../ngx-logging-kit/src/public-api";

@Component({
  templateUrl: './customise-body-server-log.component.html',
  standalone: false
})
export class CustomiseBodyServerLogComponent {

  constructor(private logger: NGXLogger) {
  }

  log(): void {
    this.logger.debug('Test');
  }
}
