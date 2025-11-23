import { DatePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../config/iconfig";
import { NgxLogLevel } from "../types/logger-levels";
import { INGXLoggerMetadata } from "./imetadata";
import { INGXLoggerMetadataService } from "./imetadata.service";

@Injectable()
export class NGXLoggerMetadataService implements INGXLoggerMetadataService {
    protected readonly datePipe = inject(DatePipe, { optional: true });

    getMetadata(
        level: NgxLogLevel,
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        message?: unknown | (() => unknown),
        additional?: unknown[],
    ): INGXLoggerMetadata {
        const metadata: INGXLoggerMetadata = {
            level: level,
            additional: additional,
        };

        // The user can send a function
        // This is useful in order to compute string concatenation only when the log will actually be written
        if (message && typeof message === "function") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            metadata.message = message();
        } else {
            metadata.message = message;
        }

        metadata.timestamp = this.computeTimestamp(config);

        return metadata;
    }

    protected computeTimestamp(config: INGXLoggerConfig): string {
        const defaultTimestamp = new Date().toISOString();

        if (config.timestampFormat) {
            if (this.datePipe === null) {
                console.error(
                    "NGXLogger : Can't use timeStampFormat because DatePipe is not provided. You need to provide DatePipe",
                );
                return defaultTimestamp;
            } else {
                return this.datePipe.transform(new Date(), config.timestampFormat) ?? defaultTimestamp;
            }
        }

        return defaultTimestamp;
    }
}
