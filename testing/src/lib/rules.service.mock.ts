import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerRulesService } from "../../../projects/ngx-logging-kit/src/lib/rules/irules.service";
import { NgxLogLevel } from "../../../projects/ngx-logging-kit/src/lib/types/logger-levels";

@Injectable()
export class NGXLoggerRulesServiceMock implements INGXLoggerRulesService {
    shouldCallWriter(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        return false;
    }

    shouldCallServer(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        return false;
    }

    shouldCallMonitor(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        return false;
    }
}
