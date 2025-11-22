import {InjectionToken} from "@angular/core";
import {INGXLoggerConfig} from "./iconfig";
import {INGXLoggerConfigEngine} from "./iconfig-engine";

/**
 * Injection token of logger config engine factory
 */
export const TOKEN_LOGGER_CONFIG_ENGINE_FACTORY = new InjectionToken('TOKEN_LOGGER_CONFIG_ENGINE_FACTORY');

export interface INGXLoggerConfigEngineFactory {
    /** Create the instance of configEngine */
    provideConfigEngine(config: INGXLoggerConfig): INGXLoggerConfigEngine;
}
