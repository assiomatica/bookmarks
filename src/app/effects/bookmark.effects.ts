import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BookmarkActions from '../actions/bookmark.action';
import Bookmark from '../models/bookmark.model';

@Injectable()
export class BookmarkEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  private ApiURL: string = 'http://localhost:5000/api/bookmarks';

  GetBookmarks$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BookmarkActions.BeginGetBookmarkAction),
      mergeMap(action =>
        this.http.get(this.ApiURL).pipe(
          map((data: Bookmark[]) => {
            return BookmarkActions.SuccessGetBookmarkAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(BookmarkActions.ErrorBookmarkAction(error));
          })
        )
      )
    )
  );
  

  CreateBookmarks$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BookmarkActions.BeginCreateBookmarkAction),
      mergeMap(action =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Bookmark) => {
              console.log("post data: ", data)
              return BookmarkActions.SuccessCreateBookmarkAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(BookmarkActions.ErrorBookmarkAction(error));
            })
          )
      )
    )
  );

  DeleteBookmark$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BookmarkActions.BeginDeleteBookmarkAction),
      mergeMap(action => 
        this.http
          .delete(this.ApiURL + '/' + action.payload.Id, {
            // headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Bookmark) => {
              console.log("post data: ", data)
              return BookmarkActions.SuccessDeleteBookmarkAction();
            }),
            catchError((error: Error) => {
              return of(BookmarkActions.ErrorBookmarkAction(error));
            })
          )
      )
    )
  );

  
}