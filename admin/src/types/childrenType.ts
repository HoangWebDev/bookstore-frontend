import { ReactNode } from "react";

type ChildrenType = {
    children: ReactNode,
    className?: string,
    style?: React.CSSProperties,
    key?: string | number
}

export default ChildrenType