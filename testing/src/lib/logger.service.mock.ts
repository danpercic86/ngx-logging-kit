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

    trace(message?: any | (() => any), ...additional: any[]) {}

    debug(message?: any | (() => any), ...additional: any[]) {}

    info(message?: any | (() => any), ...additional: any[]) {}

    log(message?: any | (() => any), ...additional: any[]) {}

    warn(message?: any | (() => any), ...additional: any[]) {}

    error(message?: any | (() => any), ...additional: any[]) {}

    fatal(message?: any | (() => any), ...additional: any[]) {}

    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {}

    updateConfig(config: any) {}

    setCustomHttpHeaders(headers: HttpHeaders) {}

    setCustomParams(params: HttpParams) {}

    registerMonitor(monitor: INGXLoggerMonitor) {}

    setWithCredentialsOptionValue(withCredentials: boolean) {}

    getConfigSnapshot(): INGXLoggerConfig {
        return { level: NgxLogLevels.ERROR };
    }
}
