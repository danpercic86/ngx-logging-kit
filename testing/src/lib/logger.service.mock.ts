import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerMonitor } from "../../../projects/ngx-logging-kit/src/lib/monitor/ilogger-monitor";
import { NgxLogLevel, NgxLogLevels } from "../../../projects/ngx-logging-kit/src/lib/types/logger-levels";

// todo bmtheo, there should be an interface or something to make sure this mock sticks to the real API
@Injectable()
export class NGXLoggerMock {
    get level(): NgxLogLevel {
        return NgxLogLevels.ERROR;
    }

    get serverLogLevel(): NgxLogLevel {
        return NgxLogLevels.OFF;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trace(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    debug(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    log(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fatal(message?: unknown, ...additional: unknown[]): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConfig(config: unknown): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCustomHttpHeaders(headers: HttpHeaders): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCustomParams(params: HttpParams): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerMonitor(monitor: INGXLoggerMonitor): void {
        /* empty */
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setWithCredentialsOptionValue(withCredentials: boolean): void {
        /* empty */
    }

    getConfigSnapshot(): INGXLoggerConfig {
        return { level: NgxLogLevels.ERROR };
    }
}
