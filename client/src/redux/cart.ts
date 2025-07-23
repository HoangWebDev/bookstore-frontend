import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartModel from "~/models/CartModel";

const initialState: { cartProducts: CartModel[] } = {
    cartProducts: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartModel>) => {
            const product = { ...action.payload, quantity: 1 };

            const index = state.cartProducts.findIndex(
                (item) => item.book.bookId === product.book.bookId
            );

            if (index === -1) {
                state.cartProducts.push(product);
            } else {
                state.cartProducts[index].quantity++;
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ bookId: number; quantity: number }>
        ) => {
            const { bookId, quantity } = action.payload;
            const index = state.cartProducts.findIndex(item => item.book.bookId === bookId);

            if (index !== -1) {
                if (quantity > 0) {
                    state.cartProducts[index].quantity = quantity;
                } else {
                    state.cartProducts.splice(index, 1); // Xoá nếu quantity <= 0
                }
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            const bookId = action.payload;
            state.cartProducts = state.cartProducts.filter(item => item.book.bookId !== bookId);
        },

        removeCart: (state) => {
            state.cartProducts = [];
        }
    },
});

export const { addCart, updateQuantity, removeProduct, removeCart } = cartSlice.actions;
export default cartSlice.reducer;