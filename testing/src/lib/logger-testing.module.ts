import {NgModule} from '@angular/core';
import {TOKEN_LOGGER_CONFIG} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {
    TOKEN_LOGGER_CONFIG_ENGINE_FACTORY
} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig-engine-factory";
import {LoggerModule} from "../../../projects/ngx-logging-kit/src/lib/logger.module";
import {NGXLogger} from "../../../projects/ngx-logging-kit/src/lib/logger.service";
import {TOKEN_LOGGER_MAPPER_SERVICE} from "../../../projects/ngx-logging-kit/src/lib/mapper/imapper.service";
import {TOKEN_LOGGER_METADATA_SERVICE} from "../../../projects/ngx-logging-kit/src/lib/metadata/imetadata.service";
import {TOKEN_LOGGER_RULES_SERVICE} from "../../../projects/ngx-logging-kit/src/lib/rules/irules.service";
import {TOKEN_LOGGER_SERVER_SERVICE} from "../../../projects/ngx-logging-kit/src/lib/server/iserver.service";
import {NgxLoggerLevel} from "../../../projects/ngx-logging-kit/src/lib/types/logger-level.enum";
import {TOKEN_LOGGER_WRITER_SERVICE} from "../../../projects/ngx-logging-kit/src/lib/writer/iwriter.service";
import {NGXLoggerConfigEngineFactoryMock} from './config-engine-factory.mock';
import {NGXLoggerMock} from './logger.service.mock';
import {NGXLoggerMapperServiceMock} from './mapper.service.mock';
import {NGXLoggerMetadataServiceMock} from './metadata.service.mock';
import {NGXLoggerRulesServiceMock} from './rules.service.mock';
import {NGXLoggerServerServiceMock} from './server.service.mock';
import {NGXLoggerWriterServiceMock} from './writer.service.mock';


@NgModule({
    imports: [LoggerModule],
    providers: [
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: TOKEN_LOGGER_CONFIG, useValue: {level: NgxLoggerLevel.ERROR}},
        {provide: TOKEN_LOGGER_CONFIG_ENGINE_FACTORY, useClass: NGXLoggerConfigEngineFactoryMock},
        {provide: TOKEN_LOGGER_METADATA_SERVICE, useClass: NGXLoggerMetadataServiceMock},
        {provide: TOKEN_LOGGER_RULES_SERVICE, useClass: NGXLoggerRulesServiceMock},
        {provide: TOKEN_LOGGER_MAPPER_SERVICE, useClass: NGXLoggerMapperServiceMock},
        {provide: TOKEN_LOGGER_WRITER_SERVICE, useClass: NGXLoggerWriterServiceMock},
        {provide: TOKEN_LOGGER_SERVER_SERVICE, useClass: NGXLoggerServerServiceMock},
    ]
})
export class LoggerTestingModule {
}
