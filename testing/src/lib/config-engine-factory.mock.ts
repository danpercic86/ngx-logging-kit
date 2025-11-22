import {Injectable} from '@angular/core';
import {INGXLoggerConfig} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig";
import {INGXLoggerConfigEngine} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig-engine";
import {INGXLoggerConfigEngineFactory} from "../../../projects/ngx-logging-kit/src/lib/config/iconfig-engine-factory";
import {NGXLoggerConfigEngineMock} from './config-engine.mock';

@Injectable()
export class NGXLoggerConfigEngineFactoryMock implements INGXLoggerConfigEngineFactory {

  provideConfigEngine(config: INGXLoggerConfig): INGXLoggerConfigEngine {
    return new NGXLoggerConfigEngineMock();
  }

}
