import UserModel from "~/models/UserModel";

type AuthContextType = {
    user?: UserModel | null,
    login?: (username: string, password: string) => void,
    logout?: () => void,
    loginLoading?: boolean,
    loginError?: string
};

export default AuthContextType