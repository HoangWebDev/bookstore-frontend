import { RiCloseLine, RiEyeLine, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.module.scss"
import { useState } from "react";
import usePost from "~/hooks/usePost";
import { AxiosError } from "axios";
import { setCustomer } from "~/redux/customer";
function Login({ setLoginOpen }: { setLoginOpen: (open: boolean) => void }) {
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
            errors.username = "Please enter the username";
            isValid = false;
        }

        if (!password) {
            errors.password = "Please enter the password";
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
                    if (response.data.user.role === "Customer") {
                        dispatch(setCustomer(response.data.user));
                        setLoginOpen(false);
                        //Chuyển hướng
                        navigate("/");
                    } else {
                        setError("The account is not assigned.");
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
                            setError("Error from the server. Please try again later.");
                        }
                    }
                },
                onSettled: () => {
                    setIsLoading(false); // Dừng loading bất kể thành công hay lỗi
                }
            });
        } catch (error) {
            console.error("Unknown error:", error);
            setIsLoading(false);
        }
    };

    return (
        // < !--==================== LOGIN ==================== -->
        <div className="login grid" id="login-content">
            <form onSubmit={handleLogin} className="login__form grid">
                <h3 className="login__title">Log In</h3>

                {error && (
                    <div className="form__error">
                        {error}
                    </div>
                )}

                <div className="login__group grid">
                    <div className="login__username">
                        <label htmlFor="login-username" className="login__label">Username</label>
                        <input
                            id="login-username"
                            name="username"
                            type="text"
                            placeholder="Write your username"
                            className={`login__input ${validationErrors.username ? "login__input-error" : ""}`}
                            value={username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            onBlur={() => {
                                if (!username.trim()) {
                                    setValidationErrors(prev => ({ ...prev, username: "Please enter the username" }));
                                }
                            }}
                        />
                        {validationErrors.username && (
                            <p className="login__error">{validationErrors.username}</p>
                        )}
                    </div>

                    <div className="relative">
                        <div className="login__password">
                            <label htmlFor="login-pass" className="login__label">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Enter your password"
                                className={`login__input ${validationErrors.password ? "login__input-error" : ""}`}
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
                                    <RiEyeLine
                                        className="login__password-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <RiEyeOffFill
                                        className="login__password-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )
                            }
                        </div>
                        {validationErrors.password && (
                            <p className="login__error">{validationErrors.password}</p>
                        )}
                    </div>
                </div>

                <div>
                    <span className="login__signup">
                        You do not have an account? <Link to="#" className="login__signup-link">Sign up</Link>
                    </span>

                    <Link to={""} className="login__forgot">
                        You forgot your password
                    </Link>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`login__button button ${isLoading ? "login__button-disabled" : ""}`}
                    >
                        {isLoading ? "Loading..." : "Log In"}
                    </button>
                </div>
            </form>

            <RiCloseLine
                className="login__close"
                onClick={() => setLoginOpen(false)}
            />
        </div>
    );
}

export default Login;