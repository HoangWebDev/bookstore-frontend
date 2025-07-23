import { Link } from "react-router-dom";
import Image from "~/components/ui/Image";
import logo from "~/assets/image/favicon.png";
import { MenuItemComponent } from "~/components/ui/NavMenu";
import { menuItems, staticItems, supportItems } from "~/constants/menu";

function Nav() {
    return (
        <>
            <div className="py-8 flex sticky top-0 bg-white z-50">
                <Link to={"/"} className="flex items-center justify-center">
                    <Image src={logo} className="size-8 rounded-md mr-2.5" />
                    <span className="text-2xl font-semibold text-black">E-Book</span>
                </Link>
            </div>
            <div>
                <nav>
                    <h3 className="text-sm font-semibold mb-4 text-white leading-5 p-2.5 bg-blue-500 rounded-md uppercase">Menu</h3>
                    <ul className="flex flex-col gap-4 mb-6">
                        {menuItems.map((item, index) => (
                            <MenuItemComponent key={index} item={item} />
                        ))}
                    </ul>
                    <h3 className="text-sm font-semibold mb-4 text-white leading-5 p-2.5 bg-blue-500 rounded-md uppercase">Static</h3>
                    <ul className="flex flex-col gap-4 mb-6">
                        {staticItems.map((item, index) => (
                            <MenuItemComponent key={index} item={item} />
                        ))}
                    </ul>
                    <h3 className="text-sm font-semibold mb-4 text-white leading-5 p-2.5 bg-blue-500 rounded-md uppercase">Support</h3>
                    <ul className="flex flex-col gap-4 mb-6">
                        {supportItems.map((item, index) => (
                            <MenuItemComponent key={index} item={item} />
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Nav;