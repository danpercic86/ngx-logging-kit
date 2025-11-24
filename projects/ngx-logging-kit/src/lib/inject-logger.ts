import { inject } from "@angular/core";
import { INGXLoggerConfig } from "./config/iconfig";
import { NGXLogger } from "./logger.service";
import { INGXLoggerMonitor } from "./monitor/ilogger-monitor";
import { NgxLogLevel, NgxLogLevels } from "./types/logger-levels";

class ContextLogger extends NGXLogger {
    constructor(
        private readonly parent: NGXLogger,
        private readonly context: string,
    ) {
        super();
    }

    override get level(): NgxLogLevel {
        return this.parent.level;
    }

    override get serverLogLevel(): NgxLogLevel {
        return this.parent.serverLogLevel;
    }

    override trace(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.TRACE, this.getFeatureConfig(), msg, ...args);
    }

    override debug(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.DEBUG, this.getFeatureConfig(), msg, ...args);
    }

    override info(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.INFO, this.getFeatureConfig(), msg, ...args);
    }

    override log(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.LOG, this.getFeatureConfig(), msg, ...args);
    }

    override warn(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.WARN, this.getFeatureConfig(), msg, ...args);
    }

    override error(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.ERROR, this.getFeatureConfig(), msg, ...args);
    }

    override fatal(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.logWithConfig(NgxLogLevels.FATAL, this.getFeatureConfig(), msg, ...args);
    }

    override registerMonitor(monitor: INGXLoggerMonitor): void {
        this.parent.registerMonitor(monitor);
    }

    override updateConfig(config: INGXLoggerConfig): void {
        this.parent.updateConfig(config);
    }

    override partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
        this.parent.partialUpdateConfig(partialConfig);
    }

    override getConfigSnapshot(): INGXLoggerConfig {
        return this.parent.getConfigSnapshot();
    }

    override flushServerQueue(): void {
        this.parent.flushServerQueue();
    }

    private getFeatureConfig(): INGXLoggerConfig {
        const config = this.parent.getConfigSnapshot();
        const featureConfig = config.features?.[this.context];

        if (featureConfig) {
            return {
                ...config,
                level: featureConfig.logLevel,
                serverLogLevel: featureConfig.serverLogLevel ?? config.serverLogLevel,
            };
        }

        return config;
    }

    private decorate(message?: unknown, additional: unknown[] = []): { msg: unknown; args: unknown[] } {
        const prefix = `[${this.context}]`;

        if (typeof message === "string") {
            return { msg: `${prefix} ${message}`, args: additional };
        }

        if (typeof message === "function") {
            const wrappedFn = (): unknown => {
                const result = (message as () => unknown)();
                if (typeof result === "string") {
                    return `${prefix} ${result}`;
                }
                return [prefix, result];
            };
            return { msg: wrappedFn, args: additional };
        }

        if (message === undefined) {
            return { msg: prefix, args: additional };
        }

        return { msg: prefix, args: [message, ...additional] };
    }
}

/**
 * Injects a logger with a specific context.
 * The logger will prepend the context to all log messages.
 *
 * @param context The context string to prepend (e.g. 'MyComponent')
 * @returns An NGXLogger instance that delegates to the root logger
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   private readonly logger = injectLogger('MyComponent');
 *
 *   ngOnInit() {
 *     this.logger.info('Initialized'); // Logs: [MyComponent] Initialized
 *   }
 * }
 * ```
 */
export function injectLogger(context: string): NGXLogger {
    const parent = inject(NGXLogger);
    return new ContextLogger(parent, context);
}
