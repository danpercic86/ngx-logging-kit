import { Injectable } from "@angular/core";
import { INGXLoggerConfig } from "../../src/lib/config/iconfig";
import { INGXLoggerConfigEngine } from "../../src/lib/config/iconfig-engine";
import { INGXLoggerConfigEngineFactory } from "../../src/lib/config/iconfig-engine-factory";
import { NGXLoggerConfigEngineMock } from "./config-engine.mock";

@Injectable()
export class NGXLoggerConfigEngineFactoryMock implements INGXLoggerConfigEngineFactory {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    provideConfigEngine(config: INGXLoggerConfig): INGXLoggerConfigEngine {
        return new NGXLoggerConfigEngineMock();
    }
}
