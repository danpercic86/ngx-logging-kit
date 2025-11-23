import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { NgxLogLevels } from "../types/logger-levels";
import { NGXLoggerMapperService } from "./mapper.service";

describe("NGXLoggerMapperService", () => {
    let mapper: NGXLoggerMapperService;
    const proxiedSteps = -2; // This is the number of call that are ignored by calling the mapper directly (instead of using loggerService)

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NGXLoggerMapperService, provideHttpClient(withInterceptorsFromDi())],
        });

        mapper = TestBed.inject(NGXLoggerMapperService);
    });

    describe("getLogPosition", () => {
        it("should return good logPosition", () => {
            mapper
                .getLogPosition(
                    { level: NgxLogLevels.ERROR, enableSourceMaps: false, proxiedSteps },
                    { level: NgxLogLevels.ERROR, message: "test" },
                )
                .subscribe(result => {
                    console.log(result);
                    expect(result).toEqual({
                        fileName: "mapper.service.spec.ts",
                        lineNumber: 22,
                        columnNumber: 18,
                    });
                });
        });
    });
});
