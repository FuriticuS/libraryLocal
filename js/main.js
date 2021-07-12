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

window.addEventListener('DOMContentLoaded', () => {
    const books = new Books();

    console.log(books);
});

window.addEventListener('unload', () => {
    books.setToLocalStorage();
})


