import { NgModule } from "@angular/core";
import { provideLoggerMock } from "./logger-testing.provider";

/**
 * @deprecated use provideLoggerMock instead
 * @see provideLoggerMock
 */
@NgModule({
    providers: [provideLoggerMock()],
})
export class LoggerTestingModule {}
