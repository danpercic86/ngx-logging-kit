# Migration Guide: From ngx-logger to ngx-logging-kit

This guide will help you migrate from the original [ngx-logger](https://github.com/dbfannin/ngx-logger) to ngx-logging-kit.

## Why Migrate?

NGX Logging Kit is a fork of ngx-logger that:
- ✅ Supports Angular 21+ with modern patterns
- ✅ Is **backward compatible** with ngx-logger v5
- ✅ Uses modern Angular syntax (standalone components, `inject()`, etc.)
- ✅ Maintains all features from the original library
- ✅ Continues active development and maintenance

## Compatibility

| ngx-logging-kit | Compatible with ngx-logger | Angular Version |
|----------------|---------------------------|-----------------|
| 21.x           | 5.x                       | 21+             |

## Migration Methods

Choose the method that works best for your project:

### Method 1: Automatic Migration with `ng add` (Recommended)

The easiest way to migrate is using the Angular CLI:

```bash
ng add ngx-logging-kit
```

This command will:
1. Install ngx-logging-kit
2. Prompt you to run the migration
3. Automatically replace all `ngx-logger` imports with `ngx-logging-kit`

**What gets migrated:**
- All TypeScript files (`.ts`) in your project
- Import statements from `'ngx-logger'` → `'ngx-logging-kit'`
- Excludes `node_modules` and hidden folders

### Method 2: Using `ng update`

If you already have ngx-logger installed, you can use:

```bash
ng update ngx-logging-kit --migrate-only --from=ngx-logger
```

This runs the same migration schematic as `ng add`.

### Method 3: Manual Migration

If you prefer to migrate manually or need more control:

#### Step 1: Install ngx-logging-kit

```bash
npm install ngx-logging-kit
# or
yarn add ngx-logging-kit
```

#### Step 2: Update Imports

Find and replace all imports in your project:

**Before:**
```typescript
import { NGXLogger, NgxLoggerLevel, LoggerModule } from 'ngx-logger';
```

**After:**
```typescript
import { NGXLogger, NgxLoggerLevel } from 'ngx-logging-kit';
```

#### Step 3: Update Module Imports (if using NgModule)

**Before:**
```typescript
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ]
})
```

**After:**
```typescript
import { provideLogger, NgxLogLevels } from 'ngx-logging-kit';

@NgModule({
  providers: [
    provideLogger({
      level: NgxLogLevels.DEBUG,
      serverLogLevel: NgxLogLevels.ERROR
    })
  ]
})
```

#### Step 4: Update Standalone Bootstrap (if applicable)

**Before:**
```typescript
import { LoggerModule } from 'ngx-logger';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(LoggerModule.forRoot({ ... }))
  ]
});
```

**After:**
```typescript
import { provideLogger } from 'ngx-logging-kit';

bootstrapApplication(AppComponent, {
  providers: [
    provideLogger({ ... })
  ]
});
```

#### Step 5: Update Testing Imports

**Before:**
```typescript
import { LoggerTestingModule } from 'ngx-logger/testing';
```

**After:**
```typescript
import { LoggerTestingModule } from 'ngx-logging-kit/testing';
```

#### Step 6: Remove Old Package

```bash
npm uninstall ngx-logger
# or
yarn remove ngx-logger
```

## Breaking Changes

### ⚠️ Module Import Pattern

The biggest change is moving from `LoggerModule.forRoot()` to `provideLogger()`:

| ngx-logger | ngx-logging-kit |
|-----------|----------------|
| `LoggerModule.forRoot(config)` | `provideLogger(config)` |

### ⚠️ Enum Name Change

The log level enum has been renamed for consistency:

| ngx-logger | ngx-logging-kit |
|-----------|----------------|
| `NgxLoggerLevel` | `NgxLogLevels` |

**Note:** The enum values remain the same: `TRACE`, `DEBUG`, `INFO`, `LOG`, `WARN`, `ERROR`, `FATAL`, `OFF`

## What Stays the Same

✅ **All configuration options** - Same interface, same properties  
✅ **Logger API** - All methods (`trace()`, `debug()`, `info()`, `log()`, `warn()`, `error()`, `fatal()`)  
✅ **Service names** - `NGXLogger` service name unchanged  
✅ **Customization** - All customization interfaces and tokens  
✅ **Features** - Server logging, monitoring, color schemes, source maps, etc.  
✅ **Testing utilities** - Same testing module and mocks

## Configuration Migration

Your existing configuration works as-is! Just change the provider method:

```typescript
// This configuration works in both ngx-logger and ngx-logging-kit
const config = {
  level: NgxLogLevels.DEBUG,
  serverLogLevel: NgxLogLevels.ERROR,
  serverLoggingUrl: '/api/logs',
  disableConsoleLogging: false,
  enableSourceMaps: true,
  timestampFormat: 'medium',
  colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
  customHttpHeaders: new HttpHeaders({ 'X-Custom-Header': 'value' }),
  customHttpParams: new HttpParams(),
  withCredentials: true
};

// Just use provideLogger instead of LoggerModule.forRoot
provideLogger(config);
```

## Customization Migration

If you've customized logger services, the migration is straightforward:

**Before (ngx-logger):**
```typescript
import { LoggerModule, TOKEN_LOGGER_WRITER_SERVICE } from 'ngx-logger';

@NgModule({
  imports: [
    LoggerModule.forRoot(
      { level: NgxLoggerLevel.DEBUG },
      {
        writerProvider: {
          provide: TOKEN_LOGGER_WRITER_SERVICE,
          useClass: CustomWriterService
        }
      }
    )
  ]
})
```

**After (ngx-logging-kit):**
```typescript
import { provideLogger, TOKEN_LOGGER_WRITER_SERVICE } from 'ngx-logging-kit';

@NgModule({
  providers: [
    provideLogger(
      { level: NgxLogLevels.DEBUG },
      {
        writerProvider: {
          provide: TOKEN_LOGGER_WRITER_SERVICE,
          useClass: CustomWriterService
        }
      }
    )
  ]
})
```

## Verification

After migration, verify everything works:

### 1. Build Your Application

```bash
ng build
```

Ensure there are no compilation errors.

### 2. Run Tests

```bash
ng test
```

All tests should pass.

### 3. Check Runtime Behavior

Start your application and verify:
- Console logs appear as expected
- Server logging works (if configured)
- Custom configurations are applied
- Source maps show correct file locations (if enabled)

## Troubleshooting

### Issue: "Cannot find module 'ngx-logger'"

**Cause:** Some imports still reference the old package.

**Solution:** Search your entire project for `'ngx-logger'` and replace with `'ngx-logging-kit'`:

```bash
# Search for remaining references
grep -r "ngx-logger" src/

# Or use your IDE's find-and-replace feature
```

### Issue: "NgxLoggerLevel is not defined"

**Cause:** The enum name changed from `NgxLoggerLevel` to `NgxLogLevels`.

**Solution:** Update the import:

```typescript
// Change this:
import { NgxLoggerLevel } from 'ngx-logging-kit';

// To this:
import { NgxLogLevels } from 'ngx-logging-kit';
```

### Issue: "LoggerModule is not exported"

**Cause:** ngx-logging-kit uses `provideLogger()` instead of `LoggerModule`.

**Solution:** Update your module configuration as shown in the [Module Import Pattern](#️-module-import-pattern) section.

### Issue: Migration schematic doesn't run

**Cause:** The schematic requires user confirmation.

**Solution:** When prompted during `ng add`, answer "Yes" to run the migration. Or run it manually:

```bash
ng generate ngx-logging-kit:ngx-logger-migration
```

### Issue: Custom services not working

**Cause:** Token imports might be incorrect.

**Solution:** Ensure you're importing tokens from `ngx-logging-kit`:

```typescript
import {
  TOKEN_LOGGER_WRITER_SERVICE,
  TOKEN_LOGGER_SERVER_SERVICE,
  TOKEN_LOGGER_RULES_SERVICE,
  // ... other tokens
} from 'ngx-logging-kit';
```

## Need Help?

If you encounter issues during migration:

1. **Check the documentation:** [Configuration Guide](config.md), [Features](features.md), [Customization](customising.md)
2. **Search existing issues:** [GitHub Issues](https://github.com/danpercic86/ngx-logging-kit/issues)
3. **Create a new issue:** Include your Angular version, migration method used, and error messages

## Rollback

If you need to rollback to ngx-logger:

```bash
# Uninstall ngx-logging-kit
npm uninstall ngx-logging-kit

# Reinstall ngx-logger
npm install ngx-logger

# Revert your code changes (use git)
git checkout -- .
```

---

**Migration completed successfully?** Consider giving the project a ⭐ on [GitHub](https://github.com/danpercic86/ngx-logging-kit)!
