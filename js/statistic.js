class StatisticBooks{

    static CONTAINER_STATIC = document.getElementById('static-table').tBodies[0];
    static CONTAINER_STATIC_VISITORS = document.getElementById('static-visitors').tBodies[0];

    constructor(cards) {
        this.cards = cards.cards;

        this.init();
    }

    init(){
        this.renderPopularBooks(this.cards);
        this.renderPopularVisitors(this.cards);
    }

    renderPopularBooks(books){
        const popularBooks = books.sort((a,b) => {
            return a.nameBook > b.nameBook ? 1 : -1
        }).slice(0,10);

        this.renderStatic(popularBooks);
    }

    renderPopularVisitors(visitors){
        const popularVisitors = visitors.sort((a,b) => {
            return a.nameVisitor > b.nameVisitor ? 1 : -1
        }).slice(0,10)

        this.renderStaticVisitors(popularVisitors);
    }

    renderStatic(arrStat) {
        StatisticBooks.CONTAINER_STATIC.innerHTML = this.createStaticFragment(arrStat);
    }

    renderStaticVisitors(popularVisitors){
        StatisticBooks.CONTAINER_STATIC_VISITORS.innerHTML = this.createStaticVisitorsFragment(popularVisitors);
    }

    createStaticFragment(arrStat){
        return arrStat.reduce( (acc, stat) => acc + StatisticBooks.createELementStatic(stat), '')
    }

    createStaticVisitorsFragment(arrVisitors) {
        return arrVisitors.reduce( (acc, stat) => acc + StatisticBooks.createELementVisitorsStatic(stat),'')
    }

    static createELementStatic({nameBook, nameVisitor, idBook}){
        return `<tr>
                    <td>${idBook}</td>
                    <td>${nameBook}</td>
                    <td>${nameVisitor}</td>
                </tr>`
    }

    static createELementVisitorsStatic({nameVisitor, nameBook}){
        return `<tr>
                    <td>${nameVisitor}</td>
                    <td>${nameBook}</td>
                </tr>`
    }

}
