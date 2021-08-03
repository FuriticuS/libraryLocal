class Visitors {
    static VISITOR_CONTAINER = document.getElementById('table-visitors').tBodies[0];
    static SHOW_VISITORS_FORM_BTN = document.getElementById('add-btn-visitors');
    static SORT_VISITORS_SELECT = document.getElementById('sort-visitors');
    static SORT_VISITORS_BTN = document.getElementById('sort-btn-visitors');
    static SEARCH_VISITORS_INPUT = document.getElementById('search-visitors');

    constructor() {
        this.visitors = [];
        this.form = new FormVisitors();

        this.init();
    }

    init() {
        this.visitors = JSON.parse(localStorage.getItem('visitors')) || [];

        this.showFormVisitors();
        this.form.visitorsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewVisitor();
        });

        Visitors.SORT_VISITORS_BTN.addEventListener('click', () =>{
           this.renderSortVisitors(Visitors.SORT_VISITORS_SELECT.value);
        });

        Visitors.SEARCH_VISITORS_INPUT.addEventListener('input', () =>{
           this.renderSearchVisitors(Visitors.SEARCH_VISITORS_INPUT.value);
        });

        this.renderVisitor(this.visitors);
    }

    showFormVisitors() {
        Visitors.SHOW_VISITORS_FORM_BTN.addEventListener('click', () => {
            if (Visitors.SHOW_VISITORS_FORM_BTN.innerText === 'Close') {
                Visitors.SHOW_VISITORS_FORM_BTN.innerText = 'Add Visitor';
                this.form.visitorsForm.classList.remove('show');
            } else {
                Visitors.SHOW_VISITORS_FORM_BTN.innerText = 'Close';
                this.form.visitorsForm.classList.add('show');
            }

        })
    }

    addNewVisitor() {
        const dataFormVisitor = this.form.getDataForm();
        // form visitors validation
        if (!Object.values(dataFormVisitor).every(el => el)) {
            Array.from(this.form.visitorsForm).forEach(el => {
                if (el.value === '' && el.tagName === 'INPUT') {
                    el.style.border = '1px solid red';
                }
            })
            return
        }

        this.visitors.push(dataFormVisitor);

        this.form.visitorsForm.classList.remove('show');
        Visitors.SHOW_VISITORS_FORM_BTN.innerText = 'Add Visitor';

        Visitors.VISITOR_CONTAINER.insertAdjacentHTML('afterbegin', Visitors.createElementVisitors(dataFormVisitor));
    }

    renderVisitor(visitors = []) {
        Visitors.VISITOR_CONTAINER.innerHTML = this.createVisitorsFragment(visitors);
    }

    createVisitorsFragment(visitors) {
        return visitors.reduce((acc, visitor) => acc + Visitors.createElementVisitors(visitor), '')
    }

    static createElementVisitors({id, name, phone}) {
        return `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td><button>Edit</button></td>
                </tr>`
    }

    renderSortVisitors(sortValueVisitor){
        let sortedVisitorsRow = Array.from(Visitors.VISITOR_CONTAINER.rows)
            .sort( (rowA, rowB) =>{
                if(sortValueVisitor === '0' || sortValueVisitor === '2'){
                    return +rowA.cells[sortValueVisitor].textContent - +rowB.cells[sortValueVisitor].textContent
                } else {
                    return rowA.cells[sortValueVisitor].textContent > rowB.cells[sortValueVisitor].textContent ?
                        1 : -1;
                }
            });

        Visitors.VISITOR_CONTAINER.append(...sortedVisitorsRow);
    }

    renderSearchVisitors(searchValue){
        let renderSearchVisitors = this.visitors.filter( visitor => {
            console.log(searchValue);
            return visitor.name.includes(searchValue)
            || visitor.phone.includes(searchValue)
            || visitor.id === +searchValue
        });

        this.renderVisitor(renderSearchVisitors);
    }

    setToLocalStorage() {
        localStorage.setItem('visitors', JSON.stringify(this.visitors));
    }
}

class FormVisitors {
    constructor() {
        this.visitorsForm = document.forms['form-visitor'];
    }

    getDataForm() {
        return {
            id: Math.floor(Math.random() * 1000),
            name: this.getNameVisitor,
            phone: this.getPhoneNumber
        }
    }

    get getNameVisitor() {
        return this.visitorsForm.elements['name'].value;
    }

    get getPhoneNumber() {
        return this.visitorsForm.elements['phone'].value;
    }
}
