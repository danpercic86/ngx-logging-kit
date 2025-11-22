import { Component, inject } from '@angular/core';
import {
  INGXLoggerConfig,
  INGXLoggerMetadata,
  INGXLoggerMonitor,
  NGXLogger
} from '../../../ngx-logging-kit/src/public-api';

export class AppMonitor implements INGXLoggerMonitor {
  onLog(logObject: INGXLoggerMetadata, config: INGXLoggerConfig): void {
    console.error('Hi there from the app monitor');
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  private logger = inject(NGXLogger);


  constructor() {
    this.logger.registerMonitor(new AppMonitor());
  }

  title = 'singleton-v1';
}
