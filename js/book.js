class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    static SHOW_FORM_BTN = document.getElementById('add-btn-books');
    static SORT_BOOKS_SELECT = document.getElementById('sort-books');
    static SORT_BOOKS_BTN = document.getElementById('sort-books-btn');
    static SEARCH_BOOKS_INPUT = document.getElementById('search-books');

    constructor() {
        this.books = []
        this.form = new FormBooks();

        //url books
        this.urlBooks = url + 'books';

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
                this.renderEditBook(this.editBookElement);
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
                const bookRow = target.closest('[data-id-book]');
                this.editRow = bookRow;
                this.editBook(this.editRow.dataset.idBook);
            }
        });

        Books.CONTAINER.addEventListener('click', ({target}) => {
            if (target.dataset.btn === 'delete-book') {
                const bookRow = target.closest('[data-id-book]');
                this.deleteBookRow = bookRow;
                this.deleteBooks(this.deleteBookRow.dataset.idBook);
            }
        })
    }

    booksInfo(method, data, url, textError){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open(method, url);

            xhr.setRequestHeader('Content-type' , 'application/json');

            xhr.addEventListener('load', () => {
                resolve(JSON.parse(xhr.responseText));
            });


            xhr.onerror = function () {
                reject(new Error(textError));
            };

            xhr.send(JSON.stringify(data));
        });

    }

    getBooks(render) {
        this.booksInfo('GET', '',this.urlBooks, 'error load books')
            .then(response => render(response))
            .catch(error => console.log(error));
    }

    deleteBooks(id) {
        this.booksInfo('Delete', '',`${this.urlBooks}/${id}`, 'error delete book' )
            .then(response => {
                const bookId = response.id;
                this.deleteBook(bookId);
            })
            .catch(error => console.log(error));

    }

    deleteBook(deleteBookId) {
        document.querySelector(`[data-id-book="${deleteBookId}"]`).remove();
    }

    editBook(bookID) {
        this.isEdit = true;
        this.editBookId = bookID;

        this.booksInfo('GET', '',`${this.urlBooks}/${bookID}`, 'edit problem')
            .then(response => {
                const idBook = response;
                this.form.setDataForm(idBook);
            })
            .catch(error => console.log(error));

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
        let dataFormBook = this.form.getDataForm();

        // form validation
        if (!Object.values(dataFormBook).every(el => el)) {
            Array.from(this.form.bookForm).forEach(el => {
                if (el.value === '' && el.tagName === 'INPUT') {
                    el.style.border = '1px solid red';
                }
            })
            return
        }

        //request POST add books
        this.booksInfo('POST', dataFormBook, this.urlBooks,'error = add book problem')
            .then(response => {
                dataFormBook = response;
                Books.CONTAINER.insertAdjacentHTML('afterbegin', Books.createElement(dataFormBook));
            })
            .catch(error => console.log(error));

        this.form.bookForm.classList.remove('show');
        Books.SHOW_FORM_BTN.innerText = 'Add Book';
    }

    static createBooksFragmet(books) {
        return books.reduce((acc, books) => acc + Books.createElement(books), '');
    }

    static createElement({id, name, author, year, who, pages, amount}) {
        return `<tr data-id-book=${id}>
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

    renderEditBook(editBookElement) {
        let dataBooks = this.form.getDataForm();

        this.booksInfo('PUT', dataBooks, `${this.urlBooks}/${this.editBookId}`, 'edit error')
            .then(response => {
                let idEditBook = response.id;
                dataBooks = response;
                this.editBookElement(idEditBook, dataBooks);
            })
            .catch( error => console.log(error));
    }

    editBookElement(idEditBook, dataBooks) {

        document.querySelector(`[data-id-book="${idEditBook}"]`).remove();

        const row = Books.createElement({
            id: idEditBook,
            ...dataBooks
        })

        this.editRow.remove();
        Books.CONTAINER.insertAdjacentHTML('afterbegin', row);

        Books.SHOW_FORM_BTN.innerText = 'Add books';
        this.form.bookForm.classList.remove('show');

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
}

class FormBooks {
    constructor() {
        this.bookForm = document.forms['form-book'];
    }

    getDataForm() {
        return {
            name: this.getNameValue,
            author: this.getAuthorValue,
            year: this.getYearValue,
            who: this.getWhoValue,
            pages: this.getPagesValue,
            amount: this.getAmountValue
        }
    }

    setDataForm({name, author, year, who, pages, amount} = {}) {
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
