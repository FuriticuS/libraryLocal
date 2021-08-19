class Statistic{

    static POPULAR_BOOKS_BTN = document.getElementById('popular-btn');
    static ACTIVE_USERS_BTN = document.getElementById('active-users-btn');
    static CONTAINER_STATIC = document.getElementById('static-table').tBodies[0];

    constructor(books, visitors) {
        this.books = books;
        this.visitors = visitors;

        this.static = [];

        this.init();
    }

    init(){
        Statistic.POPULAR_BOOKS_BTN.addEventListener('click', () => {
            this.renderPopularBooks(this.books.books);
        })

        Statistic.ACTIVE_USERS_BTN.addEventListener('click', () => {
            this.renderActiveUsers(this.visitors);
        })
    }

    renderPopularBooks(books){
        const popularBooks = books.filter(el => el.id > 200)
        console.log(popularBooks, 'popular books');

        this.renderStatic(popularBooks);
    }

    renderActiveUsers(visitors){
        console.log(visitors, 'active users');
    }

    renderStatic(arrStat) {
        Statistic.CONTAINER_STATIC.innerHTML = this.createStaticFragment(arrStat);
    }

    createStaticFragment(arrStat){
        return arrStat.reduce( (acc, stat) => acc + Statistic.createELementStatic(stat), '')
    }

    static createELementStatic({name, author, who}){
        return `<tr>
                    <td>${name}</td>
                    <td>${author}</td>
                    <td>${who}</td>
                    <td>count</td>
                </tr>`
    }

}
