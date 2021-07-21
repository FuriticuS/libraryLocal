class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    static SHOW_FORM = document.getElementById('add-btn-books');
    static SORT_BOOKS = document.getElementById('sort-btn-books');

    constructor() {
        this.books = []
        this.form = new FormBooks();
        this.sort = new SortBooks();

        this.init();
    }

    init() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];

        this.renderBooks(this.books);

        this.showFormBook();

        this.sortBooksTable();

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

    sortBooksTable(){
        Books.SORT_BOOKS.addEventListener('click', () =>{
            console.log('sort');
        })
    }

    onSubmitFormBook(e) {
        const dataFormBook = this.form.getDataForm();

        this.books.push(dataFormBook);

        this.form.bookForm.classList.remove('show');
        Books.SHOW_FORM.innerText = 'Add Book';

        Books.CONTAINER.insertAdjacentHTML('afterbegin', Books.createElement(dataFormBook));
    }

    renderBooks(books = []){
        // не сработало
        // console.log(books);
        // Books.CONTAINER.insertAdjacentHTML('afterbegin', Books.createElement(books));

        Books.CONTAINER.append(this.createBooksFragmet(books));
    }

    createBooksFragmet(books){
        const fragment = document.createDocumentFragment();

        books.forEach( books => {
            fragment.append(this.createBookElement(books));
        });

        return fragment;
    }

    createBookElement({id, name, author, year, who, pages, amount}){

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.innerHTML = id;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = name;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerHTML = author;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerHTML = year;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.innerHTML = who;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.innerHTML = pages;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.innerHTML = amount;
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.dataset.btn = 'edit';
        td8.append(editBtn);
        tr.appendChild(td8);

        return tr;
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

class SortBooks{
    constructor() {
        this.table = document.getElementById('table-books');
        this.name = '';

        this.getNameSort();
    }

    getNameSort(){
        // this.name = select.value ??
        this.sortBooksTable();
    }

    sortBooksTable(){
        let sortedRows = Array.from(this.table.rows)
            .slice(1)
            .sort((rowA, rowB) => rowA.cells[this.name].textContent > rowB.cells[this.name].textContent ? 1 : -1);

        this.table.tBodies[0].append(...sortedRows);
    }
}

