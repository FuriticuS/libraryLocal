let menu = document.querySelector('.menu');

menu.addEventListener('click', ({target}) => {
    let targetAttr = target.dataset.btn;

    switch (targetAttr) {
        case 'books':
            bookHidden(targetAttr);
            return;
        case 'visitors':
            bookHidden(targetAttr);
            return;
        case 'cards':
            bookHidden(targetAttr);
            return;
        case 'statistics':
            bookHidden(targetAttr);
            return;
    }
});

let books = document.getElementById('books');
let visitors = document.getElementById('visitors');
let cards = document.getElementById('cards');
let statistics = document.getElementById('statistics');

function bookHidden(targetAttr){
    if(targetAttr==='books'){
        books.hidden = false;
        visitors.hidden=true;
        cards.hidden=true;
        statistics.hidden=true;
    }

    if(targetAttr==='visitors'){
        books.hidden = true;
        visitors.hidden=false;
        cards.hidden=true;
        statistics.hidden=true;
    }

    if(targetAttr==='cards'){
        books.hidden = true;
        visitors.hidden=true;
        cards.hidden=false;
        statistics.hidden=true;
    }

    if(targetAttr==='statistics'){
        books.hidden = true;
        visitors.hidden=true;
        cards.hidden=true;
        statistics.hidden=false;
    }

}

window.addEventListener('DOMContentLoaded', () => {
    const books = new Books();

    console.log(books);
});

window.addEventListener('unload', () => {
    books.setToLocalStorage();
})


