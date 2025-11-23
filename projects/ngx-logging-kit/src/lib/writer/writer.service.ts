import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { INGXLoggerMetadata } from "../metadata/imetadata";
import { getLevelName, NgxLogLevels } from "../types/logger-levels";
import { DEFAULT_COLOR_SCHEME } from "./color-scheme";
import { INGXLoggerWriterService } from "./iwriter.service";

@Injectable()
export class NGXLoggerWriterService implements INGXLoggerWriterService {
    /** List of functions called when preparing meta string */
    protected prepareMetaStringFuncs: ((metadata: INGXLoggerMetadata, config: INGXLoggerConfig) => string)[] =
        [
            this.getTimestampToWrite.bind(this),
            this.getLevelToWrite.bind(this),
            this.getFileDetailsToWrite.bind(this),
            this.getContextToWrite.bind(this),
        ];

    /** Write the content sent to the log function to the console */
    writeMessage(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): void {
        const metaString = this.prepareMetaString(metadata, config);

        this.logFunc(metadata, config, metaString);
    }

    protected getTimestampToWrite(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
        return metadata.timestamp ?? "";
    }

    protected getLevelToWrite(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
        return getLevelName(metadata.level) ?? "OFF";
    }

    protected getFileDetailsToWrite(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
        return config.disableFileDetails === true ?
                ""
            :   `[${metadata.fileName}:${metadata.lineNumber}:${metadata.columnNumber}]`;
    }

    protected getContextToWrite(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
        return config.context ? `{${config.context}}` : "";
    }

    /** Generate a "meta" string that is displayed before the content sent to the log function */
    protected prepareMetaString(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string {
        let metaString = "";
        this.prepareMetaStringFuncs.forEach(prepareMetaStringFunc => {
            const metaItem = prepareMetaStringFunc(metadata, config);
            if (metaItem) {
                metaString = metaString + " " + metaItem;
            }
        });
        return metaString.trim();
    }

    /** Get the color to use when writing to console */
    protected getColor(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): string | undefined {
        const configColorScheme = config.colorScheme ?? DEFAULT_COLOR_SCHEME;

        // this is needed to avoid a build error
        if (metadata.level === NgxLogLevels.OFF) {
            return undefined;
        }
        return configColorScheme[metadata.level];
    }

    /** Log to the console */
    protected logFunc(metadata: INGXLoggerMetadata, config: INGXLoggerConfig, metaString: string): void {
        const color = this.getColor(metadata, config);

        // make sure additional isn't null or undefined so that ...additional doesn't error
        const additional = metadata.additional || [];

        switch (metadata.level) {
            case NgxLogLevels.WARN:
                console.warn(`%c${metaString}`, `color:${color}`, metadata.message, ...additional);
                break;
            case NgxLogLevels.ERROR:
            case NgxLogLevels.FATAL:
                console.error(`%c${metaString}`, `color:${color}`, metadata.message, ...additional);
                break;
            case NgxLogLevels.INFO:
                console.info(`%c${metaString}`, `color:${color}`, metadata.message, ...additional);
                break;
            //  Disabling console.trace since the stack trace is not helpful. it is showing the stack trace of
            // the console.trace statement
            // case NgxLogLevels.TRACE:
            //   console.trace(`%c${metaString}`, `color:${color}`, message, ...additional);
            //   break;

            case NgxLogLevels.DEBUG:
                console.debug(`%c${metaString}`, `color:${color}`, metadata.message, ...additional);
                break;
            default:
                console.log(`%c${metaString}`, `color:${color}`, metadata.message, ...additional);
        }
    }
}
