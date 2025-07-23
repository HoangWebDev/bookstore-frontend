import { IconType } from "react-icons";
import { FaRegAddressBook } from "react-icons/fa6";
import { IoIosPerson, IoMdBook } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";

// Định nghĩa type cho menu item
export interface MenuItem {
    icon?: IconType;
    label: string;
    to?: string;
    children?: MenuItem[];
}


// Menu structure with multiple levels
export const menuItems: MenuItem[] = [
    {
        icon: LuLayoutDashboard,
        label: "Dashboard",
        children: [
            { label: "eCommerce", to: "/" },
            {
                label: "Statistics",
                children: [
                    { label: "Monthly", to: "/home/stats/monthly" },
                    { label: "Yearly", to: "/home/stats/yearly" }
                ]
            }
        ]
    },
    {
        icon: IoMdBook,
        label: "Book",
        to: "/book"
    },
    {
        icon: MdOutlineCategory,
        label: "Category",
        to: "/category"
    },
    {
        icon: IoIosPerson,
        label: "Author",
        to: "/author"
    },
    {
        icon: FaRegAddressBook,
        label: "Publisher",
        to: "/publisher"
    }
];

export const staticItems: MenuItem[] = [
    {
        icon: RiContactsLine,
        label: "Contact",
        to: "/contact"
    },
];

export const supportItems: MenuItem[] = [
    {
        icon: IoChatbubbleEllipsesOutline,
        label: "Chat",
        to: "/chat"
    },
];