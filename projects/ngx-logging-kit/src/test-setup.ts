import { EnvironmentProviders, provideZonelessChangeDetection } from "@angular/core";

export default [provideZonelessChangeDetection()] satisfies EnvironmentProviders[];
