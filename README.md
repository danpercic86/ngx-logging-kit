[![npm version](https://badge.fury.io/js/ngx-logging-kit.svg)](https://www.npmjs.com/package/ngx-logging-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21-red.svg)](https://angular.io/)

# NGX Logging Kit

> **A modern, feature-rich logging library for Angular 21+ applications**

NGX Logging Kit is a fork of the popular [ngx-logger](https://github.com/dbfannin/ngx-logger) library, updated to work with Angular 21 and modern Angular patterns. Version 21 of this package is **backward compatible** with version 5 of the original ngx-logger, making migration seamless while providing modern Angular syntax and features.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [New Projects](#new-projects)
  - [Migrating from ngx-logger](#migrating-from-ngx-logger)
- [Quick Start](#quick-start)
  - [Standalone Components](#standalone-components)
  - [NgModule-based Applications](#ngmodule-based-applications)
- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

✨ **Modern Angular Support** - Built for Angular 21+ with modern patterns  
🔄 **Backward Compatible** - Drop-in replacement for ngx-logger v5  
📊 **Multiple Log Levels** - TRACE, DEBUG, INFO, LOG, WARN, ERROR, FATAL  
🌐 **Server Logging** - Send logs to your backend server  
🎨 **Custom Color Schemes** - Customize console output colors  
🗺️ **Source Maps Support** - See exact file and line numbers  
📝 **Custom Log Monitoring** - Hook into the logging pipeline  
🔧 **Fully Customizable** - Override any part of the logging behavior  
🧪 **Testing Support** - Built-in testing utilities  
⚡ **Feature-based Configuration** - Configure logging per feature/module

## Installation

### New Projects

Install the package using Angular CLI:

```bash
ng add ngx-logging-kit
```

This command will:
- Install the package
- Optionally run the migration schematic if you're migrating from ngx-logger

Or install manually:

```bash
npm install ngx-logging-kit
# or
yarn add ngx-logging-kit
```

### Migrating from ngx-logger

If you're currently using ngx-logger, migration is simple! See our comprehensive [Migration Guide](docs/migration.md) for detailed instructions.

**Quick migration:**
```bash
ng add ngx-logging-kit
```

The `ng add` command will prompt you to automatically migrate all imports from `ngx-logger` to `ngx-logging-kit`.

Alternatively, use `ng update`:
```bash
ng update ngx-logging-kit --migrate-only --from=ngx-logger
```

## Quick Start

### Standalone Components

For modern standalone Angular applications:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideLogger, NgxLogLevels } from 'ngx-logging-kit';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideLogger({
      level: NgxLogLevels.DEBUG,
      serverLogLevel: NgxLogLevels.ERROR,
      serverLoggingUrl: '/api/logs'
    })
  ]
});
```

### NgModule-based Applications

For traditional NgModule-based applications:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideLogger, NgxLogLevels } from 'ngx-logging-kit';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    provideLogger({
      level: NgxLogLevels.DEBUG,
      serverLogLevel: NgxLogLevels.ERROR,
      serverLoggingUrl: '/api/logs'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

Inject the logger using Angular's modern `inject()` function:

```typescript
import { Component, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logging-kit';

@Component({
  selector: 'app-my-component',
  template: `<h1>My Component</h1>`
})
export class MyComponent {
  private readonly logger = inject(NGXLogger);

  ngOnInit() {
    this.logger.trace('Trace message');
    this.logger.debug('Debug message');
    this.logger.info('Info message');
    this.logger.log('Log message');
    this.logger.warn('Warning message');
    this.logger.error('Error message');
    this.logger.fatal('Fatal message');
    
    // Multiple arguments support
    this.logger.info('User logged in:', { userId: 123, name: 'John' });
  }
}
```

> **Note:** For most browsers, you need to enable "verbose" or "debug" mode in the developer tools to see debug and trace logs.

## Configuration

Basic configuration example:

```typescript
provideLogger({
  level: NgxLogLevels.DEBUG,              // Minimum log level for console
  serverLogLevel: NgxLogLevels.ERROR,     // Minimum log level for server
  serverLoggingUrl: '/api/logs',          // Server endpoint
  disableConsoleLogging: false,           // Disable console output
  enableSourceMaps: true,                 // Show file names and line numbers
  timestampFormat: 'medium',              // Timestamp format
  colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red']
})
```

**Available Log Levels:** `TRACE` | `DEBUG` | `INFO` | `LOG` | `WARN` | `ERROR` | `FATAL` | `OFF`

For detailed configuration options, see the [Configuration Guide](docs/config.md).

## Documentation

- **[Migration Guide](docs/migration.md)** - Migrate from ngx-logger to ngx-logging-kit
- **[Configuration](docs/config.md)** - Detailed configuration options
- **[Features](docs/features.md)** - Server logging, custom monitoring, and more
- **[Customization](docs/customising.md)** - Customize logger behavior
- **[Contributing](docs/contributing.md)** - Contribution guidelines

## Testing

NGX Logging Kit provides testing utilities to help you test your applications:

```typescript
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logging-kit/testing';

TestBed.configureTestingModule({
  imports: [LoggerTestingModule],
  // ... your other test configuration
});
```

All services have mocked classes available in the [testing module](testing/src/lib).

## Contributing

Contributions are welcome! This project maintains the spirit of the original ngx-logger while modernizing it for current Angular versions.

Please see our [Contributing Guide](docs/contributing.md) for details on:
- Code of conduct
- Development setup
- Submitting pull requests
- Reporting issues

## License

MIT © [Dan Percic](mailto:danpercic86@gmail.com)

This project is a fork of [ngx-logger](https://github.com/dbfannin/ngx-logger) by dbfannin and contributors.

### Original Contributors

Special thanks to all the original ngx-logger contributors who made this project possible:
- dbfannin
- martin-reiterer
- danielsogl
- IsNull
- jensengar
- leo6104
- sam-lex
- slindenberg
- yildiraymeric
- th3n3wguy
- bniedermeyer
- jbarrett732
- qortex
- bmtheo
- amilor

---

**Dependencies:**
- @angular/common ^21.0.0
- @angular/core ^21.0.0
