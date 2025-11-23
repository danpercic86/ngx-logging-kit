import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { INGXLoggerConfig, TOKEN_LOGGER_CONFIG } from './config/iconfig';
import { INGXLoggerConfigEngine } from './config/iconfig-engine';
import {
  INGXLoggerConfigEngineFactory,
  TOKEN_LOGGER_CONFIG_ENGINE_FACTORY,
} from './config/iconfig-engine-factory';
import { INGXLoggerMapperService, TOKEN_LOGGER_MAPPER_SERVICE } from './mapper/imapper.service';
import {
  INGXLoggerMetadataService,
  TOKEN_LOGGER_METADATA_SERVICE,
} from './metadata/imetadata.service';
import { INGXLoggerMonitor } from './monitor/ilogger-monitor';
import { INGXLoggerRulesService, TOKEN_LOGGER_RULES_SERVICE } from './rules/irules.service';
import {
  INGXLoggerServerService,
  TOKEN_LOGGER_SERVER_SERVICE,
} from './server/iserver.service';
import { NgxLoggerLevel } from './types/logger-level.enum';
import {
  INGXLoggerWriterService,
  TOKEN_LOGGER_WRITER_SERVICE,
} from './writer/iwriter.service';

/**
 * Main logger service for NGX Logger
 * Provides logging functionality with configurable output to console and server
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   private readonly logger = inject(NGXLogger);
 *
 *   logSomething() {
 *     this.logger.debug('Debug message');
 *     this.logger.info('Info message', { data: 'value' });
 *     this.logger.error('Error occurred', error);
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class NGXLogger {
  private readonly metadataService = inject<INGXLoggerMetadataService>(
    TOKEN_LOGGER_METADATA_SERVICE
  );
  private readonly ruleService = inject<INGXLoggerRulesService>(TOKEN_LOGGER_RULES_SERVICE);
  private readonly mapperService = inject<INGXLoggerMapperService>(TOKEN_LOGGER_MAPPER_SERVICE);
  private readonly writerService = inject<INGXLoggerWriterService>(TOKEN_LOGGER_WRITER_SERVICE);
  private readonly serverService = inject<INGXLoggerServerService>(TOKEN_LOGGER_SERVER_SERVICE);
  private readonly configEngine: INGXLoggerConfigEngine;

  private loggerMonitor?: INGXLoggerMonitor;

  constructor() {
    const config = inject<INGXLoggerConfig>(TOKEN_LOGGER_CONFIG);
    const configEngineFactory = inject<INGXLoggerConfigEngineFactory>(
      TOKEN_LOGGER_CONFIG_ENGINE_FACTORY
    );

    this.configEngine = configEngineFactory.provideConfigEngine(config);
  }

  /**
   * Get the current log level
   * @returns The configured minimum log level
   */
  get level(): NgxLoggerLevel {
    return this.configEngine.level;
  }

  /**
   * Get the current server log level
   * @returns The configured minimum server log level
   */
  get serverLogLevel(): NgxLoggerLevel {
    return this.configEngine.serverLogLevel;
  }

  /**
   * Log a trace message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  trace(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.TRACE, message, additional);
  }

  /**
   * Log a debug message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Parameters to log
   */
  debug(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.DEBUG, message, additional);
  }

  /**
   * Log an info message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  info(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.INFO, message, additional);
  }

  /**
   * Log a general log message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  log(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.LOG, message, additional);
  }

  /**
   * Log a warning message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  warn(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.WARN, message, additional);
  }

  /**
   * Log an error message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  error(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.ERROR, message, additional);
  }

  /**
   * Log a fatal error message
   * @param message Message to log (can be a function for lazy evaluation)
   * @param additional Additional parameters to log
   */
  fatal(message?: unknown, ...additional: unknown[]): void {
    this.log_internal(NgxLoggerLevel.FATAL, message, additional);
  }

  /**
   * Register a INGXLoggerMonitor that will be triggered when a log is either written or sent to server
   *
   * There is only one monitor, registering one will overwrite the last one if there was one
   * @param monitor Monitor instance to register
   */
  registerMonitor(monitor: INGXLoggerMonitor): void {
    this.loggerMonitor = monitor;
  }

  /**
   * Set config of logger
   *
   * Warning: This overwrites all the config, if you want to update only one property,
   * you should use @see getConfigSnapshot first
   * @param config New configuration
   */
  updateConfig(config: INGXLoggerConfig): void {
    this.configEngine.updateConfig(config);
  }

  /**
   * Partially update the logger configuration
   * Only the provided properties will be updated
   * @param partialConfig Partial configuration to merge
   */
  partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
    this.configEngine.partialUpdateConfig(partialConfig);
  }

  /**
   * Get a snapshot of the current logger configuration
   * @returns Current configuration
   */
  getConfigSnapshot(): INGXLoggerConfig {
    return this.configEngine.getConfig();
  }

  /**
   * Flush the server queue immediately
   * Sends all queued logs to the server
   */
  flushServerQueue(): void {
    this.serverService.flushQueue(this.getConfigSnapshot());
  }

  /**
   * Internal logging implementation
   * @param level Log level
   * @param message Message to log
   * @param additional Additional parameters
   */
  private log_internal(
    level: NgxLoggerLevel,
    message?: unknown,
    additional: unknown[] = []
  ): void {
    const config = this.configEngine.getConfig();

    const shouldCallWriter = this.ruleService.shouldCallWriter(level, config, message, additional);
    const shouldCallServer = this.ruleService.shouldCallServer(level, config, message, additional);
    const shouldCallMonitor = this.ruleService.shouldCallMonitor(
      level,
      config,
      message,
      additional
    );

    if (!shouldCallWriter && !shouldCallServer && !shouldCallMonitor) {
      // If nothing is to be called we return
      return;
    }

    const metadata = this.metadataService.getMetadata(level, config, message, additional);
    this.mapperService
      .getLogPosition(config, metadata)
      .pipe(take(1))
      .subscribe((logPosition) => {
        metadata.fileName = logPosition.fileName;
        metadata.lineNumber = logPosition.lineNumber;
        metadata.columnNumber = logPosition.columnNumber;

        if (shouldCallMonitor && this.loggerMonitor) {
          this.loggerMonitor.onLog(metadata, config);
        }
        if (shouldCallWriter) {
          this.writerService.writeMessage(metadata, config);
        }
        if (shouldCallServer) {
          this.serverService.sendToServer(metadata, config);
        }
      });
  }
}
