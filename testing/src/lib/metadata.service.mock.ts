import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerMetadata } from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata";
import { INGXLoggerMetadataService } from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata.service";
import { NgxLogLevel } from "../../../projects/ngx-logging-kit/src/lib/types/logger-levels";

@Injectable()
export class NGXLoggerMetadataServiceMock implements INGXLoggerMetadataService {
    getMetadata(
        level: NgxLogLevel,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message?: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        additional?: unknown[],
    ): INGXLoggerMetadata {
        return {
            level: level,
        };
    }
}
