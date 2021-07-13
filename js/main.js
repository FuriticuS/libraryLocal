let menu = document.querySelector('.menu');

menu.addEventListener('click', ({target}) => {
    let targetAttr = target.dataset.btn;

    switch (targetAttr) {
        case 'books':
            switchTabs(targetAttr);
            return;
        case 'visitors':
            switchTabs(targetAttr);
            return;
        case 'cards':
            switchTabs(targetAttr);
            return;
        case 'statistics':
            switchTabs(targetAttr);
            return;
    }
});

let tabs = document.querySelectorAll('.tab');

function switchTabs(targetAttr){
    tabs.forEach(el => {
        if(targetAttr === el.dataset.tab){
            el.hidden = false;
        }
        else {
            el.hidden = true;
        }
    })

}

let books;

window.addEventListener('DOMContentLoaded', () => {
    books = new Books();
    showBook(books);
});

let tbodyBooks = document.getElementById('table-books').tBodies[0];
function showBook(books){
    let book = JSON.parse(localStorage.getItem('books')) || [];
    console.log(book);
}

window.addEventListener('unload', () => {
    books?.setToLocalStorage();
})


