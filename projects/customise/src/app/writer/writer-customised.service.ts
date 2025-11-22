import {Injectable} from '@angular/core';
import {INGXLoggerConfig, INGXLoggerMetadata, NGXLoggerWriterService} from "../../../../ngx-logging-kit/src/public-api";

@Injectable()
export class WriterCustomisedService extends NGXLoggerWriterService {

  /** Write the content sent to the log function to the console */
  writeMessage(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): void {
    sessionStorage.setItem('logger', metadata.message);
  }
}
