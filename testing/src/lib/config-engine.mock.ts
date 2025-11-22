import {Injectable} from '@angular/core';
import {INGXLoggerConfig} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {INGXLoggerConfigEngine} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig-engine";
import {NgxLoggerLevel} from "../../../projects/ngx-logging-kit/src/lib/types/logger-level.enum";

@Injectable()
export class NGXLoggerConfigEngineMock implements INGXLoggerConfigEngine {

  get level(): NgxLoggerLevel {
    return NgxLoggerLevel.ERROR;
  }

  get serverLogLevel(): NgxLoggerLevel {
    return NgxLoggerLevel.OFF;
  }

  updateConfig(config: INGXLoggerConfig) {
  }

  partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
  }

  getConfig(): INGXLoggerConfig {
    return {level: NgxLoggerLevel.ERROR};
  }
}
