class Cards {
    static CONTAINER_CARDS = document.getElementById('table-cards').tBodies[0];
    static ADD_NEWCARD_BTN = document.getElementById('newcard-btn');
    static SORT_CARD_BTN = document.getElementById('sort-btn-cards');
    static SELECT_SORT_CARD = document.getElementById('sort-cards');
    static INPUT_SEARCH_CARD = document.getElementById('search-cards');

    constructor(books, visitors) {
        this.books = books;
        this.idBooks = null;
        this.action = '';

        this.visitors = visitors;

        this.returnRowBook = null;

        this.cards = [];
        this.formCards = new FormCards(this.books.books, visitors);

        this.init();
    }

    init() {
        this.books.changeBookAmount(this.idBooks, this.action);

        this.cards = JSON.parse(localStorage.getItem('cards')) || [];

        this.showCards();

        this.renderCards(this.cards);

        this.formCards.cardsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            this.addNewCard();
        });

        Cards.ADD_NEWCARD_BTN.addEventListener('click', () => {
            this.formCards.addOptionNameBooks(this.books.books);
            this.formCards.addOptionNameVisitor(this.visitors.visitors);
        });

        Cards.CONTAINER_CARDS.addEventListener('click', ({target}) => {
            if (target.dataset.btn === 'return-card') {
                const visitorRow = target.closest('[data-id]');
                this.returnRowBook = visitorRow;
                this.returnBook(+this.returnRowBook.dataset.id);
            }
        });

        Cards.SORT_CARD_BTN.addEventListener('click', () => {
            this.renderSortCards(Cards.SELECT_SORT_CARD.value);
        });

        Cards.INPUT_SEARCH_CARD.addEventListener('input', () => {
            this.renderSearchCards(Cards.INPUT_SEARCH_CARD.value);
        });

    }

    addNewCard() {
        const dataFormCard = this.formCards.getDataForm();
        console.log(dataFormCard);

        this.cards.push(dataFormCard);

        this.formCards.cardsForm.classList.remove('show');
        Cards.ADD_NEWCARD_BTN.innerText = 'New card';

        Cards.CONTAINER_CARDS.insertAdjacentHTML('afterbegin', Cards.createElementCard(dataFormCard));
    }

    showCards() {
        Cards.ADD_NEWCARD_BTN.addEventListener('click', () => {
            if (Cards.ADD_NEWCARD_BTN.innerText === 'Close') {
                Cards.ADD_NEWCARD_BTN.innerText = 'New card';
                this.formCards.cardsForm.classList.remove('show');
            } else {
                Cards.ADD_NEWCARD_BTN.innerText = 'Close';
                this.formCards.cardsForm.classList.add('show');
            }
        });
    }

    renderCards(cards) {
        Cards.CONTAINER_CARDS.innerHTML = this.createCardsFragment(cards);
    }

    createCardsFragment(cards) {
        return cards.reduce((acc, cards) => acc + Cards.createElementCard(cards), '')
    }

    static createElementCard({id, nameVisitor, nameBook, borrowDay, returnDay}) {
        return `<tr data-id=${id}>
                    <td>${id}</td>
                    <td>${nameVisitor}</td>
                    <td>${nameBook}</td>
                    <td>${borrowDay}</td>
                    <td>${returnDay}</td>
                </tr>`
    }

    setToLocalStorage() {
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }

    returnBook(returnBookID) {
        this.formCards.isReturn = true;
        this.returnRowBook = returnBookID;

        const book = this.cards.find(el => +el.id === returnBookID);
        book.returnDay = this.formCards.getDate();
        console.log(book);
        // рендер таблицы?
        this.renderCards(book);
    }

    renderSortCards(sortValue) {
        let sortCardsRows = Array.from(Cards.CONTAINER_CARDS.rows)
            .sort((rowA, rowB) => {
                if (sortValue === '0') {
                    return +rowA.cells[sortValue].textContent - +rowB.cells[sortValue].textContent
                } else {
                    return rowA.cells[sortValue].textContent > rowB.cells[sortValue].textContent
                        ? 1
                        : -1
                }
            });

        Cards.CONTAINER_CARDS.append(...sortCardsRows);
    }

    renderSearchCards(searchValue) {
        let searchCards = this.cards
            .filter(card => {
                return card.nameVisitor.includes(searchValue)
                    || card.id === +searchValue
                    || card.nameBook.includes(searchValue)
                    || card.borrowDay.includes(searchValue)
            });

        this.renderCards(searchCards);
    }

}

class FormCards {
    static SELECT_VISITOR_CARD = document.getElementById('visitor-cards');
    static SELECT_BOOK_CARD = document.getElementById('books-cards');

    constructor(books, visitors) {
        this.cardsForm = document.forms['form-cards'];

        this.visitors = visitors;
        this.books = books;

        this.isReturn = false;

        this.init();
    }

    init() {
        this.addOptionNameVisitor(this.visitors);
        this.addOptionNameBooks(this.books);
    }

    getDataForm() {
        return {
            id: Math.floor(Math.random() * 1000),
            nameVisitor: this.getNameVisitor,
            nameBook: this.getNameBook,
            borrowDay: this.getBorrowDay,
            returnDay: this.getReturnDay,
            idBook: this.getIdBook,
        }
    }

    addOptionNameVisitor(visitors) {

        const fragmentVisitors = document.createDocumentFragment();

        visitors.forEach(el => {
            let option = document.createElement('option');
            option.innerText = el.name;
            fragmentVisitors.append(option)
        });

        FormCards.SELECT_VISITOR_CARD.append(fragmentVisitors);
    }

    addOptionNameBooks(books) {
        const fragmentBooks = document.createDocumentFragment();

        books.forEach(el => {
            if (el.amount === '0') {
                return
            } else {
                let option = document.createElement('option');
                option.value = el.id;
                option.innerText = el.name;
                fragmentBooks.append(option);
            }
        })

        FormCards.SELECT_BOOK_CARD.append(fragmentBooks);
    }

    get getNameVisitor() {
        return FormCards.SELECT_VISITOR_CARD.value;
    }

    get getNameBook() {
        return FormCards.SELECT_BOOK_CARD.value;
    }

    get getIdBook() {
        return FormCards.SELECT_BOOK_CARD.value;
    }

    get getBorrowDay() {
        return this.getDate();
    }

    get getReturnDay() {
        if (!this.isReturn) {
            return `<button data-btn="return-card">Return</button>`
        } else {
            return this.getDate();
        }
    }

    getDate() {
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = today.getFullYear();

        today = day + '.' + month + '.' + year;

        return today;
    }

}


