import { computed, signal, type Signal, type WritableSignal } from "@angular/core";
import { NgxLoggerLevel } from "../types/logger-level.enum";
import { INGXLoggerConfig } from "./iconfig";
import { INGXLoggerConfigEngine } from "./iconfig-engine";

/**
 * Configuration engine using Angular signals for reactive state management
 * Provides immutable config updates and computed derived values
 */
export class NGXLoggerConfigEngine implements INGXLoggerConfigEngine {
    private readonly config: WritableSignal<INGXLoggerConfig>;

    // Internal computed signals for reactive state
    private readonly levelSignal: Signal<NgxLoggerLevel>;
    private readonly serverLogLevelSignal: Signal<NgxLoggerLevel>;

    constructor(initialConfig: INGXLoggerConfig) {
        this.config = signal(initialConfig);

        this.levelSignal = computed(() => this.config().level);
        this.serverLogLevelSignal = computed(() => this.config().serverLogLevel ?? NgxLoggerLevel.OFF);
    }

    /**
     * Get a readonly access to the level configured for the NGXLogger
     * @returns The configured minimum log level
     */
    get level(): NgxLoggerLevel {
        return this.levelSignal();
    }

    /**
     * Get a readonly access to the serverLogLevel configured for the NGXLogger
     * @returns The configured minimum server log level
     */
    get serverLogLevel(): NgxLoggerLevel {
        return this.serverLogLevelSignal();
    }

    /**
     * Updates the entire configuration
     * @param config New configuration to set
     */
    updateConfig(config: INGXLoggerConfig): void {
        this.config.set(config);
    }

    /**
     * Updates the config partially
     * This is useful if you want to update only one parameter of the config
     * @param partialConfig Partial configuration to merge with current config
     */
    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        this.config.update(current => ({
            ...current,
            ...partialConfig,
        }));
    }

    /**
     * Get a snapshot of the current configuration
     * @returns A cloned copy of the current configuration
     */
    getConfig(): INGXLoggerConfig {
        return this.config();
    }
}
