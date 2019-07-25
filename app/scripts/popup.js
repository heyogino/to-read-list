// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const DUMMY_URIS = {
    'https://developer.mozilla.org/ja/docs/Web/API/GlobalEventHandlers/onload': 'window.onload',
    'https://qiita.com/sqrtxx/items/19fd2114430e9e1fb57f':'Chrome Extension を作って公開する',
    'https://aws.amazon.com/jp/amplify/': 'AWS Amplify（アプリケーションの構築とデプロイ）| AWS',
    'https://reactjs.org/docs/react-without-jsx.html': 'React Without JSX',
    'https://qiita.com/nabepon/items/87bb3b4f1e7bfa342489': 'ReactやVueのJSXについて曖昧に理解する - Qiita'
};
window.onload = function() {
    let storedUriList = JSON.parse(localStorage.getItem('storedUris'));
    // addLinkList(DUMMY_URIS);
    addLinkList(storedUriList);
};

function addLinkList(uris) {
    let list = document.getElementById('read-list');
    for (let key in uris) {
        let uri = uris[key].uri;
        let title = uris[key].title;
        let anchor = document.createElement('a');
        let removeIcon = document.createElement('i');
        let button = document.createElement('button');
        anchor.href = uri;
        anchor.innerHTML = title;
        anchor.setAttribute('class', 'collection-item');
        anchor.addEventListener('click', function(e) {
            chrome.tabs.create({url: uri});
        }, false);
        list.appendChild(anchor);
    }
}
