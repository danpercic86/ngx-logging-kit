import { NgxLogLevel } from "../types/logger-levels";

/**
 * Content to be logged and some metadata
 */
export interface INGXLoggerMetadata {
    /* Content sent by the user*/

    /** The message sent to the log function
     *
     * If a function was sent, the function is already called
     */
    message?: unknown;
    /** The additional params sent to the log function */
    additional?: unknown[];

    /* Metadata around content */
    level: NgxLogLevel;
    timestamp?: string;
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
}
