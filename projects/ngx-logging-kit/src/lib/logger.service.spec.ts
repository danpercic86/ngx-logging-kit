import { inject, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    NGXLoggerConfigEngineFactoryMock,
    NGXLoggerMapperServiceMock,
    NGXLoggerMetadataServiceMock,
    NGXLoggerRulesServiceMock,
    NGXLoggerServerServiceMock,
    NGXLoggerWriterServiceMock,
} from "../../testing";
import { TOKEN_LOGGER_CONFIG } from "./config/iconfig";
import { TOKEN_LOGGER_CONFIG_ENGINE_FACTORY } from "./config/iconfig-engine-factory";
import { NGXLogger } from "./logger.service";
import { TOKEN_LOGGER_MAPPER_SERVICE } from "./mapper/imapper.service";
import { TOKEN_LOGGER_METADATA_SERVICE } from "./metadata/imetadata.service";
import { TOKEN_LOGGER_RULES_SERVICE } from "./rules/irules.service";
import { TOKEN_LOGGER_SERVER_SERVICE } from "./server/iserver.service";
import { NgxLogLevels } from "./types/logger-levels";
import { TOKEN_LOGGER_WRITER_SERVICE } from "./writer/iwriter.service";

interface LoggerInternal {
    log_internal: (...args: unknown[]) => void;
}

describe("NGXLogger", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NGXLogger,
                { provide: TOKEN_LOGGER_CONFIG, useValue: { level: NgxLogLevels.ERROR } },
                { provide: TOKEN_LOGGER_CONFIG_ENGINE_FACTORY, useClass: NGXLoggerConfigEngineFactoryMock },
                { provide: TOKEN_LOGGER_METADATA_SERVICE, useClass: NGXLoggerMetadataServiceMock },
                { provide: TOKEN_LOGGER_RULES_SERVICE, useClass: NGXLoggerRulesServiceMock },
                { provide: TOKEN_LOGGER_MAPPER_SERVICE, useClass: NGXLoggerMapperServiceMock },
                { provide: TOKEN_LOGGER_WRITER_SERVICE, useClass: NGXLoggerWriterServiceMock },
                { provide: TOKEN_LOGGER_SERVER_SERVICE, useClass: NGXLoggerServerServiceMock },
            ],
        });
    });

    describe("trace", () => {
        it("should call _log with trace", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.trace("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.TRACE, "message", []);
        }));
    });

    describe("debug", () => {
        it("should call _log with debug", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.debug("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.DEBUG, "message", []);
        }));
    });

    describe("info", () => {
        it("should call _log with info", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.info("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.INFO, "message", []);
        }));
    });

    describe("log", () => {
        it("should call _log with log", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.log("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.LOG, "message", []);
        }));
    });

    describe("warn", () => {
        it("should call _log with warn", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.warn("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.WARN, "message", []);
        }));
    });

    describe("error", () => {
        it("should call _log with error", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.error("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.ERROR, "message", []);
        }));
    });

    describe("fatal", () => {
        it("should call _log with fatal", inject([NGXLogger], (logger: NGXLogger) => {
            const logSpy = vi.spyOn(logger as unknown as LoggerInternal, "log_internal");

            logger.fatal("message");

            expect(logSpy).toHaveBeenCalledWith(NgxLogLevels.FATAL, "message", []);
        }));
    });

    describe("level", () => {
        it("should return the level", inject([NGXLogger], (logger: NGXLogger) => {
            expect(logger.level).toEqual(NgxLogLevels.ERROR);
        }));
    });

    describe("serverLogLevel", () => {
        it("should return the serverLogLevel", inject([NGXLogger], (logger: NGXLogger) => {
            expect(logger.serverLogLevel).toBe(NgxLogLevels.OFF);
        }));
    });

    // xdescribe('registerMonitor', () => {
    //   // TODO
    // });

    // xdescribe('updateConfig', () => {
    //   // TODO
    // });

    // xdescribe('getConfigSnapshot', () => {
    //   // TODO
    // });

    describe("log_internal", () => {
        it("should not do anything if nothing should be called", inject(
            [NGXLogger, TOKEN_LOGGER_RULES_SERVICE, TOKEN_LOGGER_METADATA_SERVICE],
            (
                logger: NGXLogger,
                ruleService: NGXLoggerRulesServiceMock,
                metadataService: NGXLoggerMetadataServiceMock,
            ) => {
                vi.spyOn(ruleService, "shouldCallWriter").mockReturnValue(false);
                vi.spyOn(ruleService, "shouldCallServer").mockReturnValue(false);
                vi.spyOn(ruleService, "shouldCallMonitor").mockReturnValue(false);

                const metadataSpy = vi.spyOn(metadataService, "getMetadata");

                logger.error("Test");

                expect(metadataSpy).not.toHaveBeenCalled();
            },
        ));

        it("should not call writer", inject(
            [NGXLogger, TOKEN_LOGGER_RULES_SERVICE, TOKEN_LOGGER_WRITER_SERVICE],
            (
                logger: NGXLogger,
                ruleService: NGXLoggerRulesServiceMock,
                writerService: NGXLoggerWriterServiceMock,
            ) => {
                vi.spyOn(ruleService, "shouldCallWriter").mockReturnValue(false);

                const writerSpy = vi.spyOn(writerService, "writeMessage");

                logger.error("Test");

                expect(writerSpy).not.toHaveBeenCalled();
            },
        ));

        it("should call writer", inject(
            [NGXLogger, TOKEN_LOGGER_RULES_SERVICE, TOKEN_LOGGER_WRITER_SERVICE],
            (
                logger: NGXLogger,
                ruleService: NGXLoggerRulesServiceMock,
                writerService: NGXLoggerWriterServiceMock,
            ) => {
                vi.spyOn(ruleService, "shouldCallWriter").mockReturnValue(true);

                const writerSpy = vi.spyOn(writerService, "writeMessage");

                logger.error("Test");

                expect(writerSpy).toHaveBeenCalled();
            },
        ));

        it("should not call server", inject(
            [NGXLogger, TOKEN_LOGGER_RULES_SERVICE, TOKEN_LOGGER_SERVER_SERVICE],
            (
                logger: NGXLogger,
                ruleService: NGXLoggerRulesServiceMock,
                serverService: NGXLoggerServerServiceMock,
            ) => {
                vi.spyOn(ruleService, "shouldCallServer").mockReturnValue(false);

                const serverSpy = vi.spyOn(serverService, "sendToServer");

                logger.error("Test");

                expect(serverSpy).not.toHaveBeenCalled();
            },
        ));

        it("should call server", inject(
            [NGXLogger, TOKEN_LOGGER_RULES_SERVICE, TOKEN_LOGGER_SERVER_SERVICE],
            (
                logger: NGXLogger,
                ruleService: NGXLoggerRulesServiceMock,
                serverService: NGXLoggerServerServiceMock,
            ) => {
                vi.spyOn(ruleService, "shouldCallServer").mockReturnValue(true);

                const serverSpy = vi.spyOn(serverService, "sendToServer");

                logger.error("Test");

                expect(serverSpy).toHaveBeenCalled();
            },
        ));
    });
});
