import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { StoreModule } from '@ngrx/store';
import { BookmarkReducer } from './reducers/bookmark.reducer';
import { AppMaterialModule } from './app.material.module';
//import { StorageServiceModule } from 'ngx-webstorage-service';

import { BookmarkEffects } from './effects/bookmark.effects';
import { fakeBackendProvider } from './helpers/fakebackend.interceptor';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BookmarkDialogComponent } from './bookmark-dialog/bookmark-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { GroupByPipe } from './helpers/group.by.pipe'


@NgModule({
  declarations: [
    AppComponent,
    BookmarksComponent,
    BookmarkDialogComponent,
    GroupByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ bookmarks: BookmarkReducer }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    // StorageServiceModule,
    EffectsModule.forRoot([BookmarkEffects])
  ],
  entryComponents: [BookmarkDialogComponent],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
