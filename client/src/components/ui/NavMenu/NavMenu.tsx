import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "~/constants/menu";

function NavMenu({ item }: { item: MenuItem }) {
    const location = useLocation();

    const isActive = item.to === location.pathname

    return (
        <li className="nav__item">
            {item.to
                ? (
                    <Link to={item.to} className={`nav__link ${isActive ? `active-link` : ``}`}>
                        {item.icon && <item.icon className="nav__link-icon" />}
                        <span>{item.label}</span>
                    </Link>
                )
                : null
            }
        </li>
    );
}

export default NavMenu;