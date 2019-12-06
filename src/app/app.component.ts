import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar , MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookmarks';
}

/*
@Component({
  template: `
    <h1 matDialogTitle>Add a Bookmark</h1>
    <div matDialogContent>
      <form [formGroup]="profileForm">
        <mat-form-field>
          <label>
            Name
            <input matInput  formControlName="Name">
          </label>
        </mat-form-field>
        <mat-form-field>
          <label>
            Url
            <input matInput formControlName="Url">
          </label>
        </mat-form-field>
      </form>
    </div>
    <div matDialogActions>
      <button mat-raised-button [matDialogClose]="dialogInput.value">Save</button>
    </div>
  `,
})


export class DialogContentComponent {

  constructor(@Optional() public dialogRef: MatDialogRef<DialogContentComponent>) { }

  bookmarkForm = new FormGroup({
    Name: new FormControl(''),
    Url: new FormControl(''),
    Group: new FormControl(''),
  });

  getForm() {
    return this.bookmarkForm;
  }
}
*/
