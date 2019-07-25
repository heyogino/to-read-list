// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

window.onload = function() {
    window.si
    let storedUris = JSON.parse(localStorage.getItem('storedUris'));
    viewList(storedUris);
};

function viewList(uris) {
    let list = document.getElementById('read-list');
    for (let key in uris) {
        let uri = uris[key].uri;
        let title = uris[key].title;
        let anchor = document.createElement('a');
        let deleteButton = document.createElement('a');
        let deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class', 'material-icons right');
        deleteIcon.innerHTML = 'clear';
        deleteButton.appendChild(deleteIcon);
        deleteButton.setAttribute('class', 'btn-floating btn-small red');
        anchor.href = uri;
        anchor.innerHTML = title;
        anchor.setAttribute('class', 'collection-item');
        anchor.setAttribute('id', key);
        deleteButton.setAttribute('data-key', key);
        deleteButton.addEventListener('click', function(e) {
            let key = this.getAttribute('data-key');
            delete uris[key];
            localStorage.setItem('storedUris', JSON.stringify(uris));
            list.removeChild(this);
            list.removeChild(document.getElementById(key));
        });
        anchor.addEventListener('click', function(e) {
            chrome.tabs.create({url: uri});
        }, false);
        list.appendChild(deleteButton);
        list.appendChild(anchor);
    }
}
