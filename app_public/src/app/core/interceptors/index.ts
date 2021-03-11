import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorHandlerInterceptor} from './httpErrorHandler.interceptor';

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true}
]