import { RiAddFill, RiDeleteBin6Line, RiSubtractFill } from "react-icons/ri";
import Image from "~/components/ui/Image/Image";
import CartModel from "~/models/CartModel";
import formatPrice from "~/utils/formatPrice";

function CartItem({
    isCheckAll,
    handleCheckAllProducts,
    cart,
    onUpdateQuantity, // thêm prop callback
    onRemoveProduct,
}: {
    isCheckAll: boolean;
    handleCheckAllProducts: () => void;
    cart: CartModel;
    onUpdateQuantity: (bookId: number, quantity: number) => void;
    onRemoveProduct: (bookId: number) => void;
}) {
    const handleChangeQuantity = (bookId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            onRemoveProduct(bookId);
        } else if (newQuantity <= 10) {
            onUpdateQuantity(bookId, newQuantity);
        }
    };

    return (
        <div className="cart__product-items">
            <div className="cart__product-item">
                <input
                    type="checkbox"
                    name="checkProduct"
                    checked={isCheckAll}
                    className="cart__product-input"
                    onChange={handleCheckAllProducts}
                />
                <div className="cart__product-data">
                    <div className="cart__product-image">
                        <Image src={cart.book.image} alt="image" className="cart__product-img" />
                    </div>
                    <div className="cart__product-info">
                        <div className="cart__product-info--item">
                            <h2 className="cart__product-title">{cart.book.bookName}</h2>
                            <div className="cart__product-prices">
                                <span className="cart__product-price">{formatPrice(cart.book.discountedPrice)}</span>
                                <span className="cart__product-discount-price">{formatPrice(cart.book.price)}</span>
                            </div>
                        </div>
                        <div className="cart__product-quantity">
                            <RiSubtractFill className="cart__product-quantity--icon" onClick={() => handleChangeQuantity(cart.book.bookId, cart.quantity - 1)} />
                            <input
                                type="text"
                                name="productQuantity"
                                className="cart__product-input"
                                value={cart.quantity}
                                onChange={(e) =>
                                    handleChangeQuantity(cart.book.bookId, parseInt(e.target.value))
                                }
                            />
                            <RiAddFill className="cart__product-quantity--icon" onClick={() => handleChangeQuantity(cart.book.bookId, cart.quantity + 1)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart__product-icons">
                <RiDeleteBin6Line className="cart__product-icons--icon" onClick={() => onRemoveProduct(cart.book.bookId)} />
            </div>
        </div>
    );
}

export default CartItem;