import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoggerModule, NgxLoggerLevel} from '../../../ngx-logging-kit/src/public-api';

import {AppComponent} from './app.component';
import {LogConfigComponent} from './log-config/log-config.component';
import {LoggerFormComponent} from './logger-form/logger-form.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {CustomInstanceComponent} from './custom-instance/custom-instance.component';

@NgModule({
  declarations: [AppComponent, LogConfigComponent, LoggerFormComponent, CustomInstanceComponent],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
