class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    static SHOW_FORM = document.getElementById('add-btn-books');

    constructor() {
        this.books = []
        this.form = new FormBooks();

        this.init();
    }

    init() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];

        this.showFormBook();

        this.form.bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.onSubmitFormBook();
        });
    }

    showFormBook() {
        Books.SHOW_FORM.addEventListener('click', () => {
            if (Books.SHOW_FORM.innerText === 'Close') {
                Books.SHOW_FORM.innerText = 'Add Book';
                this.form.bookForm.classList.remove('show');
            } else {
                Books.SHOW_FORM.innerText = 'Close';
                this.form.bookForm.classList.add('show');
            }
        });
    }

    onSubmitFormBook(e) {
        const dataFormBook = this.form.getDataForm();

        this.books.push(dataFormBook);

        this.form.bookForm.classList.remove('show');
        Books.SHOW_FORM.innerText = 'Add Book';

        Books.CONTAINER.insertAdjacentHTML('afterbegin', Books.createElement(dataFormBook));
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
                </tr>`
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
            id: Math.floor(Math.random() * 100),
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

