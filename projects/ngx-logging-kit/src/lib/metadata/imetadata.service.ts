import { InjectionToken } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLoggerLevel } from "../types/logger-level.enum";
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
        level: NgxLoggerLevel,
        config: INGXLoggerConfig,
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): INGXLoggerMetadata;
}
