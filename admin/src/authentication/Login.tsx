import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import usePost from "~/hooks/usePost";
import { setAdmin } from "~/redux/admin";
import { setToken } from "~/redux/token";

const Login = () => {
    const { mutate: login } = usePost();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({
        username: "",
        password: ""
    });

    const validate = () => {
        const errors = {
            username: "",
            password: ""
        };
        let isValid = true;

        if (!username.trim()) {
            errors.username = "Vui lòng nhập tên đăng nhập";
            isValid = false;
        }

        if (!password) {
            errors.password = "Vui lòng nhập mật khẩu";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleInputChange = (field: string, value: string) => {
        if (field === "username") {
            setUsername(value);
            if (value.trim()) {
                setValidationErrors(prev => ({ ...prev, username: "" }));
            }
        } else if (field === "password") {
            setPassword(value);
            if (value) {
                setValidationErrors(prev => ({ ...prev, password: "" }));
            }
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            login(
                {
                    url: "/authen/login",
                    data: { username, password }
                }, {
                onSuccess: (response) => {
                    if (response.data.user.role === "Admin") {
                        dispatch(setToken(response.data.token));
                        dispatch(setAdmin(response.data.user));
                        //Chuyển hướng
                        navigate("/");
                    } else {
                        setError("❌ Tài khoản không được phân quyền quản lý");
                    }

                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        const backendErrors = error.response?.data;
                        if (backendErrors?.username) {
                            setValidationErrors(prev => ({ ...prev, username: backendErrors.username }));
                        } else if (backendErrors?.password) {
                            setValidationErrors(prev => ({ ...prev, password: backendErrors.password }));
                        } else {
                            setError("❌ Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.");
                        }
                    }
                },
                onSettled: () => {
                    setIsLoading(false); // Dừng loading bất kể thành công hay lỗi
                }
            });
        } catch (error) {
            console.error("Lỗi không xác định:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please login to continue
                    </p>
                </div>

                {error && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin} noValidate>
                    <div>
                        <div className="mb-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className={`relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                                ${validationErrors.username ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter the username"
                                    value={username}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    onBlur={() => {
                                        if (!username.trim()) {
                                            setValidationErrors(prev => ({ ...prev, username: "Please enter the username" }));
                                        }
                                    }}
                                />
                            </div>
                            {validationErrors.username && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className={`relative block w-full pl-3 pr-7 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                                ${validationErrors.password ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter the password"
                                value={password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                onBlur={() => {
                                    if (!password) {
                                        setValidationErrors(prev => ({ ...prev, password: "Please enter the password" }));
                                    }
                                }}
                            />
                            {
                                showPassword ? (
                                    <IoEyeSharp
                                        className="absolute top-4/6 right-3 transform -translate-y-1/2 z-50 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <IoEyeOffSharp
                                        className="absolute top-4/6 right-3 transform -translate-y-1/2 z-50 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )
                            }
                        </div>
                        {validationErrors.password && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember to log in
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot the password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 cursor-pointer"
                        >
                            {isLoading ? "Loading ..." : "Log in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;