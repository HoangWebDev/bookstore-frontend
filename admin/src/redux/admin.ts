import { createSlice } from "@reduxjs/toolkit";
import UserModel from "~/models/UserModel";

import { decryptData, encryptData } from "~/utils/crypto";

// Lấy admin từ localStorage nếu có và giải mã
const encryptedAdmin = localStorage.getItem("admin");
const admin = encryptedAdmin
    ? decryptData(encryptedAdmin)
    : "";

const initialState: { admin: UserModel | null } = {
    admin: admin ? JSON.parse(admin) : null,
};


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            //Mã hóa và lưu vào localStorage
            const encryptedUser = encryptData(JSON.stringify(action.payload));
            localStorage.setItem("admin", encryptedUser);
        },
        removeAdmin: (state) => {
            state.admin = null;
            // Xóa admin khỏi localStorage khi người dùng đăng xuất
            localStorage.removeItem("admin");
        },
    },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;
