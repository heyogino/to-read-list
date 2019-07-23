// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(tabs) {
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