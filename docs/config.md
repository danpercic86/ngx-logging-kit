# Config options of NGXLogger

> **Note:** NGX Logging Kit is a fork of [ngx-logger](https://github.com/dbfannin/ngx-logger) and is backward compatible with ngx-logger v5. All configuration options from the original library are supported. See the [Migration Guide](migration.md) if you're migrating from ngx-logger.

## Options

You can see all config details in `INGXLoggerConfig` interface located [here](../projects/ngx-logging-kit/src/lib/config/iconfig.ts)

Some of the options are detailed below :

- `level` {NgxLogLevel}: only log messages of this level or higher (`OFF` disables the logger for the client).
- `disableConsoleLogging` {boolean}: disables console logging (does not disable other feature like server logging or log monitoring).
- `serverLogLevel` {NgxLogLevel}: only send log messages of this level or higher to the server (`OFF` disables the logger for the server).
- `serverLoggingUrl` {string}: URL to POST logs.
- `httpResponseType` {'arraybuffer' | 'blob' | 'text' | 'json'}: the response type of the HTTP Logging request.
- `enableSourceMaps` {boolean}: enables manual parsing of Source Maps
    - Note: In order for the enableSourceMaps flag to work, your app must generate the source maps during the build process. If your using AngularCli you can generate Source Maps by setting `"sourceMap": {"scripts": true}` (or for older version of angularCli `"sourceMap": true`) in your angular.json
- `timestampFormat` {string}: format for the timestamp displayed with each log message. Can be any of the formatting options accepted by the classic Angular [DatePipe](https://angular.io/api/common/DatePipe#pre-defined-format-options).
    - Note: You need to provide DatePipe from @angular/common to use that feature
- `colorScheme` {NGXLoggerColorScheme}: a color scheme that defines which color should be used for each log level
    - Note: the index of the scheme relates to the log level value
- `disableFileDetails` {boolean} (defaults to false). When set to `true`, filename details will not be shown in log messages.
- `proxiedSteps` {number}. That many steps will be ignored in the stack trace to compute the caller location. If you happen to always see the same location reported in the logs (for example a wrapper service of your own), tune this option to skip this step in the stack traces.

`NgxLogLevels` are: `TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF`

## Setting up the config

You can configure the logger using `provideLogger()` in both standalone and NgModule-based applications.

### Standalone Applications

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideLogger, NgxLogLevels } from 'ngx-logging-kit';

bootstrapApplication(AppComponent, {
  providers: [
    provideLogger({ level: NgxLogLevels.ERROR })
  ]
});
```

### NgModule-based Applications

```typescript
import { NgModule } from '@angular/core';
import { provideLogger, NgxLogLevels } from 'ngx-logging-kit';

@NgModule({
  declarations: [AppComponent],
  providers: [
    provideLogger({ level: NgxLogLevels.ERROR })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Updating the config

Once your app is running you might want to update the config.

In that case you can use `updateConfig`:

```typescript
import { Component, inject } from '@angular/core';
import { NGXLogger, NgxLogLevels } from 'ngx-logging-kit';

export class MyComponent {
  private readonly logger = inject(NGXLogger);

  changeLogLevel() {
    this.logger.updateConfig({ level: NgxLogLevels.TRACE });
  }
}
```

> ⚠️ **Warning:** The `updateConfig` method **overwrites** all the config

If you want to update only one field, you can do as follows:

```typescript
// Get the current config
const config = this.logger.getConfigSnapshot();
// Update only one field
config.disableFileDetails = true;
// Set the config
this.logger.updateConfig(config);
```
