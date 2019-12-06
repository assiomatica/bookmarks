import { Action, createReducer, on } from '@ngrx/store';
import * as BookmarkActions from '../actions/bookmark.action';
import Bookmark from '../models/bookmark.model';
import BookmarkState, { initializeState } from '../states/bookmark.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(BookmarkActions.GetBookmarkAction, state => state),
  on(BookmarkActions.CreateBookmarkAction, (state: BookmarkState, bookmark: Bookmark) => {
    return { ...state, Bookmarks: [...state.Bookmarks, bookmark], BookmarkError: null };
  }),

  on(BookmarkActions.DeleteBookmarkAction, (state: BookmarkState, bookmark: Bookmark) => {
    return { ...state, Bookmarks: [...state.Bookmarks, bookmark], BookmarkError: null };
  }),

  on(BookmarkActions.SuccessGetBookmarkAction, (state: BookmarkState, { payload }) => {
    return { ...state, Bookmarks: payload };
  }),
  on(BookmarkActions.SuccessCreateBookmarkAction, (state: BookmarkState, { payload }) => {
    console.log("payload: ", payload)
    return { ...state, Bookmarks: [...state.Bookmarks, payload], BookmarkError: null };
  }),
  on(BookmarkActions.ErrorBookmarkAction, (state: BookmarkState, error: Error) => {
    console.log(error);
    return { ...state, BookmarkError: error };
  })
);

export function BookmarkReducer(state: BookmarkState | undefined, action: Action) {
  return reducer(state, action);
}