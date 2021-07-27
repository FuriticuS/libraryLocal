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
let visitors;

window.addEventListener('DOMContentLoaded', () => {
    books = new Books();
    visitors = new Visitors();
});

window.addEventListener('unload', () => {
    books?.setToLocalStorage();
    visitors?.setToLocalStorage();
})


