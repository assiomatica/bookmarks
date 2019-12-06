import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import * as BookmarkActions from '../actions/bookmark.action';
import Bookmark from '../models/bookmark.model';
import BookmarkState from '../states/bookmark.state';
import * as uuid from 'uuid';

export interface Group {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bookmark-dialog',
  templateUrl: './bookmark-dialog.component.html',
  styleUrls: ['./bookmark-dialog.component.css']
})
export class BookmarkDialogComponent implements OnInit {

  form: FormGroup;

  groups: Group[] = [
    {value: 'work', viewValue: 'Work'},
    {value: 'leisure', viewValue: 'Leisure'},
    {value: 'personal', viewValue: 'Personal'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookmarkDialogComponent>,
    private store: Store<BookmarkState>
) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      Name: '',
      Url: '',
      Group: ''
    });
    /*
    this.form.patchValue({
      group: this.groups ? this.groups[0] : 'None'
    });
    */
  }
  onCloseDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
    // console.log(this.form.value) 
    this.createBookmark()
  }

  createBookmark() {
    console.log("create")
    const bookmark: Bookmark = { Id: uuid.v4() , Name: this.form.value.Name, Url:this.form.value.Url, Group: this.form.value.Group };
    this.store.dispatch(BookmarkActions.BeginCreateBookmarkAction({ payload: bookmark }));
    this.form.value.Name = '';
    this.form.value.Url = '';
    this.form.value.Group = '';
  }

}
