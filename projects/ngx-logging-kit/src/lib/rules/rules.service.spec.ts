import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NgxLogLevels } from "../types/logger-levels";
import { NGXLoggerRulesService } from "./rules.service";

describe("NGXLoggerRulesService", () => {
    let rulesService: NGXLoggerRulesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NGXLoggerRulesService],
        });

        rulesService = TestBed.inject(NGXLoggerRulesService);
    });

    describe("shouldCallWriter", () => {
        it("should return good value", () => {
            expect(rulesService.shouldCallWriter(NgxLogLevels.ERROR, { level: NgxLogLevels.ERROR })).toBe(
                true,
            );
            expect(rulesService.shouldCallWriter(NgxLogLevels.TRACE, { level: NgxLogLevels.ERROR })).toBe(
                false,
            );
            expect(
                rulesService.shouldCallWriter(NgxLogLevels.ERROR, {
                    level: NgxLogLevels.ERROR,
                    disableConsoleLogging: true,
                }),
            ).toBe(false);
            expect(
                rulesService.shouldCallWriter(NgxLogLevels.ERROR, {
                    level: NgxLogLevels.ERROR,
                    disableConsoleLogging: false,
                }),
            ).toBe(true);
        });
    });

    describe("shouldCallServer", () => {
        it("should return good value", () => {
            expect(
                rulesService.shouldCallServer(NgxLogLevels.ERROR, {
                    level: NgxLogLevels.ERROR,
                    serverLogLevel: NgxLogLevels.ERROR,
                    serverLoggingUrl: "dummy",
                }),
            ).toBe(true);
            expect(
                rulesService.shouldCallServer(NgxLogLevels.TRACE, {
                    level: NgxLogLevels.ERROR,
                    serverLogLevel: NgxLogLevels.ERROR,
                    serverLoggingUrl: "dummy",
                }),
            ).toBe(false);
            // no server logging url so the server should not be called
            expect(
                rulesService.shouldCallServer(NgxLogLevels.ERROR, {
                    level: NgxLogLevels.ERROR,
                    serverLogLevel: NgxLogLevels.ERROR,
                }),
            ).toBe(false);
        });
    });

    describe("shouldCallMonitor", () => {
        it("should return good value", () => {
            vi.spyOn(rulesService, "shouldCallServer").mockReturnValue(false);
            vi.spyOn(rulesService, "shouldCallWriter").mockReturnValue(false);

            expect(rulesService.shouldCallMonitor(null as any, null as any)).toBe(false);

            rulesService.shouldCallServer = vi.fn().mockReturnValue(true);
            rulesService.shouldCallWriter = vi.fn().mockReturnValue(false);

            expect(rulesService.shouldCallMonitor(null as any, null as any)).toBe(true);

            rulesService.shouldCallServer = vi.fn().mockReturnValue(false);
            rulesService.shouldCallWriter = vi.fn().mockReturnValue(true);

            expect(rulesService.shouldCallMonitor(null as any, null as any)).toBe(true);

            rulesService.shouldCallServer = vi.fn().mockReturnValue(true);
            rulesService.shouldCallWriter = vi.fn().mockReturnValue(true);

            expect(rulesService.shouldCallMonitor(null as any, null as any)).toBe(true);
        });
    });
});
