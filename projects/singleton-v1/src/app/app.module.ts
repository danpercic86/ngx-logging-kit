import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoggerModule, NgxLoggerLevel} from '../../../ngx-logging-kit/src/public-api';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
    })], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
