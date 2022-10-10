import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { HttpServiceService } from './Service/http-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, private service : HttpServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthHeaderToAllowedOrigins(request));
  }

  private addAuthHeaderToAllowedOrigins(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let req = request;
    const allowedOrigins = ['http://localhost'];
    //allow everything from same origin  it can be fix to allow a specific oring
    if (!!allowedOrigins.find(origin => request.url.includes(origin.split(":")[0]))) {
      //use eigther okta token  or jwt toke to navigate
      let jwttoken : String ="";
      this.service.token$.subscribe(a=> jwttoken=a);
      const authToken = this._oktaAuth.getAccessToken() ==undefined ? jwttoken  :  this._oktaAuth.getAccessToken();
      //assign token if we have one
      if(authToken!=undefined){
        req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });

      }
    }
    console.log(req);
    console.log("addAuthHeaderToAllowedOrigins");


    return req;
  }

  
}