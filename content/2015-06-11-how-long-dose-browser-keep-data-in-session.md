date: 2015-06-11 00:00
title: How long dose browser keep data in session
slug: how-long-dose-browser-keep-data-in-session
tags: javascript,html

## Background

I develped some web applications. This application use session cookie.
I expected session cookie data is deleted when user close browse window.

But browser keep having data after closing browser window.
I wonder how long dose browser keep data in client storage.

## Outline

survey how long dose typical bower storage keep data.

## Survey

### browser

* Chrome (43.0.2357.81)
* Firefox (38.0.5)
* Safari (8.0.6)
* IOS safari (io 8.3)
* IOS chrome (44.0.2357.51)

All in mack.

### Target

* Cookie（Session or Permanent）
* WebStorage (SessionStorage or LocalStorage)

### How to

check the data is stil alive after those actions.

* reload window
* open another window(tab)
* close window (in mobile, back to home screen and return browser app)
* quit browser and re-open


## test page

http://jsbin.com/mitila/

this page..

* save new data to each storage
* check the data still alive and show result

## Result

### summary


If you want to delete data in client after session Sessionstorage is best but you need to implement expire logic to delete data.
Because some browsers did not delete data after session.

e.g.

SessionStorage was not deleted afeter back to home screen and return browser window in iOS safari, iOS chrome.

### Data

* ●：alive
* ✕：deleted
* ?：unexpected

### Expected result

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|✕|✕|✕|
|permanent cookie|●|●|●|●|
|session storage|●|✕|✕|✕|
|local storage|●|●|●|●|

### Chrome

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|●?|●?|✕|
|permanent cookie|●|●|●|●|
|session storage|●|✕|✕|✕|
|local storage|●|●|●|●|

### Firefox

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|●?|●?|✕|
|permanent cookie|●|●|●|●|
|session storage|●|✕|✕|✕|
|local storage|●|●|●|●|

### Safari

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|●?|●?|✕|
|permanent cookie|●|●|●|●|
|session storage|●|✕|✕|✕|
|local storage|●|●|●|●|

### iOS safari

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|●?|●?|✕|
|permanent cookie|●|●|●|●|
|session storage|●|✕|●?|✕|
|local storage|●|●|●|●|

### iOS chrome

||reload|new window|close|restart|
|-----+------+------+-----+-----|
|session cookie|●|●?|●?|●?|
|permanent cookie|●|●|●|●|
|session storage|●|✕|●?|✕|
|local storage|●|●|●|●|
