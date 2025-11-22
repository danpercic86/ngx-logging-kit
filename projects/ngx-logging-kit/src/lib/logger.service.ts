import {inject, Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {INGXLoggerConfig, TOKEN_LOGGER_CONFIG} from './config/iconfig';
import {INGXLoggerConfigEngine} from './config/iconfig-engine';
import {INGXLoggerConfigEngineFactory, TOKEN_LOGGER_CONFIG_ENGINE_FACTORY} from './config/iconfig-engine-factory';
import {INGXLoggerMapperService, TOKEN_LOGGER_MAPPER_SERVICE} from './mapper/imapper.service';
import {INGXLoggerMetadataService, TOKEN_LOGGER_METADATA_SERVICE} from './metadata/imetadata.service';
import {INGXLoggerMonitor} from './monitor/ilogger-monitor';
import {INGXLoggerRulesService, TOKEN_LOGGER_RULES_SERVICE} from './rules/irules.service';
import {INGXLoggerServerService, TOKEN_LOGGER_SERVER_SERVICE} from './server/iserver.service';
import {NgxLoggerLevel} from './types/logger-level.enum';
import {INGXLoggerWriterService, TOKEN_LOGGER_WRITER_SERVICE} from './writer/iwriter.service';

@Injectable({
  providedIn: 'root'
})
export class NGXLogger {
  private readonly metadataService = inject<INGXLoggerMetadataService>(TOKEN_LOGGER_METADATA_SERVICE);
  private readonly ruleService = inject<INGXLoggerRulesService>(TOKEN_LOGGER_RULES_SERVICE);
  private readonly mapperService = inject<INGXLoggerMapperService>(TOKEN_LOGGER_MAPPER_SERVICE);
  private readonly writerService = inject<INGXLoggerWriterService>(TOKEN_LOGGER_WRITER_SERVICE);
  private readonly serverService = inject<INGXLoggerServerService>(TOKEN_LOGGER_SERVER_SERVICE);

  private _loggerMonitor?: INGXLoggerMonitor;
  private readonly configEngine: INGXLoggerConfigEngine;

  constructor() {
    const config = inject<INGXLoggerConfig>(TOKEN_LOGGER_CONFIG);
    const configEngineFactory = inject<INGXLoggerConfigEngineFactory>(TOKEN_LOGGER_CONFIG_ENGINE_FACTORY);

    this.configEngine = configEngineFactory.provideConfigEngine(config);
  }

  /** Get a readonly access to the level configured for the NGXLogger */
  get level(): NgxLoggerLevel {
    return this.configEngine.level;
  }

  /** Get a readonly access to the serverLogLevel configured for the NGXLogger */
  get serverLogLevel(): NgxLoggerLevel {
    return this.configEngine.serverLogLevel;
  }

  trace(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.TRACE, message, additional);
  }

  debug(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.DEBUG, message, additional);
  }

  info(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.INFO, message, additional);
  }

  log(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.LOG, message, additional);
  }

  warn(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.WARN, message, additional);
  }

  error(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.ERROR, message, additional);
  }

  fatal(message?: any | (() => any), ...additional: any[]): void {
    this._log(NgxLoggerLevel.FATAL, message, additional);
  }

  /**
   * Register a INGXLoggerMonitor that will be trigger when a log is either written or sent to server
   *
   * There is only one monitor, registering one will overwrite the last one if there was one
   * @param monitor
   */
  registerMonitor(monitor: INGXLoggerMonitor): void {
    this._loggerMonitor = monitor;
  }

  /** Set config of logger
   *
   * Warning : This overwrites all the config, if you want to update only one property, you should use @see getConfigSnapshot before
   */
  updateConfig(config: INGXLoggerConfig): void {
    this.configEngine.updateConfig(config);
  }

  partialUpdateConfig(partialConfig: Partial<INGXLoggerConfig>): void {
    this.configEngine.partialUpdateConfig(partialConfig);
  }

  /** Get config of logger */
  getConfigSnapshot(): INGXLoggerConfig {
    return this.configEngine.getConfig();
  }

  /**
   * Flush the server queue
   */
  flushServerQueue(): void {
    this.serverService.flushQueue(this.getConfigSnapshot());
  }

  private _log(level: NgxLoggerLevel, message?: any | (() => any), additional: any[] = []): void {
    const config = this.configEngine.getConfig();

    const shouldCallWriter = this.ruleService.shouldCallWriter(level, config, message, additional);
    const shouldCallServer = this.ruleService.shouldCallServer(level, config, message, additional);
    const shouldCallMonitor = this.ruleService.shouldCallMonitor(level, config, message, additional);

    if (!shouldCallWriter && !shouldCallServer && !shouldCallMonitor) {
      // If nothing is to be called we return
      return;
    }

    const metadata = this.metadataService.getMetadata(level, config, message, additional);
    this.mapperService.getLogPosition(config, metadata).pipe(take(1)).subscribe(logPosition => {
      if (logPosition) {
        metadata.fileName = logPosition.fileName;
        metadata.lineNumber = logPosition.lineNumber;
        metadata.columnNumber = logPosition.columnNumber;
      }

      if (shouldCallMonitor && this._loggerMonitor) {
        this._loggerMonitor.onLog(metadata, config);
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
