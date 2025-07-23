import { RiArrowRightSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatList from "~/components/ui/ChatList";
import { RootState } from "~/redux/store";

function Chat() {
    const admin = useSelector((state: RootState) => state.admin.admin);
    const userId = admin?.userId || 0;
    const userType = admin?.role === "Admin" ? "Admin" : "Customer";
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Chat
                        </li>
                    </ol>
                </nav>
            </div>
            <ChatList userId={userId} userType={userType || ""}></ChatList>
        </section>
    );
}

export default Chat;