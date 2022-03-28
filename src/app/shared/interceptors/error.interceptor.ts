import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = { summary: null, detail: null };

                    if (error instanceof HttpErrorResponse) {
                        errorMessage = { summary: 'Error Message', detail: error.message };
                    } else {
                        errorMessage = { summary: 'Error Message', detail: 'Something went wrong' };
                    }

                    this.messageService.add({
                        severity: 'error',
                        summary: errorMessage.summary,
                        detail: errorMessage.detail
                    });

                    return throwError(errorMessage);
                })
            );
    }
}
