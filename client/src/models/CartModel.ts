import BookModel from "./BookModel";

class CartModel {
    book: BookModel;
    quantity: number;

    constructor(
        book: BookModel,
        quantity: number
    ) {
        this.book = book;
        this.quantity = quantity
    }
}

export default CartModel