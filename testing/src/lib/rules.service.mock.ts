import {Injectable} from '@angular/core';
import {INGXLoggerConfig} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {INGXLoggerRulesService} from "../../../projects/ngx-logging-kit/src/lib/rules/irules.service";
import {NgxLoggerLevel} from "../../../projects/ngx-logging-kit/src/lib/types/logger-level.enum";


@Injectable()
export class NGXLoggerRulesServiceMock implements INGXLoggerRulesService {

  shouldCallWriter(level: NgxLoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    return false;
  }

  shouldCallServer(level: NgxLoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    return false;
  }

  shouldCallMonitor(level: NgxLoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    return false;
  }
}
