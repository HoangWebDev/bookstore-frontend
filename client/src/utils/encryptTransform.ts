import UserModel from "~/models/UserModel";
import { decryptData, encryptData } from "./crypto";
import { createTransform } from "redux-persist";

// Transform để mã hóa customer
const customerEncryptTransform = createTransform(
    (inboundState: UserModel | null) => {
        return inboundState
            ? encryptData(JSON.stringify(inboundState))
            : null;
    },
    (outboundState: string | null) => {
        try {
            if (!outboundState) return null;
            const decrypted = decryptData(outboundState);
            return decrypted ? JSON.parse(decrypted) : null;
        } catch {
            return null;
        }
    }
);

export { customerEncryptTransform }