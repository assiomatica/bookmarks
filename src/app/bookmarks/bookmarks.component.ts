import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as BookmarkActions from '../actions/bookmark.action';
import Bookmark from '../models/bookmark.model';
import BookmarkState from '../states/bookmark.state';

import { VERSION, MatDialog, MatDialogRef, MatSnackBar, MatDialogConfig } from '@angular/material';
import { BookmarkDialogComponent } from '../bookmark-dialog/bookmark-dialog.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

   constructor(private store: Store<BookmarkState>, private dialog: MatDialog) {
    this.bookmark$ = store;
  }

  ngOnInit() {
    console.log("component")
    this.BookmarkSubscription = this.bookmark$
      .pipe(
        map(x => {
          console.log(x);
          this.BookmarkList = x['bookmarks'].Bookmarks;
          this.bookmarkError = x['bookmarks'].BookmarkError;
        })
      )
      .subscribe();
    this.store.dispatch(BookmarkActions.BeginGetBookmarkAction());
    
  }

  bookmark$: Observable<BookmarkState>;
  BookmarkSubscription: Subscription;
  BookmarkList: Bookmark[];

  Name: string = '';
  Url: string = '';
  Group: string = '';

  bookmarkError: Error;

  ngOnDestroy() {
    this.BookmarkSubscription.unsubscribe();
  }

  version = VERSION;

  bookmarkDialogRef: MatDialogRef<BookmarkDialogComponent>;

  openDialog() {
    this.bookmarkDialogRef = this.dialog.open(BookmarkDialogComponent,{
      /* minHeight:'400px',
      minWidth:'300px' */
    });
  }

  deleteBookmark(id) {
    console.log("delete")
    const bookmark: Bookmark = { Id: id , Name: '', Url:'', Group: '' };
    this.store.dispatch(BookmarkActions.BeginDeleteBookmarkAction({ payload: bookmark }));
  }
}

