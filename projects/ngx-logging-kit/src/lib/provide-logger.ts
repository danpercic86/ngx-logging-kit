import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { INGXLoggerConfig, TOKEN_LOGGER_CONFIG } from './config/iconfig';
import { NGXLoggerConfigEngineFactory } from './config/config-engine-factory';
import { TOKEN_LOGGER_CONFIG_ENGINE_FACTORY } from './config/iconfig-engine-factory';
import { NGXLoggerMetadataService } from './metadata/metadata.service';
import { TOKEN_LOGGER_METADATA_SERVICE } from './metadata/imetadata.service';
import { NGXLoggerRulesService } from './rules/rules.service';
import { TOKEN_LOGGER_RULES_SERVICE } from './rules/irules.service';
import { NGXLoggerMapperService } from './mapper/mapper.service';
import { TOKEN_LOGGER_MAPPER_SERVICE } from './mapper/imapper.service';
import { NGXLoggerWriterService } from './writer/writer.service';
import { TOKEN_LOGGER_WRITER_SERVICE } from './writer/iwriter.service';
import { NGXLoggerServerService } from './server/server.service';
import { TOKEN_LOGGER_SERVER_SERVICE } from './server/iserver.service';
import { NGXLogger } from './logger.service';
import { CustomNGXLoggerService } from './custom-logger.service';

export interface LoggerOptions {
  configEngineFactoryProvider?: Provider;
  metadataProvider?: Provider;
  ruleProvider?: Provider;
  mapperProvider?: Provider;
  writerProvider?: Provider;
  serverProvider?: Provider;
}

export function provideLogger(config: INGXLoggerConfig, options: LoggerOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TOKEN_LOGGER_CONFIG, useValue: config },
    options.configEngineFactoryProvider || { provide: TOKEN_LOGGER_CONFIG_ENGINE_FACTORY, useClass: NGXLoggerConfigEngineFactory },
    options.metadataProvider || { provide: TOKEN_LOGGER_METADATA_SERVICE, useClass: NGXLoggerMetadataService },
    options.ruleProvider || { provide: TOKEN_LOGGER_RULES_SERVICE, useClass: NGXLoggerRulesService },
    options.mapperProvider || { provide: TOKEN_LOGGER_MAPPER_SERVICE, useClass: NGXLoggerMapperService },
    options.writerProvider || { provide: TOKEN_LOGGER_WRITER_SERVICE, useClass: NGXLoggerWriterService },
    options.serverProvider || { provide: TOKEN_LOGGER_SERVER_SERVICE, useClass: NGXLoggerServerService },
    NGXLogger,
    CustomNGXLoggerService,
  ]);
}
