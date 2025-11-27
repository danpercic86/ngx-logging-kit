[![npm version](https://badge.fury.io/js/ngx-logger.svg)](https://www.npmjs.com/package/ngx-logging-kit)

# NGX Logging Kit

This is a fork of [https://github.com/dbfannin/ngx-logger](https://github.com/dbfannin/ngx-logger)
Version 21 of this package is backward compatible with version 5 of the original NGXLogger, but with modern Angular syntax.

## Installation

```shell
    ng add ngx-logging-kit
```

Using `ng add` to add the package to your project will also ask you to run the migration from `ngx-logger` to `ngx-logging-kit`.
Once installed, you need to provide it:

```typescript
import {provideLogger} from "ngx-logging-kit";
```

The only remaining part is to list the imported module in your application module, passing in a config to initialize the logger.

```typescript

@NgModule({
    declarations: [AppComponent, ...],
    imports:
        [
            provideLogger({
                serverLoggingUrl: '/api/logs',
                level: NgxLogLevels.DEBUG,
                serverLogLevel: NgxLogLevels.ERROR
            }),
            ...
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

To use the Logger, you will need to import it locally, then call one of the logging functions

```typescript
import {Component, inject} from "@angular/core";
import {NGXLogger} from "ngx-logging-kit";

@Component({
    selector: "your-component",
    templateUrl: "./your.component.html",
    styleUrls: ["your.component.scss"],
})
export class YourComponent {
    private readonly logger = inject(NGXLogger);

    constructor() {
        this.logger.error("Your log message goes here");
        this.logger.warn("Multiple", "Argument", "support");
    }
}
```

*For most browsers, you need to enable "verbose" or "debug" mode in the developper tools to see debug logs*

## Configuration

Configuration is sent by the `provideLogger` call
`provideLogger({level: NgxLogLevels.DEBUG})`

For more information about configuration see the [doc](docs/config.md)

## Customise logger behavior

Since version 5 NGXLogger is fully customisable

See how in the [doc](docs/customising.md)

## Features

You can see more of the features supported by NGXLogger in this [doc](docs/features.md)

## Demo App

> To be added

## Dependencies

- @angular/common
- @angular/core

## Testing Your App When Using NGXLogger

If you inject any of the NGX Logging Kit services into your application, you will need to provide them in your Testing Module.

To provide them in your Testing Module:

```typescript
import {LoggerTestingModule} from 'ngx-logging-kit/testing';

TestBed.configureTestingModule({
    imports: [
        LoggerTestingModule
    ],
    ...
});
```

All services have mocked classes that can be used for testing located [here](testing/src/lib)

## Contribute

All are welcome to contribute to NGX Logging Kit.

See the [doc](docs/contributing.md) to know how
