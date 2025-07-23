class StatisticsAll {
    Books: number = 0;
    Categories: number = 0;
    Authors: number = 0;
    Publishers: number = 0;

    constructor(
        Books: number,
        Categories: number,
        Authors: number,
        Publishers: number
    ) {
        this.Books = Books;
        this.Categories = Categories;
        this.Authors = Authors;
        this.Publishers = Publishers
    }
}

export default StatisticsAll