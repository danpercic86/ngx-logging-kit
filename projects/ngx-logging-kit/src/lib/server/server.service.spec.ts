import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NgxLogLevels } from "../types/logger-levels";
import { NGXLoggerServerService } from "./server.service";

describe("NGXLoggerServerService", () => {
    let server: NGXLoggerServerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NGXLoggerServerService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        server = TestBed.inject(NGXLoggerServerService);
    });

    describe("sendToServer", () => {
        it("should use customised requestbody", () => {
            vi.spyOn(server as any, "customiseRequestBody").mockReturnValue({
                message: "customised",
            });

            server.sendToServer(
                {
                    message: "original message",
                    level: NgxLogLevels.DEBUG,
                },
                { level: NgxLogLevels.DEBUG },
            );

            // We want to make sure the customiseRequestBody is used
            const req = httpMock.expectOne(req => req.body.message === "customised");
            expect(req).toBeTruthy();
            httpMock.verify();
        });

        it("should use secureMessage", () => {
            server.sendToServer(
                {
                    message: { complexMessage: "complex" },
                    level: NgxLogLevels.DEBUG,
                },
                { level: NgxLogLevels.DEBUG },
            );

            // We want to make sure the message has been secured (json to string in this example)
            const req = httpMock.expectOne(req => typeof req.body.message === "string");
            expect(req).toBeTruthy();
            httpMock.verify();
        });

        it("should use secureAdditionalParameters", () => {
            server.sendToServer(
                {
                    message: "message",
                    additional: [new Error("test")],
                    level: NgxLogLevels.DEBUG,
                },
                { level: NgxLogLevels.DEBUG },
            );

            // We want to make sure the additional has been secured
            const req = httpMock.expectOne(req => {
                // Additional should be an array
                if (!Array.isArray(req.body.additional)) {
                    return false;
                }
                // Checking that the error was changed into a string
                return typeof req.body.additional[0] === "string";
            });
            expect(req).toBeTruthy();
            httpMock.verify();
        });
    });
});
