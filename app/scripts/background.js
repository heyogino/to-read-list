// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(() => {
  // テストコード
  const DUMMY_URIS = {
    'https://qiita.com/howdy39/items/9ac0564da56246472fc5': 'Chrome 拡張機能 ー コンテキストメニュー(ContextType/ItemType）',
  };
  let storedUris = JSON.parse(localStorage.getItem('storedUris'));
  
  localStorage.setItem('storedUris', DUMMY_URIS);
  chrome.contextMenus.create({
    id: "register",
    title: "Register this page",
    type: "normal"
  });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "register") {
    let storedUris = JSON.parse(localStorage.getItem('storedUris'));
    console.log(storedUris);
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
