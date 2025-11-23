import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { INGXLoggerConfig } from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import { INGXLoggerLogPosition } from "../../../projects/ngx-logging-kit/src/lib/mapper/ilog-position";
import { INGXLoggerMapperService } from "../../../projects/ngx-logging-kit/src/lib/mapper/imapper.service";
import { INGXLoggerMetadata } from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata";

@Injectable()
export class NGXLoggerMapperServiceMock implements INGXLoggerMapperService {
    getLogPosition(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config: INGXLoggerConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        metadata: INGXLoggerMetadata,
    ): Observable<INGXLoggerLogPosition> {
        return of({ fileName: "public-api.ts", lineNumber: 1, columnNumber: 1 });
    }
}
