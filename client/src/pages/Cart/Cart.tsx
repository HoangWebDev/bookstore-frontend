import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart, removeProduct, updateQuantity } from "~/redux/cart";
import { RootState } from "~/redux/store";
import Image from "~/components/ui/Image/Image";
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import OrderSummary from "./OrderSummary";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import "./Cart.module.scss"
import iconCart from "~/assets/image/ico_emptycart.jpg"
import Button from "~/components/ui/Button/Button";

function Cart() {
    const dispatch = useDispatch();
    const [showOrderInformation, setShowOrderInformation] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.cartProducts);

    //Handle update quantity
    const handleUpdateQuantity = useCallback((bookId: number, newQuantity: number) => {
        dispatch(updateQuantity({ bookId, quantity: newQuantity }));
    }, [dispatch]);

    //Handle remove product
    const handleRemoveProduct = useCallback((bookId: number) => {
        dispatch(removeProduct(bookId));
    }, [dispatch]);

    //Handle remove product
    const handleRemoveCart = useCallback(() => {
        dispatch(removeCart());
    }, [dispatch]);

    //Handle show order information
    const handleShowOrderInformation = () => {
        setShowOrderInformation(!showOrderInformation);
    };

    //Handle check all products
    const handleCheckAllProducts = () => {
        setIsCheckAll(!isCheckAll);
    }

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
    }, [cartItems]);

    const totalDiscountPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.book.discountedPrice * item.quantity, 0);
    }, [cartItems]);

    const voucher = useMemo(() => {
        // return cartItems.reduce((total, item) => total + (item.book.price - item.book.discountedPrice) * item.quantity, 0);
        return 0;
    }, []);

    // Nếu vẫn đang load (persist chưa khôi phục xong), return null
    if (!cartItems) return null;

    return (
        <>
            {/* < !--==================== CART ==================== --> */}
            <section className="cart section">
                <div className="cart__navigate container">
                    <span className="cart__navigate-link">
                        Home
                        <RiArrowRightSLine />
                        Cart
                    </span>

                    <Link to="/" className="cart__navigate-prevent">
                        <RiArrowLeftLine className="cart__navigate-prevent--icon" />
                        Home
                    </Link>
                </div>

                <div className={`${cartItems.length === 0 ? "cart__container-empty" : "cart__container"} container grid`}>
                    {cartItems.length === 0 ? (
                        <div className="cart__empty">
                            <Image src={iconCart} alt="Empty Cart" className="cart__empty-img" />
                            <h2 className="cart__empty-title">Your cart is empty</h2>
                            <p className="cart__empty-description">Add some items to make me happy</p>
                            <Button to="/" className="cart__empty-link">Shop Now</Button>
                        </div>
                    ) : (
                        <>
                            <div className="cart__container-items">
                                <CartHeader
                                    isCheckAll={isCheckAll}
                                    handleCheckAllProducts={handleCheckAllProducts}
                                    handleRemoveCart={handleRemoveCart}
                                />
                                <div className="cart__product">
                                    {cartItems.map((cartItem) => (
                                        <CartItem
                                            key={cartItem.book.bookId}
                                            isCheckAll={isCheckAll}
                                            handleCheckAllProducts={() => { }}
                                            cart={cartItem}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onRemoveProduct={handleRemoveProduct}
                                        />
                                    ))}
                                </div>
                            </div>
                            <OrderSummary
                                showOrderInformation={showOrderInformation}
                                handleShowOrderInformation={handleShowOrderInformation}
                                discountPrice={totalDiscountPrice}
                                totalPrice={totalPrice}
                                voucher={voucher}
                            />
                            {showOrderInformation ? <div className="cart__order-overlay" onClick={handleShowOrderInformation}></div> : null}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default Cart;