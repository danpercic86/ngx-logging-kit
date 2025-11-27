import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../src/lib/config/iconfig";
import { INGXLoggerMetadata } from "../../src/lib/metadata/imetadata";
import { INGXLoggerServerService } from "../../src/lib/server/iserver.service";

@Injectable()
export class NGXLoggerServerServiceMock implements INGXLoggerServerService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendToServer(metadata: INGXLoggerMetadata, config: INGXLoggerConfig): void {
        /* empty */
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    flushQueue(config: INGXLoggerConfig): void {
        /* empty */
    }
}
