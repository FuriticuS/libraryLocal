class Cards{
    static CONTAINER_CARDS = document.getElementById('table-cards').tBodies[0];
    static ADD_NEWCARD_BTN = document.getElementById('newcard-btn');

    constructor() {
        this.cards = [];
        this.formCards = new FormCards();

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
                    <td>${id}</td>
                    <td>${nameVisitor}</td>
                    <td>${nameBook}</td>
                    <td>${borrowDay}</td>
                    <td>${returnDay}</td>
                </tr>`
    }

}

class FormCards{

    static SELECT_VISITOR_CARD = document.getElementById('visitor-cards');
    static SELECT_BOOK_CARD = document.getElementById('books-cards');

    constructor() {
        this.cardsForm = document.forms['form-cards'];

        this.visitors = [];
        this.books = [];

        this.init();
    }

    init(){
        this.visitors = JSON.parse(localStorage.getItem('visitors')) || [];
        this.books = JSON.parse(localStorage.getItem('books')) || [];

        this.addOptionNameVisitor(this.visitors);
        this.addOptionNameBooks(this.books);
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
        let optionsVisitor = visitors.map(el => {
            return el.name
        });

        console.log(optionsVisitor);

        let option = document.createElement('option', optionsVisitor);

        return FormCards.SELECT_VISITOR_CARD.insertAdjacentHTML('afterbegin', option);

    }

    addOptionNameBooks(books){
        let optionsBooks = books.map(el => {
            return `<option>${el.name}</option>`
        });

        return FormCards.SELECT_VISITOR_CARD.innerText = optionsBooks;
    }

    get getNameVisitor(){
        return FormCards.SELECT_VISITOR_CARD.value;
    }

    get getNameBook(){
        return FormCards.SELECT_BOOK_CARD.value;
    }

    get getBorrowDay(){
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();

        today = day + '.' + month + '.' + year;

        return today;
    }

    get getReturnDay(){

    }

}


