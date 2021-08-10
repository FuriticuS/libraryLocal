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

        Cards.ADD_NEWCARD_BTN.addEventListener('click', () => {
            console.log('add card');
        })
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

    static createElementCard(cards){
        return `<tr>
                    <td>id</td>
                    <td>nameVisitor</td>
                    <td>nameBook</td>
                    <td>Borrow day</td>
                    <td>Return day</td>
                </tr>`
    }

}

class FormCards{

    static SELECT_VISITOR_CARD = document.getElementById('visitor-cards');
    static SELECT_BOOK_CARD = document.getElementById('books-cards');

    constructor() {
        this.cardsForm = document.forms['form-cards'];

        this.books = [];
        this.visitors = [];

        this.init();
    }

    init(){
        this.books = JSON.parse(localStorage.getItem('books')) || [];
        this.visitors = JSON.parse(localStorage.getItem('visitors')) || [];
    }

    getDataForm(){
        return{
            id: Math.floor(Math.random()*1000),
            nameVisitor: this.getNameVisitor,
            nameBooks: this.getNameBook,
            borrowDay: this.getBorrowDay,
            returnDay: this.getReturnDay
        }
    }

    get getNameVisitor(){

    }

    get getNameBook(){

    }

    get getBorrowDay(){

    }

    get getReturnDay(){

    }

}


