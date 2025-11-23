import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerConfigEngine } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig-engine";
import { NgxLogLevel, NgxLogLevels } from "../../../projects/ngx-logging-kit/src/lib/types/logger-levels";

@Injectable()
export class NGXLoggerConfigEngineMock implements INGXLoggerConfigEngine {
    get level(): NgxLogLevel {
        return NgxLogLevels.ERROR;
    }

    get serverLogLevel(): NgxLogLevel {
        return NgxLogLevels.OFF;
    }

    updateConfig(config: INGXLoggerConfig): void {
        /* empty */
    }

    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        /* empty */
    }

    getConfig(): INGXLoggerConfig {
        return { level: NgxLogLevels.ERROR };
    }
}
