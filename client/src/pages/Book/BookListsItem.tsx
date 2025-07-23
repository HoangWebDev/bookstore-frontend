import BookModel from "~/models/BookModel";
import BookItem from "./BookItem";
import Image from "~/components/ui/Image/Image";
import { memo } from "react";
import Button from "~/components/ui/Button/Button";
import emptyProduct from "~/assets/image/empty_product.png"

function BookListsItem({ books }: { books: BookModel[] }) {
    return (
        <div className="book__lists">
            <div className={`${books.length === 0 ? "book__lists-empty" : "book__lists-container"} grid`}>
                {books.length === 0
                    ? (
                        <div className="book__empty">
                            <Image src={emptyProduct} alt="Empty Cart" className="book__empty-img" />
                            <h2 className="book__empty-title">Your cart is empty</h2>
                            <p className="book__empty-description">Add some items to make me happy</p>
                            <Button to="/" className="book__empty-link">Shop Now</Button>
                        </div>
                    )
                    : (
                        books.map((book) => (
                            <BookItem key={book.bookId} book={book} />
                        ))
                    )}
            </div>
        </div>
    );
}

export default memo(BookListsItem);