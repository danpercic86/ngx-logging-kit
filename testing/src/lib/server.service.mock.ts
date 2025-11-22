import {Injectable} from '@angular/core';
import {INGXLoggerConfig} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {INGXLoggerMetadata} from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata";
import {INGXLoggerServerService} from "../../../projects/ngx-logging-kit/src/lib/server/iserver.service";


@Injectable()
export class NGXLoggerServerServiceMock implements INGXLoggerServerService {

  sendToServer(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): void {
  }

  flushQueue(config: INGXLoggerConfig): void {
  }
}
