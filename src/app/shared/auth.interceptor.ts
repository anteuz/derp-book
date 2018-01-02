import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';

/*
 * This class is used to intercept the HTTP Requests with authentication token (JWT)
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const reqClone = req.clone({
      params: req.params.append('auth', this.authService.getToken())
    });

    return next.handle(reqClone);
  }
}
