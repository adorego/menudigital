import { Inject, Injectable } from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import {catchError, map, retry, tap} from "rxjs/operators";
import {TOKEN_NAME } from "../state/storage";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor{
    constructor(@Inject(TOKEN_NAME) private token_name: string, public toasterService: ToastrService ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        const token: string = localStorage.getItem(this.token_name);
        //console.log('Interceptor.req', req);
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!req.headers.has('Content-Type')) {
            //req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req).pipe(
            retry(1),
            tap( (evt:any) => {
                if(evt instanceof HttpResponse){
                    if(evt.body && evt.body.success){
                        this.toasterService.success(evt.body.success.message, 
                            evt.body.success.title, { positionClass: 'toast-top-center' });
                    }
                }
            }),
            catchError((error: any) => {
                let errorMessage = '';
                if(error.error instanceof ErrorEvent){
                    //client side error
                    errorMessage = `Error: ${error.error.message}`;
                    this.toasterService.error(error.error.message, error.error.title, { positionClass: 'toast-top-center' });
                }else{
                    errorMessage = `Error status: ${error.status}\nMessage: ${error.message}`;
                    this.toasterService.error(error.error.message, error.error.title, { positionClass: 'toast-top-center' });
                }
                console.log(errorMessage);
                return of(error);
            })
        )
    }

}