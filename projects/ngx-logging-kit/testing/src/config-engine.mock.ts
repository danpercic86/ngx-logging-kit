import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../src/lib/config/iconfig";
import { INGXLoggerConfigEngine } from "../../src/lib/config/iconfig-engine";
import { NgxLogLevel, NgxLogLevels } from "../../src/lib/types/logger-levels";

@Injectable()
export class NGXLoggerConfigEngineMock implements INGXLoggerConfigEngine {
    get level(): NgxLogLevel {
        return NgxLogLevels.ERROR;
    }

    get serverLogLevel(): NgxLogLevel {
        return NgxLogLevels.OFF;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConfig(config: INGXLoggerConfig): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        /* empty */
    }

    getConfig(): INGXLoggerConfig {
        return { level: NgxLogLevels.ERROR };
    }
}
