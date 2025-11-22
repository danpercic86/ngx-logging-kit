import {Injectable} from '@angular/core';
import {INGXLoggerConfig} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {INGXLoggerMetadata} from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata";
import {INGXLoggerMetadataService} from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata.service";
import {NgxLoggerLevel} from "../../../projects/ngx-logging-kit/src/lib/types/logger-level.enum";


@Injectable()
export class NGXLoggerMetadataServiceMock implements INGXLoggerMetadataService {

  getMetadata(
    level: NgxLoggerLevel,
    config: INGXLoggerConfig,
    message?: any | (() => any),
    additional?: any[],
  ): INGXLoggerMetadata {
    return {
      level: level
    };
  }
}
