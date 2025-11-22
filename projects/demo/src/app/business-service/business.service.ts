import {inject, Injectable} from '@angular/core';
import {NGXLogger, NgxLoggerLevel} from '../../../../ngx-logging-kit/src/public-api';


@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    private logger = inject(NGXLogger);

    constructor() {
        const modifiedConfig = this.logger.getConfigSnapshot();
        modifiedConfig.level = NgxLoggerLevel.TRACE;
        this.logger.updateConfig(modifiedConfig);
    }


    doBusiness(): void {

        // Even if the appmodule has set ERROR level, this should be printed because we are using local instance of logger
        // And for that local instance the level is set to TRACE
        this.logger.trace('I do business');

        // Do stuff
    }
}
