# Bookmarks

A simple application to manage a list of bookmarks.

It's created using the Material Design.

To add a bookmark click on the + button in the lower rigth angle of the page.
A Form as dialog will appear, fill the form accordnly.

To remove an entry simpley click on the red button with the trash can icon present on every line.

![Screenshot](https://github.com/assiomatica/bookmarks/blob/master/screenshot.jpeg?raw=true)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Api interceptor

in place of a real api back end an HTTP interceptor is implemented: 

FakeBackendInterceptor

It store the data to the localStorage of the browser.

Before deploy in production please remove it from providers in app.module.ts 

providers: [fakeBackendProvider],





