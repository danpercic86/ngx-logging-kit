import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLogLevel, NgxLogLevels } from "../types/logger-levels";
import { INGXLoggerRulesService } from "./irules.service";

@Injectable()
export class NGXLoggerRulesService implements INGXLoggerRulesService {
    shouldCallWriter(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        return !config.disableConsoleLogging && level >= config.level;
    }

    shouldCallServer(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        return !!config.serverLoggingUrl && level >= (config.serverLogLevel ?? NgxLogLevels.OFF);
    }

    shouldCallMonitor(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: any,
        additional?: any[],
    ): boolean {
        // The default behavior is to call the monitor only if the writer or the server is called
        return (
            this.shouldCallWriter(level, config, message, additional) ||
            this.shouldCallServer(level, config, message, additional)
        );
    }
}
