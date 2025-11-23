import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerMetadata } from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata";
import { INGXLoggerWriterService } from "../../../projects/ngx-logging-kit/src/lib/writer/iwriter.service";

@Injectable()
export class NGXLoggerWriterServiceMock implements INGXLoggerWriterService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    writeMessage(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): void {
        /* empty */
    }
}
