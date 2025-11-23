import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLogLevel, NgxLogLevels } from "../types/logger-levels";
import { INGXLoggerRulesService } from "./irules.service";

@Injectable()
export class NGXLoggerRulesService implements INGXLoggerRulesService {
    shouldCallWriter(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): boolean {
        return !config.disableConsoleLogging && level >= config.level;
    }

    shouldCallServer(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): boolean {
        return !!config.serverLoggingUrl && level >= (config.serverLogLevel ?? NgxLogLevels.OFF);
    }

    shouldCallMonitor(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: unknown,
        additional?: unknown[],
    ): boolean {
        // The default behavior is to call the monitor only if the writer or the server is called
        return (
            this.shouldCallWriter(level, config, message, additional) ||
            this.shouldCallServer(level, config, message, additional)
        );
    }
}
