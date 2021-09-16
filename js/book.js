class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    static SHOW_FORM_BTN = document.getElementById('add-btn-books');
    static SORT_BOOKS_SELECT = document.getElementById('sort-books');
    static SORT_BOOKS_BTN = document.getElementById('sort-books-btn');
    static SEARCH_BOOKS_INPUT = document.getElementById('search-books');
    static URL_BOOKS = 'https://614252674d16670017ba2d08.mockapi.io/books';

    constructor() {
        this.books = []
        this.form = new FormBooks();

        this.isEdit = false;
        this.editBookId = null;
        this.editRow = null;

        this.deleteBookRow = null;

        this.init();
    }

    init() {
        this.getBooks(this.renderBooks);

        this.showFormBook();

        this.form.bookForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.isEdit) {
                this.renderEditBook();
                return;
            }

            this.addNewBook();
        });

        Books.SORT_BOOKS_BTN.addEventListener('click', () => {
            this.renderSortBooksTable(Books.SORT_BOOKS_SELECT.value);
        });

        Books.SEARCH_BOOKS_INPUT.addEventListener('input', () => {
            this.renderSearchBooks(Books.SEARCH_BOOKS_INPUT.value);
        });

        Books.CONTAINER.addEventListener('click', ({target}) => {
            if (target.dataset.btn === 'edit-book') {
                const bookRow = target.closest('[data-id]');
                this.editRow = bookRow;
                this.editBook(this.editRow.dataset.id);
            }
        });

        Books.CONTAINER.addEventListener('click', ({target}) => {
            if(target.dataset.btn === 'delete-book'){
                const bookRow = target.closest('[data-id]');
                this.deleteBookRow = bookRow;
                this.deleteBooks(this.deleteBookRow.dataset.id);
            }
        })
    }

    getBooks(render) {
        try{
            const xhr = new XMLHttpRequest();

            xhr.open('GET', Books.URL_BOOKS);

            xhr.addEventListener('load', () => {
                render(JSON.parse(xhr.responseText));
            });

            xhr.addEventListener('error', (e) => {
                console.log('error load books', e);
            });

            xhr.send();

        } catch (error) {
            console.log('Get books',error);
        }
    }

    deleteBooks(id){
        try{
            const xhr = new XMLHttpRequest();

            xhr.open('Delete', `${Books.URL_BOOKS}/${id}`);

            xhr.addEventListener('load', ()=> {
                JSON.parse(xhr.responseText).id
            });

            xhr.addEventListener('error', (e)=> {
                console.log('delete problem', e);
            });

            xhr.send();

        }catch (e) {
            console.log('delete error', e);
        }

    }

    editBook(bookID) {
        this.isEdit = true;
        this.editBookId = bookID;

        const book = this.books.find(el => +el.id === +bookID);
        this.form.setDataForm(book);

        Books.SHOW_FORM_BTN.innerText = 'Close';
        this.form.bookForm.classList.add('show');
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
        if (!Object.values(dataFormBook).every(el => el)) {
            Array.from(this.form.bookForm).forEach(el => {
                if (el.value === '' && el.tagName === 'INPUT') {
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

    static createBooksFragmet(books) {
        return books.reduce((acc, books) => acc + Books.createElement(books), '');
    }

    static createElement({id, name, author, year, who, pages, amount}) {
        return `<tr data-id=${id}>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${author}</td>
                    <td>${year}</td>
                    <td>${who}</td>
                    <td>${pages}</td>
                    <td>${amount}</td>
                    <td><button data-btn="edit-book">Edit</button></td>
                    <td><button data-btn="delete-book">Delete</button></td>
                </tr>`
    }

    renderBooks(books = []) {
        Books.CONTAINER.innerHTML = Books.createBooksFragmet(books);
    }

    renderSortBooksTable(sortValue) {

        let sortedRows = Array.from(Books.CONTAINER.rows)
            .sort((rowA, rowB) => {

                if (sortValue === '0' || sortValue === '3' || sortValue === '5' || sortValue === '6') {
                    return +rowA.cells[sortValue].textContent - +rowB.cells[sortValue].textContent
                } else {
                    return rowA.cells[sortValue].textContent > rowB.cells[sortValue].textContent
                        ? 1 : -1
                }

            });

        Books.CONTAINER.append(...sortedRows);
    }

    renderSearchBooks(searchValue) {
        let searchRows = this.books
            .filter(book => {
                return book.name.includes(searchValue)
                    || book.id === +searchValue
                    || book.author.includes(searchValue)
                    || book.amount.includes(searchValue)
            });

        this.renderBooks(searchRows);
    }

    renderEditBook() {
        const dataBooks = this.form.getDataForm();

        delete dataBooks.id;

        try{
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `${Books.URL_BOOKS}/${bookID}`);

            xhr.addEventListener('load', ()=> {
                JSON.parse(xhr.responseText).id
            });

            xhr.addEventListener('error', (e)=> {
                console.log('edit problem', e);
            });

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.send(JSON.stringify({...dataBooks}));

        }catch (e) {
            console.log('edit error', e);
        }

        // this.books = this.books.map(el => {
        //     return +el.id === +this.editBookId ? {...el, ...dataBooks} : el;
        // });
        //
        // const row = Books.createElement({
        //     id: this.editBookId,
        //     ...dataBooks
        // })

        this.editRow.remove();
        Books.CONTAINER.insertAdjacentHTML('afterbegin', row);

        this.isEdit = false;
        this.editBookId = null;
        this.editRow = null;
    }

    changeBookAmount(id, action) {

        this.books.map(book => {
            return +id === +book.id ?
                {
                    ...book,
                    amount: action === 'increment' ? book.amount++ : book.amount--
                }
                : book
        });

        this.renderBooks(this.books);
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

    setDataForm({name, author, year, who, pages, amount}) {
        this.bookForm.elements['name'].value = name;
        this.bookForm.elements['author'].value = author;
        this.bookForm.elements['year'].value = year;
        this.bookForm.elements['who'].value = who;
        this.bookForm.elements['pages'].value = pages;
        this.bookForm.elements['amount'].value = amount;
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
