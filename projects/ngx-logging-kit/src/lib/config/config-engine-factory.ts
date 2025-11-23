import { Injectable } from "@angular/core";
import { NGXLoggerConfigEngine } from "./config-engine";
import { INGXLoggerConfig } from "./iconfig";
import { INGXLoggerConfigEngine } from "./iconfig-engine";
import { INGXLoggerConfigEngineFactory } from "./iconfig-engine-factory";

/**
 * Factory for creating NGXLoggerConfigEngine instances
 * Implements the Factory pattern for config engine creation
 */
@Injectable()
export class NGXLoggerConfigEngineFactory implements INGXLoggerConfigEngineFactory {
    /**
     * Creates a new config engine instance
     * @param config Initial configuration
     * @returns A new config engine instance
     */
    provideConfigEngine(config: INGXLoggerConfig): INGXLoggerConfigEngine {
        return new NGXLoggerConfigEngine(config);
    }
}
