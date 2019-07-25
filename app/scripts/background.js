// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "register",
    title: "Register this page",
    contexts: ["browser_action"],
    type: "normal"
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "register") {
    let storedUris = JSON.parse(localStorage.getItem('storedUris'));
    console.log("Register this page!");
  }
}); 

chrome.browserAction.onClicked.addListener(tabs => {
  // background.js
  let storedUris = JSON.parse(localStorage.getItem('storedUris')) || {};
  let title = document.getElementsByTagName('title');
  let uri = document.URL;
  let titleText = title.length > 0 ? title[0].innerText : uri;
  // Object.defineProperties(storedUris, { uri: titleText });
  storedUris.uri = titleText;
  let uris = JSON.stringify(storedUris);
  localStorage.setItem('storedUris', uris);
  console.log(JSON.parse(localStorage.getItem('storedUris')));
});
