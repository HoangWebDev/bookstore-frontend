import { JSX, ReactElement } from "react";

type MenuItemData = {
    icon: JSX.Element;
    name: string;
    to?: string;
    onClick?: (idParam1?: number, idParam2?: number) => void
}

export type MenuType = {
    className?: string;
    children: ReactElement;
    hideOnClick?: boolean;
    onClick?: () => void;
    items: MenuItemData[];
    open: boolean;
    setOpen: (open: boolean) => void;
};

export type MenuItemType = {
    className?: string;
    data: MenuItemData;
    onClick?: () => void;
};