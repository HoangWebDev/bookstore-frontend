import { ReactNode } from "react";

export type ButtonType = {
    children?: ReactNode;
    to?: string | null;
    href?: string | null;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: () => void
}