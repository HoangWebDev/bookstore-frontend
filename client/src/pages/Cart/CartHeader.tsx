import { RiDeleteBin6Line } from "react-icons/ri";

function CartHeader({ isCheckAll, handleCheckAllProducts, handleRemoveCart }: { isCheckAll: boolean, handleCheckAllProducts: () => void, handleRemoveCart: () => void }) {
    return (
        <div className="cart__header">
            <div className="cart__header-items">
                <input
                    type="checkbox"
                    name="checkAllProducts"
                    id="checkAllProducts"
                    className="cart__header-input"
                    checked={isCheckAll}
                    onChange={handleCheckAllProducts}
                />
                <label className="cart__header-title" htmlFor="checkAllProducts">
                    Chọn tất cả (1 sản phẩm)
                </label>
            </div>
            <div className="cart__header-icons">
                <RiDeleteBin6Line
                    className="cart__header-icons--icon"
                    onClick={handleRemoveCart}
                />
            </div>
        </div>
    );
}

export default CartHeader;