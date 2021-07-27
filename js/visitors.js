class Visitors{
    static VISITOR_CONTAINER = document.getElementById('table-visitors').tBodies[0];
    static SHOW_VISITORS_FORM_BTN = document.getElementById('add-btn-visitors');

    constructor() {
        this.visitors = [];
        this.form = new FormVisitors();

        this.init();
    }

    init(){
        this.visitors = JSON.parse(localStorage.getItem('visitors')) || [];

        this.showFormVisitors();
        this.form.visitorsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            this.addNewVisitor();
        })

        this.renderVisitor(this.visitors);
    }

    showFormVisitors(){
        Visitors.SHOW_VISITORS_FORM_BTN.addEventListener('click', ()=>{
            if(Visitors.SHOW_VISITORS_FORM_BTN.innerText === 'Close'){
                Visitors.SHOW_VISITORS_FORM_BTN.innerText = 'Add Visitor';
                this.form.visitorsForm.classList.remove('show');
            } else {
                Visitors.SHOW_VISITORS_FORM_BTN.innerText = 'Close';
                this.form.visitorsForm.classList.add('show');
            }

        })
    }

    addNewVisitor(){
        const dataFormVisitor = this.form.getDataForm();
        // form visitors validation
        if(!Object.values(dataFormVisitor).every(el => el)){
            Array.from(this.form.visitorsForm).forEach( el =>{
                if(el.value === '' && el.tagName === 'INPUT'){
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

    renderVisitor(visitors = []){
        Visitors.VISITOR_CONTAINER.innerHTML = this.createVisitorsFragment(visitors);
    }

    createVisitorsFragment(visitors){
        return visitors.reduce((acc, visitor) => acc + Visitors.createElementVisitors(visitor),'')
    }

    static createElementVisitors({id, name, phone}){
        return `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td><button>Edit</button></td>
                </tr>`
    }

    setToLocalStorage(){
        localStorage.setItem('visitors', JSON.stringify(this.visitors));
    }

}

class FormVisitors{
    constructor() {
        this.visitorsForm = document.forms['form-visitor'];
    }

    getDataForm(){
        return{
            id: Math.floor(Math.random()*1000),
            name: this.getNameVisitor,
            phone: this.getPhoneNumber
        }
    }

    get getNameVisitor(){
        return this.visitorsForm.elements['name'].value;
    }

    get getPhoneNumber(){
        return this.visitorsForm.elements['phone'].value;
    }
}
