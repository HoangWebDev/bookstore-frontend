import { FaFacebookF, FaGithub, FaTiktok } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "~/components/ui/Button";
import Image from "~/components/ui/Image";
import { RootState } from "~/redux/store";

function Profile() {
    const user = useSelector((state: RootState) => state.admin.admin);
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Profile
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="w-full bg-white rounded-lg border border-gray-200">
                <div className="flex flex-col justify-center items-center p-5 space-y-4">
                    <Image
                        src="https://demo.tailadmin.com/src/images/user/owner.jpg"
                        className="size-20 rounded-full"
                    />
                    <div className="flex gap-3">
                        <Link to={"https://www.facebook.com/"} target="_blank" className="flex justify-center items-center size-12 rounded-full border border-gray-500 cursor-pointer">
                            <FaFacebookF className="size-7" />
                        </Link>
                        <Link to={"https://github.com/"} target="_blank" className="flex justify-center items-center size-12 rounded-full border border-gray-500 cursor-pointer">
                            <FaGithub className="size-7" />
                        </Link>
                        <Link to={"https://www.tiktok.com/"} target="_blank" className="flex justify-center items-center size-12 rounded-full border border-gray-500 cursor-pointer">
                            <FaTiktok className="size-7" />
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{user?.fullName}</h2>
                    </div>
                    <Button className="w-full flex justify-center items-center px-4 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded-3xl transition-colors duration-300 hover:bg-gray-100 cursor-pointer">
                        <LuPencil className="mr-2" />
                        Edit
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Profile;