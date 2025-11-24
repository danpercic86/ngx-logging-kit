import { TestBed } from "@angular/core/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TOKEN_LOGGER_CONFIG } from "./config/iconfig";
import { TOKEN_LOGGER_CONFIG_ENGINE_FACTORY } from "./config/iconfig-engine-factory";
import { injectLogger } from "./inject-logger";
import { NGXLogger } from "./logger.service";
import { TOKEN_LOGGER_MAPPER_SERVICE } from "./mapper/imapper.service";
import { TOKEN_LOGGER_METADATA_SERVICE } from "./metadata/imetadata.service";
import { TOKEN_LOGGER_RULES_SERVICE } from "./rules/irules.service";
import { TOKEN_LOGGER_SERVER_SERVICE } from "./server/iserver.service";
import { NgxLogLevels } from "./types/logger-levels";
import { TOKEN_LOGGER_WRITER_SERVICE } from "./writer/iwriter.service";

describe("injectLogger", () => {
    let loggerMock: Partial<NGXLogger>;

    beforeEach(() => {
        loggerMock = {
            getConfigSnapshot: vi.fn().mockReturnValue({
                level: NgxLogLevels.DEBUG,
                features: {
                    TEST_FEATURE: {
                        logLevel: NgxLogLevels.ERROR,
                    },
                },
            }),
            logWithConfig: vi.fn(),
            updateConfig: vi.fn(),
            partialUpdateConfig: vi.fn(),
            level: NgxLogLevels.DEBUG,
            serverLogLevel: NgxLogLevels.OFF,
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: NGXLogger, useValue: loggerMock },
                { provide: TOKEN_LOGGER_METADATA_SERVICE, useValue: {} },
                { provide: TOKEN_LOGGER_RULES_SERVICE, useValue: {} },
                { provide: TOKEN_LOGGER_MAPPER_SERVICE, useValue: {} },
                { provide: TOKEN_LOGGER_WRITER_SERVICE, useValue: {} },
                { provide: TOKEN_LOGGER_SERVER_SERVICE, useValue: {} },
                { provide: TOKEN_LOGGER_CONFIG, useValue: {} },
                {
                    provide: TOKEN_LOGGER_CONFIG_ENGINE_FACTORY,
                    useValue: { provideConfigEngine: () => ({}) },
                },
            ],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("should create a logger with context", () => {
        TestBed.runInInjectionContext(() => {
            const logger = injectLogger("TEST_CONTEXT");
            expect(logger).toBeTruthy();
        });
    });

    it("should prepend context to log messages", () => {
        TestBed.runInInjectionContext(() => {
            const logger = injectLogger("TEST_CONTEXT");
            logger.info("test message");

            expect(loggerMock.logWithConfig).toHaveBeenCalledWith(
                NgxLogLevels.INFO,
                expect.anything(),
                "[TEST_CONTEXT] test message",
            );
        });
    });

    it("should use feature specific config if available", () => {
        TestBed.runInInjectionContext(() => {
            const logger = injectLogger("TEST_FEATURE");
            logger.info("test message");

            expect(loggerMock.logWithConfig).toHaveBeenCalledWith(
                NgxLogLevels.INFO,
                expect.objectContaining({
                    level: NgxLogLevels.ERROR,
                }),
                "[TEST_FEATURE] test message",
            );
        });
    });

    it("should use global config if feature config is not available", () => {
        TestBed.runInInjectionContext(() => {
            const logger = injectLogger("OTHER_FEATURE");
            logger.info("test message");

            expect(loggerMock.logWithConfig).toHaveBeenCalledWith(
                NgxLogLevels.INFO,
                expect.objectContaining({
                    level: NgxLogLevels.DEBUG,
                }),
                "[OTHER_FEATURE] test message",
            );
        });
    });
});
