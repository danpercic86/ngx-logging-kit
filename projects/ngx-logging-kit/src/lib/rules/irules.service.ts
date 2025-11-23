import { InjectionToken } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLogLevel } from "../types/logger-levels";

/**
 * Injection token of logger metadata service
 */
export const TOKEN_LOGGER_RULES_SERVICE = new InjectionToken("TOKEN_LOGGER_RULES_SERVICE");

/**
 * Service used to know if some of the feature of the logger should be used or not
 */
export interface INGXLoggerRulesService {
    /**
     * If true the logger will write logs to console
     * @param level
     * @param config
     * @param message
     * @param additional
     */
    shouldCallWriter(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): boolean;

    /**
     * If true the logger will send logs to server
     * @param level
     * @param config
     * @param message
     * @param additional
     */
    shouldCallServer(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): boolean;

    /**
     * If true the logger will call the loggerMonitor
     * @param level
     * @param config
     * @param message
     * @param additional
     */
    shouldCallMonitor(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): boolean;
}
