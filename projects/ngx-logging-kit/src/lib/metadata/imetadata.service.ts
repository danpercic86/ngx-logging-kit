import { InjectionToken } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLogLevel } from "../types/logger-levels";
import { INGXLoggerMetadata } from "./imetadata";

/**
 * Injection token of logger metadata service
 */
export const TOKEN_LOGGER_METADATA_SERVICE = new InjectionToken("TOKEN_LOGGER_METADATA_SERVICE");

export interface INGXLoggerMetadataService {
    /**
     * Gets the content to be logged and some metadata around it
     * @param level
     * @param config
     * @param message
     * @param additional
     */
    getMetadata(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): INGXLoggerMetadata;
}
