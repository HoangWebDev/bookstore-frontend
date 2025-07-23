import { memo } from "react";
import { RiArrowUpSLine, RiCloseFill } from "react-icons/ri";
import Button from "~/components/ui/Button/Button";
import formatPrice from "~/utils/formatPrice";

function OrderSummary({ showOrderInformation, handleShowOrderInformation, discountPrice, totalPrice, voucher }: { showOrderInformation: boolean, handleShowOrderInformation: () => void, discountPrice: number, totalPrice: number, voucher: number }) {
    return (
        <div className="cart__order">
            <div className={`cart__order-infor ${showOrderInformation ? "cart__order-infor--show" : ""}`}>
                <h2 className="cart__order-title">
                    Order Information
                    <RiCloseFill
                        className="cart__order-title--icon"
                        onClick={handleShowOrderInformation}
                    />
                </h2>

                <div className="cart__order-data">
                    <p>
                        Total
                        <span>{formatPrice(totalPrice)}</span>
                    </p>
                    <div>
                        <div className="cart__order-data-promotion">
                            Total promotion
                            <span>{formatPrice((totalPrice - discountPrice) + voucher)}</span>
                        </div>
                        <ul
                            className="cart__order-data-list"
                        >
                            <li>
                                Product discount
                                <span>{formatPrice(totalPrice - discountPrice)}</span>
                            </li>
                            <li>
                                Voucher
                                <span>{formatPrice(voucher)}</span>
                            </li>
                        </ul>
                    </div>
                    <p>
                        Payment
                        <span>{formatPrice(discountPrice)}</span>
                    </p>
                </div>
            </div>

            <div className="cart__order-buttons">
                <div
                    className="cart__order-total"
                    onClick={handleShowOrderInformation}
                >
                    <p>
                        Tổng:
                        <span>{formatPrice(discountPrice)}</span>
                    </p>
                    <RiArrowUpSLine className={`cart__order-total--icon ${showOrderInformation ? "cart__order-total--icon-rotate" : ""}`} />
                </div>
                <Button to="#" className="cart__order-buttons-now">
                    Pay
                </Button>
            </div>
        </div>
    );
}

export default memo(OrderSummary);