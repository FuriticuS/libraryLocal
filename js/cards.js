class Cards{
    static CONTAINER_CARDS = document.getElementById('table-cards').tBodies[0];
    static ADD_NEWCARD_BTN = document.getElementById('newcard-btn');

    constructor(books, visitors) {
        this.cards = [];
        this.formCards = new FormCards(books, visitors);

        this.init();
    }

    init(){
        this.cards = JSON.parse(localStorage.getItem('cards')) || [];

        this.showCards();

        this.renderCards(this.cards);

        this.formCards.cardsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            this.addNewCard();
        })

        Cards.ADD_NEWCARD_BTN.addEventListener('click', () => {
            console.log(this.formCards, 'add card');
        })
    }

    addNewCard(){
        const dataFormCard = this.formCards.getDataForm();

        this.cards.push(dataFormCard);

        this.formCards.cardsForm.classList.remove('show');
        Cards.ADD_NEWCARD_BTN.innerText = 'New card';

        Cards.CONTAINER_CARDS.insertAdjacentHTML('afterbegin', Cards.createElementCard(dataFormCard));
    }

    showCards(){
        Cards.ADD_NEWCARD_BTN.addEventListener('click', ()=>{
           if(Cards.ADD_NEWCARD_BTN.innerText ==='Close'){
               Cards.ADD_NEWCARD_BTN.innerText = 'New card';
               this.formCards.cardsForm.classList.remove('show');
           } else{
                Cards.ADD_NEWCARD_BTN.innerText = 'Close';
                this.formCards.cardsForm.classList.add('show');
           }
        });
    }

    renderCards(cards){
        Cards.CONTAINER_CARDS.innerHTML = this.createCardsFragment(cards);
    }

    createCardsFragment(cards){
        return cards.reduce((acc, cards) => acc + Cards.createElementCard(cards),'')
    }

    static createElementCard({id, nameVisitor, nameBook, borrowDay, returnDay}){
        return `<tr>
                    <td data-id=${id}>${id}</td>
                    <td>${nameVisitor}</td>
                    <td>${nameBook}</td>
                    <td>${borrowDay}</td>
                    <td>${returnDay}</td>
                </tr>`
    }

    setToLocalStorage(){
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }

}

class FormCards{
    static CONTAINER_CARDS = document.getElementById('table-cards').tBodies[0];
    static SELECT_VISITOR_CARD = document.getElementById('visitor-cards');
    static SELECT_BOOK_CARD = document.getElementById('books-cards');

    constructor(books, visitors) {
        this.cardsForm = document.forms['form-cards'];

        this.visitors = visitors;
        this.books = books;

        this.isReturn = false;
        this.returnRow = null;

        this.init();
    }

    init(){
        this.addOptionNameVisitor(this.visitors);
        this.addOptionNameBooks(this.books);

        FormCards.CONTAINER_CARDS.addEventListener('click', ({target}) => {
            if(target.dataset.btn === 'return-card'){
                const visitorRow = target.closest('[data-id]');
                this.returnRow = visitorRow;
                this.returnBook();
            }
        })
    }

    getDataForm(){
        return{
            id: Math.floor(Math.random()*1000),
            nameVisitor: this.getNameVisitor,
            nameBook: this.getNameBook,
            borrowDay: this.getBorrowDay,
            returnDay: this.getReturnDay
        }
    }

    addOptionNameVisitor(visitors){

        const fragmentVisitors = document.createDocumentFragment();

        visitors.forEach(el => {
            let option = document.createElement('option');
            option.innerText = el.name;
            fragmentVisitors.append(option)
        });

        FormCards.SELECT_VISITOR_CARD.append(fragmentVisitors);
    }

    addOptionNameBooks(books){
        const fragmentBooks = document.createDocumentFragment();

        books.forEach(el => {
            let option = document.createElement('option');
            option.innerText = el.name;
            fragmentBooks.append(option);
        })

        FormCards.SELECT_BOOK_CARD.append(fragmentBooks);
    }

    get getNameVisitor(){
        return FormCards.SELECT_VISITOR_CARD.value;
    }

    get getNameBook(){
        return FormCards.SELECT_BOOK_CARD.value;
    }

    get getBorrowDay(){
        return this.getDate();
    }

    get getReturnDay(){
        if(!this.isReturn){
            return `<button data-btn="return-card">Return</button>`
        }
        else {
            return this.getDate();
        }
    }

    getDate(){
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();

        today = day + '.' + month + '.' + year;

        return today;
    }

    returnBook(){
        console.log('return book');
    }

}


