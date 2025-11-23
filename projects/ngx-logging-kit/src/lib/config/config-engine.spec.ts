import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { NgxLogLevels } from "../types/logger-levels";
import { NGXLoggerConfigEngine } from "./config-engine";

describe("NGXLoggerConfigEngine", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    describe("get level", () => {
        it("should return good level", () => {
            const configEngine = new NGXLoggerConfigEngine({ level: NgxLogLevels.ERROR });

            expect(configEngine.level).toEqual(NgxLogLevels.ERROR);
        });
    });

    describe("get serverLogLevel", () => {
        it("should return good serverLogLevel", () => {
            const configEngine = new NGXLoggerConfigEngine({ level: NgxLogLevels.ERROR });

            // When serverLogLevel is not set, it defaults to OFF
            expect(configEngine.serverLogLevel).toBe(NgxLogLevels.OFF);
        });
    });

    describe("updateConfig", () => {
        it("should update config without keeping the reference to the object", () => {
            const configEngine = new NGXLoggerConfigEngine({ level: NgxLogLevels.ERROR });
            const myNewConfig = { level: NgxLogLevels.FATAL, serverLoggingUrl: "test" };

            configEngine.updateConfig(myNewConfig);

            expect(configEngine.getConfig().serverLoggingUrl).toEqual("test");

            myNewConfig.serverLoggingUrl = "changed value";

            // if value here is 'changed value', this means the update config took the reference to the object
            // we don't want that because if the object is changed later it also changes the logger config
            expect(configEngine.getConfig().serverLoggingUrl).toEqual("test");
        });
    });

    describe("getConfig", () => {
        it("should get config without sending the reference to the object", () => {
            const configEngine = new NGXLoggerConfigEngine({
                level: NgxLogLevels.FATAL,
                serverLoggingUrl: "test",
            });

            const config = configEngine.getConfig();

            expect(config.serverLoggingUrl).toEqual("test");

            config.serverLoggingUrl = "changed value";

            // if value here is 'changed value', this means the get config returned the reference to the object
            // we don't want that because if the object is changed later it also changes the logger config
            expect(configEngine.getConfig().serverLoggingUrl).toEqual("test");
        });
    });
});
