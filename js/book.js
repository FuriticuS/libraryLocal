class Books {
    static CONTAINER = document.getElementById('table-books').tBodies[0];
    constructor() {
        this.books = []
        this.form = new formBooks();

        this.init();
        this.addBooks();
        this.setToLocalStorage();

        this.createBook();
    }

    init(){
        this.books = JSON.parse(localStorage.getItem('books')) || [];
    }

    addBooks(){
        const bookBtn = document.getElementById('add-btn-books');
        const bookForm = document.querySelector('.form-book');

        bookBtn.addEventListener('click', () => {
            if(!bookForm.classList.contains('show')){
                bookForm.classList.add('show');
            }
            else {
                bookForm.classList.remove('show');
            }

        });
    }

    createBook(){
        const bookForm = document.querySelector('.form-book');
        const apply = document.getElementById('apply-book');

        apply.addEventListener('click', (e) => {
            e.preventDefault();

            const dataBook = this.form.getFormValues();
            console.log(this.form.getFormValues());
            this.books.push(dataBook);

            bookForm.classList.remove('show');

            Books.CONTAINER.innerHTML = Books.createElement(dataBook);
        })
    }

    static createElement({name}){
        return `<tr>${name}</tr>>`
    }

    setToLocalStorage(){
        localStorage.setItem('books', JSON.stringify(this.books))
    }
}

class formBooks {
    getFormValues(){
        const formElements = [...document.querySelector('.form-book')];
        let objInputs = {};
        let newMss = [];

        console.log(newMss);
        formElements.forEach((item, i) => {
            if(item !== ''){
                newMss.push(item.value);
                objInputs[i] = item[i];
            }
            else {
                console.log('no rules');
            }

        });

        Object.assign(objInputs,newMss);

        return {
            objInputs
        }
    }
}

