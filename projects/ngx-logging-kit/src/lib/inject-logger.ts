import { inject } from "@angular/core";
import { INGXLoggerConfig } from "./config/iconfig";
import { NGXLogger } from "./logger.service";
import { INGXLoggerMonitor } from "./monitor/ilogger-monitor";
import { NgxLogLevel } from "./types/logger-levels";

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
        this.parent.trace(msg, ...args);
    }

    override debug(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.debug(msg, ...args);
    }

    override info(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.info(msg, ...args);
    }

    override log(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.log(msg, ...args);
    }

    override warn(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.warn(msg, ...args);
    }

    override error(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.error(msg, ...args);
    }

    override fatal(message?: unknown, ...additional: unknown[]): void {
        const { msg, args } = this.decorate(message, additional);
        this.parent.fatal(msg, ...args);
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
