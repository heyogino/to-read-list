// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import xxhash from 'xxhash-wasm';
'use strict';

chrome.contextMenus.create({
  id: "register",
  title: "Register this page",
  contexts: ["browser_action"],
  type: "normal"
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "register") {
    let storedUris = JSON.parse(localStorage.getItem('storedUris')) || {};
    let uri = tab.url;
    let title = tab.title != '' ? tab.title : uri;
    xxhash().then(hasher => {
      let hashedUri = hasher.h64(uri);
      storedUris[hashedUri] = {
        "uri": uri,
        "title": title
      };
      localStorage.setItem('storedUris', JSON.stringify(storedUris));
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '../images/icon-16.png',
        title: 'ToReadList',
        message: 'Done Registering!'
      });
    });
  }
}); 
