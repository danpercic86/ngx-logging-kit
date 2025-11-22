import {Component} from "@angular/core";
import {NGXLogger} from "../../../../ngx-logging-kit/src/public-api";

@Component({
  templateUrl: './auth-token.component.html',
  standalone: false
})
export class AuthTokenComponent {

  constructor(private logger: NGXLogger) {
  }

  log(): void {
    this.logger.debug('Test');
  }
}
