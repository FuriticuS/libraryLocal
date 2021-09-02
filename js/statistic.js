class StatisticBooks{

    static CONTAINER_STATIC = document.getElementById('static-table').tBodies[0];

    constructor(cards) {
        this.cards = cards.cards;

        this.init();
    }

    init(){
        this.renderPopularBooks(this.cards);
    }

    renderPopularBooks(books){
        const popularBooks = books.sort((a,b,arr) => {
            return a.nameBook > b.nameBook ? 1 : -1
        });

        let popular = [];
        for(let i =0; i < popularBooks.length; i++){
            if(i === 10){
                break;
            }
            popular.push(popularBooks[i]);
        }

        this.renderStatic(popular);
    }

    renderStatic(arrStat) {
        StatisticBooks.CONTAINER_STATIC.innerHTML = this.createStaticFragment(arrStat);
    }

    createStaticFragment(arrStat){
        return arrStat.reduce( (acc, stat) => acc + StatisticBooks.createELementStatic(stat), '')
    }

    static createELementStatic({nameBook, nameVisitor, idBook}){
        return `<tr>
                    <td>${idBook}</td>
                    <td>${nameBook}</td>
                    <td>${nameVisitor}</td>
                </tr>`
    }

}
