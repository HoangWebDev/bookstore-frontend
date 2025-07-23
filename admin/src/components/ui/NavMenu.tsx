import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "~/assets/scss/MenuItem.module.scss";
import { MenuItem } from "~/constants/menu";

export const MenuItemComponent = ({ item }: { item: MenuItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;

    const isActive = item.to === location.pathname || item.children?.some((child) => child.to === location.pathname);

    return (
        <li className="menu_item-container">
            {item.to ? (
                // Link item
                <Link to={item.to} className={`menu_item ${isActive ? "menu_item-active" : ""}`}>
                    {item.icon && <item.icon className="menu_item-icon" />}
                    <span className="menu_item-label">{item.label}</span>
                </Link>
            ) : (
                // Menu có submenu
                <button
                    className={`menu_item menu_item-button ${isActive ? "menu_item-active" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="menu_item-icon" />}
                        <span className="menu_item-label">{item.label}</span>
                    </div>
                    <IoIosArrowDown
                        className={`arrow_icon ${isOpen ? "arrow_icon-open" : ""}`}
                    />
                </button>
            )}

            {/* Submenu container - luôn hiển thị nhưng với chiều cao 0 khi đóng */}
            {hasChildren && (
                <ul className={`submenu_container ${isOpen ? "submenu_container-open" : ""}`}>
                    {item.children?.map((child: MenuItem, index: number) => (
                        <MenuItemComponent key={index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};
