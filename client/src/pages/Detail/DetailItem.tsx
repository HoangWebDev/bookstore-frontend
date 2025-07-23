import { RiStarFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Button from "~/components/ui/Button/Button";
import BookModel from "~/models/BookModel";
import { addCart } from "~/redux/cart";

import formatPrice from "~/utils/formatPrice";

function DetailItem({ bookDetail }: { bookDetail: BookModel }) {
    const dispatch = useDispatch();

    const handleAddToCart = (bookDetail: BookModel) => {
        dispatch(addCart({
            book: bookDetail,
            quantity: 1
        }));
    };

    return (
        <div className="detail__data">
            <h2 className="detail__title section__title">
                {bookDetail?.bookName}
            </h2>

            <div className="detail__info">
                <p>Genre: <span>{bookDetail?.category.categoryName}</span></p>
                <p>Author: <span>{bookDetail?.author.authorName}</span></p>
                <p>Publisher: <span>{bookDetail?.publisher.publisherName}</span></p>
                <p>Cover: <span>Bìa {bookDetail?.coverType}</span></p>
            </div>

            <div className="detail__prices">
                <span className="detail__prices-price">
                    {formatPrice(bookDetail?.discountedPrice as number)}
                </span>
                <span className="detail__prices--discount-price">
                    {formatPrice(bookDetail?.price as number)}
                </span>
                <span className="detail__prices--discount-percent">
                    -{bookDetail?.discountPercent}%
                </span>
            </div>

            <div className="detail__star">
                <RiStarFill className="detail__star-icon" /> <span>(0)</span> |
                <div className="detail__star-buy">
                    Đã bán <span>40</span>
                </div>
            </div>

            <div className="detail__delivery">
                <div className="detail__delivery--icons">
                    <TbTruckDelivery className="detail__delivery--icons-icon" />
                    <p>Dự kiến giao hàng: <span>Thứ Tư - 09/04</span></p>
                </div>
                <p className="detail__delivery-address">
                    Giao hàng đến
                </p>
            </div>

            <div className="detail__buttons">
                <Button
                    onClick={() => handleAddToCart(bookDetail)}
                >
                    Add To Cart
                </Button>
                <Button to="#" className="detail__buttons-now">
                    Buy Now
                </Button>
            </div>
        </div>
    );
}

export default DetailItem;
