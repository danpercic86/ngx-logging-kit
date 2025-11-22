import {NgxLoggerLevel} from '../../../../ngx-logging-kit/src/public-api';

/**
 * The LogEvent is emitted by the LoggerFormComponent so that the log can be performed by the parent.
 */
export interface LogEvent {
  logMessage: string;
  logType: NgxLoggerLevel;
}
