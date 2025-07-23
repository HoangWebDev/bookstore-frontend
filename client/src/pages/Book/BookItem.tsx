import { RiEyeLine, RiHeart3Line, RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "~/components/ui/Button/Button";
import Image from "~/components/ui/Image/Image";
import BookModel from "~/models/BookModel";
import { addCart } from "~/redux/cart";
import formatPrice from "~/utils/formatPrice";

function BookItem({ book }: { book: BookModel }) {
    const dispatch = useDispatch();

    const handleAddToCart = (bookDetail: BookModel) => {
        dispatch(addCart({
            book: bookDetail,
            quantity: 1
        }));
    };

    return (
        <div className="book__lists-card">
            <Link to={`/detail/${book.slug}`}>
                <Image src={book.image as string} alt={`Book ${book.bookName}`} className="book__lists-img" />
            </Link>
            <Link to={`/detail/${book.slug}`}>
                <h2 className="book__lists-title">{book.bookName}</h2>
            </Link>
            <div className="book__lists-prices">
                <div>
                    <span className="book__lists-discount">{formatPrice(book.discountedPrice)}</span>
                    <span className="book__lists-price">{formatPrice(book.price)}</span>
                </div>
                <span className="book__lists-sale">-{book.discountPercent}%</span>
            </div>
            <Button
                className="book__lists-add-cart"
                onClick={() => handleAddToCart(book)}
            >
                Add To Cart
            </Button>
            <div className="book__lists-actions">
                <button><RiSearchLine /></button>
                <button><RiHeart3Line /></button>
                <button><RiEyeLine /></button>
            </div>
        </div>
    );
}

export default BookItem;