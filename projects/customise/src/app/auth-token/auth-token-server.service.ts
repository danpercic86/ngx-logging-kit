import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NGXLoggerServerService} from "../../../../ngx-logging-kit/src/public-api";

@Injectable()
export class AuthTokenServerService extends NGXLoggerServerService {

  protected override alterHttpRequest(httpRequest: HttpRequest<any>): HttpRequest<any> {
    // Alter httpRequest by adding auth token to header
    httpRequest = httpRequest.clone({
      setHeaders: {
        ['Authorization']: 'Bearer MyToken',
      },
    });
    return httpRequest;
  }
}
