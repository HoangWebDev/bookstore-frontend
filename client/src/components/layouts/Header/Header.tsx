import { Link, useLocation } from "react-router-dom";
import {
    RiSearchLine, RiUserLine, RiMoonLine, RiSunLine,
    RiShoppingCart2Line
} from "react-icons/ri";
import "./Header.module.scss";
import { useEffect, useState } from "react";
import Search from "~/components/ui/Search/Search";
import Login from "~/components/ui/Login/Login";
import { menuItems } from "~/constants/menu";
import NavMenu from "~/components/ui/NavMenu/NavMenu";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Image from "~/components/ui/Image/Image";
import logo from "~/assets/image/logo.png";

function Header() {
    const location = useLocation();
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isDarkTheme, setDarkTheme] = useState(localStorage.getItem("selected-theme") === "dark");
    const [isScrolled, setScrolled] = useState(false);
    const cart = useSelector((state: RootState) => state.cart.cartProducts);
    const customer = useSelector((state: RootState) => state.customer.customer);

    // Handle scroll shadow for header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle dark mode
    useEffect(() => {
        document.body.classList.toggle("dark-theme", isDarkTheme);
        localStorage.setItem("selected-theme", isDarkTheme ? "dark" : "light");
    }, [isDarkTheme]);

    return (
        <header className={`header${isScrolled ? " shadow-header" : ""}`}>
            <nav className="nav container">
                <Link to={"/"} className="nav__logo">
                    <Image src={logo} className="nav__logo-icon" /> E-Book
                </Link>

                <div
                    className={`nav__menu ${location.pathname !== "/" ? "nav__menu-show" : ""}`}
                >
                    <ul className="nav__list">
                        {menuItems.map((item, index) => (
                            <NavMenu item={item} key={index} />
                        ))}
                    </ul>
                </div>

                <div className="nav__actions">
                    <RiSearchLine className="search-button nav__actions-icon" onClick={() => setSearchOpen(true)} />
                    {customer ? (
                        <Link to={`/account`}>
                            <RiUserLine className="login-button nav__actions-icon" />
                        </Link>
                    ) : (
                        <RiUserLine className="login-button nav__actions-icon" onClick={() => setLoginOpen(true)} />
                    )}
                    <Link to={"/cart"}>
                        <span
                            className="cart-button"
                            data-count={cart.length > 0 ? `${cart.length}` : "0"}
                        >
                            <RiShoppingCart2Line className="nav__actions-icon" />
                        </span>
                    </Link>
                    {isDarkTheme ? (
                        <RiSunLine className="changeTheme nav__actions-icon" onClick={() => setDarkTheme(false)} />
                    ) : (
                        <RiMoonLine className="changeTheme nav__actions-icon" onClick={() => setDarkTheme(true)} />
                    )}
                </div>
            </nav>

            {isSearchOpen &&
                <>
                    <div
                        className="search__overlay"
                        onClick={() => setSearchOpen(false)}
                    >
                    </div>
                    <Search setSearchOpen={setSearchOpen} />
                </>
            }
            {isLoginOpen &&
                <>
                    <div
                        className="login__overlay"
                        onClick={() => setLoginOpen(false)}
                    >
                    </div>
                    <Login setLoginOpen={setLoginOpen} />
                </>
            }
        </header>
    );
}

export default Header;
