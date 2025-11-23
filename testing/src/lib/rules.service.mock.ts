import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerRulesService } from "../../../projects/ngx-logging-kit/src/lib/rules/irules.service";
import { NgxLogLevel } from "../../../projects/ngx-logging-kit/src/lib/types/logger-levels";

@Injectable()
export class NGXLoggerRulesServiceMock implements INGXLoggerRulesService {
    shouldCallWriter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        level: NgxLogLevel,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): boolean {
        return false;
    }

    shouldCallServer(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        level: NgxLogLevel,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): boolean {
        return false;
    }

    shouldCallMonitor(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        level: NgxLogLevel,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): boolean {
        return false;
    }
}
