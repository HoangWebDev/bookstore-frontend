import { IconType } from "react-icons";
import { RiBookShelfLine, RiContactsBook2Line, RiHomeLine } from "react-icons/ri";

// Định nghĩa type cho menu item
export interface MenuItem {
    icon?: IconType;
    label: string;
    to?: string;
}


// Menu structure with multiple levels
export const menuItems: MenuItem[] = [
    {
        icon: RiHomeLine,
        label: "Home",
        to: "/"
    },
    {
        icon: RiBookShelfLine,
        label: "Book",
        to: "/book"
    },
    {
        icon: RiContactsBook2Line,
        label: "Contact",
        to: "/contact"
    },
];
