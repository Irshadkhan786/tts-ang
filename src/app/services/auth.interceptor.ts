import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Authinterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const loginToken = localStorage.getItem("x-auth");
        if(loginToken){
            var cloned = req.clone({
                headers: req.headers.set('x-auth',loginToken)
            })
            return next.handle(cloned)
        }else{
            return next.handle(req);
        }
    }
}