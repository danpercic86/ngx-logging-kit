import { computed, signal, type Signal, type WritableSignal } from "@angular/core";
import { NgxLogLevel, NgxLogLevels } from "../types/logger-levels";
import { INGXLoggerConfig } from "./iconfig";
import { INGXLoggerConfigEngine } from "./iconfig-engine";

/**
 * Configuration engine using Angular signals for reactive state management
 * Provides immutable config updates and computed derived values
 */
export class NGXLoggerConfigEngine implements INGXLoggerConfigEngine {
    readonly #config: WritableSignal<INGXLoggerConfig>;
    // Internal computed signals for reactive state
    private readonly levelSignal: Signal<NgxLogLevel>;
    private readonly serverLogLevelSignal: Signal<NgxLogLevel>;
    readonly config: Signal<INGXLoggerConfig>;

    constructor(initialConfig: INGXLoggerConfig) {
        this.#config = signal(initialConfig);
        this.config = this.#config.asReadonly();

        this.levelSignal = computed(() => this.#config().level);
        this.serverLogLevelSignal = computed(() => this.#config().serverLogLevel ?? NgxLogLevels.OFF);
    }

    /**
     * Get a readonly access to the level configured for the NGXLogger
     * @returns The configured minimum log level
     */
    get level(): NgxLogLevel {
        return this.levelSignal();
    }

    /**
     * Get a readonly access to the serverLogLevel configured for the NGXLogger
     * @returns The configured minimum server log level
     */
    get serverLogLevel(): NgxLogLevel {
        return this.serverLogLevelSignal();
    }

    /**
     * Updates the entire configuration
     * @param config New configuration to set
     */
    updateConfig(config: INGXLoggerConfig): void {
        this.#config.set({ ...config });
    }

    /**
     * Updates the config partially
     * This is useful if you want to update only one parameter of the config
     * @param partialConfig Partial configuration to merge with current config
     */
    partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        this.#config.update(current => ({
            ...current,
            ...partialConfig,
        }));
    }

    /**
     * Get a snapshot of the current configuration
     * @returns A cloned copy of the current configuration
     */
    getConfig(): INGXLoggerConfig {
        return { ...this.#config() };
    }
}
