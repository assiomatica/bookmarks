import Bookmark from '../models/bookmark.model';

export default class BookmarkState {
  Bookmarks: Array<Bookmark>;
  BookmarkError: Error;
}

export const initializeState = () => {
  return { Bookmarks: Array<Bookmark>() };
};