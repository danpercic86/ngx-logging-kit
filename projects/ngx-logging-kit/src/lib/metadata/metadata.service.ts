import { DatePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLoggerLevel } from "../types/logger-level.enum";
import { INGXLoggerMetadata } from "./imetadata";
import { INGXLoggerMetadataService } from "./imetadata.service";

@Injectable()
export class NGXLoggerMetadataService implements INGXLoggerMetadataService {
    protected readonly datePipe = inject(DatePipe, { optional: true });

    getMetadata(
        level: NgxLoggerLevel,
        config: INGXLoggerConfig,
        message?: any | (() => any),
        additional?: any[],
    ): INGXLoggerMetadata {
        const metadata: INGXLoggerMetadata = {
            level: level,
            additional: additional,
        };

        // The user can send a function
        // This is useful in order to compute string concatenation only when the log will actually be written
        if (message && typeof message === "function") {
            metadata.message = message();
        } else {
            metadata.message = message;
        }

        metadata.timestamp = this.computeTimestamp(config);

        return metadata;
    }

    protected computeTimestamp(config: INGXLoggerConfig): string {
        const defaultTimestamp = () => new Date().toISOString();

        if (config.timestampFormat) {
            if (!this.datePipe) {
                console.error(
                    "NGXLogger : Can't use timeStampFormat because DatePipe is not provided. You need to provide DatePipe",
                );
                return defaultTimestamp();
            } else {
                return this.datePipe.transform(new Date(), config.timestampFormat) || defaultTimestamp();
            }
        }

        return defaultTimestamp();
    }
}
