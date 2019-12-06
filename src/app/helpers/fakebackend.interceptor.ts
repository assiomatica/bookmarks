import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for bookmarks
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/bookmarks') && method === 'POST':
                    return save();
                case url.endsWith('/bookmarks') && method === 'GET':
                    return getBookmarks();
                case url.indexOf('/bookmarks/') != 0 && method === 'DELETE':
                    const urlParts = url.split('/');
                    return del(urlParts[urlParts.length - 1]);
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function save() {
            const bookmark = JSON.parse(body);

            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            return ok(bookmark);
        }

        function del(id) {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

            const newbookmarks = bookmarks.filter(function (el) {
                return el.Id != id;
            });
            localStorage.setItem('bookmarks', JSON.stringify(newbookmarks));

            
            return ok();
        }

        function getBookmarks() {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            return ok(bookmarks);
        }



        // helper functions

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }


        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};