class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    static SHOW_FORM_BTN = document.getElementById('add-btn-books');
    static SORT_BOOKS_SELECT = document.getElementById('sort-books');
    static SORT_BOOKS_BTN = document.getElementById('sort-books-btn');
    static SEARCH_BOOKS_INPUT = document.getElementById('search-books');

    constructor() {
        this.books = []
        this.form = new FormBooks();

        this.init();
    }

    init() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];

        this.renderBooks(this.books);

        this.showFormBook();

        this.form.bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewBook();
        });

        Books.SORT_BOOKS_BTN.addEventListener('click', ()=> {
            this.renderSortBooksTable(Books.SORT_BOOKS_SELECT.value);
        });

        Books.SEARCH_BOOKS_INPUT.addEventListener('input', ()=> {
            this.renderSearchBooks(Books.SEARCH_BOOKS_INPUT.value);
        })
    }

    showFormBook() {
        Books.SHOW_FORM_BTN.addEventListener('click', () => {
            if (Books.SHOW_FORM_BTN.innerText === 'Close') {
                Books.SHOW_FORM_BTN.innerText = 'Add Book';
                this.form.bookForm.classList.remove('show');
            } else {
                Books.SHOW_FORM_BTN.innerText = 'Close';
                this.form.bookForm.classList.add('show');
            }
        });
    }

    addNewBook() {
        const dataFormBook = this.form.getDataForm();
        // form validation
        if(!Object.values(dataFormBook).every(el => el)) {
            Array.from(this.form.bookForm).forEach( el =>{
                if(el.value === '' && el.tagName === 'INPUT'){
                    el.style.border = '1px solid red';
                }
            })
            return
        }

        this.books.push(dataFormBook);

        this.form.bookForm.classList.remove('show');
        Books.SHOW_FORM_BTN.innerText = 'Add Book';

        Books.CONTAINER.insertAdjacentHTML('afterbegin', Books.createElement(dataFormBook));
    }

    createBooksFragmet(books){
        return books.reduce( (acc,books) => acc + Books.createElement(books) , '');
    }

    static createElement({id, name, author, year, who, pages, amount}) {
        return `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${author}</td>
                    <td>${year}</td>
                    <td>${who}</td>
                    <td>${pages}</td>
                    <td>${amount}</td>
                    <td><button data-btn="edit-book">Edit</button></td>
                </tr>`
    }

    renderBooks(books = []){
        Books.CONTAINER.innerHTML = this.createBooksFragmet(books);
    }

    renderSortBooksTable(sortValue){
        console.log(sortValue, typeof sortValue);
        let sortedRows = Array.from(Books.CONTAINER.rows)
            .sort((rowA, rowB) => {

                if(sortValue === '0' || sortValue === '3' || sortValue === '5' || sortValue === '6'){
                    return +rowA.cells[sortValue].textContent - +rowB.cells[sortValue].textContent
                }
                else {
                    return rowA.cells[sortValue].textContent > rowB.cells[sortValue].textContent
                        ? 1 : -1
                }

            });

        Books.CONTAINER.append(...sortedRows);
    }

    renderSearchBooks(searchValue){
        let searchRows = this.books
            .filter(book => {
                return book.name.includes(searchValue)
                || book.author.includes(searchValue)
                || book.amount.includes(searchValue)
            });

        this.renderBooks(searchRows);
    }

    setToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(this.books))
    }
}

class FormBooks {
    constructor() {
        this.bookForm = document.forms['form-book'];
    }

    getDataForm() {
        return {
            id: Math.floor(Math.random() * 1000),
            name: this.getNameValue,
            author: this.getAuthorValue,
            year: this.getYearValue,
            who: this.getWhoValue,
            pages: this.getPagesValue,
            amount: this.getAmountValue
        }
    }

    get getNameValue() {
        return this.bookForm.elements['name'].value;
    }

    get getAuthorValue() {
        return this.bookForm.elements['author'].value;
    }

    get getYearValue() {
        return this.bookForm.elements['year'].value;
    }

    get getWhoValue() {
        return this.bookForm.elements['who'].value;
    }

    get getPagesValue() {
        return this.bookForm.elements['pages'].value;
    }

    get getAmountValue() {
        return this.bookForm.elements['amount'].value;
    }

}
