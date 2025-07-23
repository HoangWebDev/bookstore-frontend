import { createSlice } from "@reduxjs/toolkit";

// Lấy Profile từ localStorage nếu có và giải mã
const token = localStorage.getItem("token");

const initialState: { token: string | null } = {
    token: token ? token : null,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {

        setToken: (state, action) => {
            state.token = action.payload;
            //Mã hóa và lưu vào localStorage
            const token = action.payload;
            localStorage.setItem("token", token);
        },
        removeToken: (state) => {
            state.token = null;
            // Xóa token khỏi localStorage khi người dùng đăng xuất
            localStorage.removeItem("token");
        },
    },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
