import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { useSelector } from "react-redux";
import Button from "~/components/ui/Button";
import FormSearch from "~/components/ui/FormSearch";
import Image from "~/components/ui/Image";
import MenuInfo from "~/components/ui/MenuInfo";
import { RootState } from "~/redux/store";

function Header() {
    const user = useSelector((state: RootState) => state.admin.admin);
    const [openTippy, setOpenTippy] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");

    const menuItems = [
        { icon: <FaRegUserCircle />, name: "Edit Profile", to: "/profile" },
        { icon: <IoSettingsOutline />, name: "Accout Setting", to: "/setting" },
    ];

    return (
        <header className="sticky top-0 z-10 w-full items-center justify-center border-b border-gray-200 bg-white">
            <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
                <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <FormSearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                </div>
                <div className="w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none hidden">
                    <div className="flex items-center gap-3">
                        <Button
                            className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                        >
                            <IoMoonOutline className="size-5" />
                        </Button>
                        <div className="relative">
                            <Button className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                                <PiBell className="size-5" />
                            </Button>
                        </div>
                    </div>
                    <MenuInfo
                        items={menuItems}
                        className={`mt-5 flex w-[260px] flex-col rounded-md border border-gray-200 bg-white p-3 shadow-theme-lg text-gray-700 transition-all duration-500 
                        ${openTippy ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                        open={openTippy}
                        setOpen={setOpenTippy}
                    >
                        <div className="flex gap-3 items-center">
                            <Image src="https://demo.tailadmin.com/src/images/user/owner.jpg" className="size-10 rounded-full" />
                            <div className="flex items-center gap-2">
                                <span className="mr-1 block text-sm text-gray-700 font-medium">{user?.fullName || "Henry"}</span>
                                <IoIosArrowDown className={`size-4 transition-all ${openTippy ? "rotate-180" : ""}`} />
                            </div>
                        </div>
                    </MenuInfo>
                </div>
            </div>
        </header >
    );
}

export default Header;