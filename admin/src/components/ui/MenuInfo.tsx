import { useEffect, useRef } from "react";
import { MenuType } from "~/types/tippyType";
import Wrapper from "./Wrapper";
import Button from "./Button";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { removeAdmin } from "~/redux/admin";
import { removeToken } from "~/redux/token";

function MenuInfo({ children, items = [], className, open, setOpen }: MenuType) {
    const dispatch = useDispatch();
    const tippyRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.admin.admin);

    const renderItems = () => {
        return items.map((item, index) => (
            <Wrapper key={index} data={item} onClick={item.onClick} />
        ));
    };

    // Đóng Tippy khi click bên ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (tippyRef.current && !tippyRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);

    const logout = () => {
        dispatch(removeAdmin())
        dispatch(removeToken())
    }

    return (
        <div ref={tippyRef} className="relative cursor-pointer">
            <div onClick={() => setOpen(!open)}>{children}</div>
            {open && (
                <div
                    className={`absolute right-1 z-50 mt-1 transition-all duration-200 
                        ${className}`}
                >
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">{user?.fullName || "Henry Micheal"}</span>
                        <span className="mt-0.5 block text-xs text-gray-500">henry@gmail.com</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4">
                        {renderItems()}
                    </div>
                    <Button
                        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium mt-3 text-gray-700 hover:bg-gray-100"
                        onClick={logout}
                    >
                        <span className="text-xl text-gray-500 group-hover:text-gray-700">
                            <PiSignOutBold />
                        </span>
                        <span className="text-gray-500 group-hover:text-gray-700">Sign out</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default MenuInfo;
