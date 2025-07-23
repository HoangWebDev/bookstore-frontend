import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import Button from "./Button";
import Image from "./Image";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { PiPaperPlaneTilt, PiPhone } from "react-icons/pi";
import { GoPaperclip } from "react-icons/go";
import toast from "react-hot-toast";
import useGet from "~/hooks/useGet";

interface ChatProps {
    userId: number;
    userType: "Admin" | "Customer";
}

type Message = {
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
};

type CustomerChat = {
    lastMessage: {
        message: string;
        timestamp: string;
    };
    user: {
        userId: number;
        fullName: string;
    };
};

const ChatList = ({ userId, userType }: ChatProps) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

    const { data: customersData } = useGet<CustomerChat[]>("https://localhost:7263/api/chat/customers");

    useEffect(() => {
        if (customersData && customersData.length > 0 && selectedCustomer === null) {
            setSelectedCustomer(customersData[0].user.userId);
        }
    }, [customersData]);

    useEffect(() => {
        if (!selectedCustomer || !userId) return;

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:7263/chathub?userId=${userId}&userType=${userType}`)
            .withAutomaticReconnect([1000, 3000, 5000, 10000]) // Giảm tần suất reconnect
            .build();

        newConnection.start()
            .then(() => {
                if (userType === "Admin" && selectedCustomer !== null) {
                    newConnection.invoke("LoadMessages", userId, selectedCustomer);
                } else if (userType === "Customer") {
                    newConnection.invoke("LoadMessages", userId, 0);
                }
            })
            .catch(err => console.error("Connection error: ", err));

        newConnection.on("ReceiveMessage", (senderId, receiverId, message, timestamp) => {
            setMessages(prev => [...prev, { senderId, receiverId, message, timestamp }]);
        });

        newConnection.on("LoadChatHistory", (history) => {
            setMessages(history);
        });

        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, [userId, userType, selectedCustomer]);

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedCustomer) {
            toast.error("Please select a customer before sending a message.");
            return;
        }

        if (connection && message.trim() !== "") {
            await connection.send("SendMessage", userId, userType, selectedCustomer, message);
            setMessage("");
        }
    };

    return (
        <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
            <div className="flex h-full flex-col gap-6 xl:flex-row xl:gap-5">
                {/* List User Chat */}
                <div className="flex-col rounded-lg border border-gray-200 bg-white xl:flex xl:w-1/4">
                    {/* Header */}
                    <div className="sticky px-4 pb-4 pt-4 sm:px-5 sm:pt-5 xl:pb-0">
                        <div className="flex items-center justify-between">
                            <h3 className="text-theme-xl font-semibold text-gray-800 sm:text-2xl">
                                Chats
                            </h3>
                            <Button
                                className="gap-1.5 text-gray-500 cursor-pointer hover:text-gray-800"
                            >
                                <HiDotsVertical />
                            </Button>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="relative my-2 w-full">
                                <form>
                                    <Button className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <CiSearch className="size-5 fill-gray-500" />
                                    </Button>
                                    <input type="text" placeholder="Search..." className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400
                    focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" />
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* List User */}
                    <div className="scrollbar-custom flex-col overflow-auto hidden xl:flex">
                        <div className="flex max-h-full flex-col overflow-auto px-4 pb-4 sm:px-5">
                            <div className="scrollbar-custom max-h-full space-y-1 overflow-auto">
                                {customersData?.map((customer) => (
                                    <div
                                        key={customer.user.userId}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                        onClick={() => setSelectedCustomer(customer.user.userId)}
                                    >
                                        <div className="relative h-12 w-full max-w-[48px] rounded-full">
                                            <Image src="https://demo.tailadmin.com/src/images/user/user-18.jpg" alt="profile" className="h-full w-full overflow-hidden rounded-full object-cover object-center" />
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-[1.5px] border-white bg-green-500"></span>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h5 className="text-sm font-bold text-gray-800">{customer.user.fullName}</h5>
                                                    <p className="mt-0.5 text-xs text-gray-500 truncate w-24">{customer.lastMessage.message}</p>
                                                </div>
                                                <span className="text-xs text-gray-400">{new Date(customer.lastMessage.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Chat */}
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white xl:w-3/4">
                    {/* Header Chat */}
                    <div className="sticky flex items-center justify-between border-b border-gray-200 px-5 py-4 xl:px-6">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-full max-w-[48px] rounded-full">
                                <Image src="https://demo.tailadmin.com/src/images/user/user-17.jpg" alt="profile" className="h-full w-full overflow-hidden rounded-full object-cover object-center" />
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white bg-green-500"></span>
                            </div>
                            <h5 className="text-md font-bold text-gray-700">
                                {selectedCustomer ? customersData?.find((c) => c.user.userId === selectedCustomer)?.user.fullName : "Chọn khách hàng để trò chuyện"}
                            </h5>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                <PiPhone className="size-6" />
                            </Button>
                            <Button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                <IoVideocamOutline className="size-6" />
                            </Button>
                            <div className="relative -mb-1.5">
                                <Button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                    <HiDotsVertical />
                                </Button>
                                <div className="opacity-0 invisible absolute right-0 top-full z-40 w-40 space-y-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                    <Button className="flex w-full rounded-md px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                                        View More
                                    </Button>
                                    <Button className="flex w-full rounded-md px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Body Chat */}
                    <div className="scrollbar-custom max-h-full flex-1 space-y-6 overflow-auto p-5 xl:space-y-8 xl:p-6">
                        {messages
                            .filter(msg => (msg.senderId === selectedCustomer || msg.receiverId === selectedCustomer))
                            .map((msg, index) => (
                                <div key={index} className={`max-w-[350px] ${msg.senderId === userId ? "ml-auto" : ""}`}>
                                    <div className={`flex items-start gap-2 ${msg.senderId === userId ? "flex-row-reverse" : ""}`}>
                                        {/* User */}
                                        {msg.senderId !== userId && (
                                            <div className="h-10 w-10 rounded-full shrink-0">
                                                <Image
                                                    src="https://demo.tailadmin.com/src/images/user/user-17.jpg"
                                                    alt="profile"
                                                    className="h-full w-full overflow-hidden rounded-full object-cover object-center"
                                                />
                                            </div>
                                        )}
                                        {/* Report */}
                                        <div className="flex flex-col">
                                            <div
                                                className={`rounded-md px-3 py-2 max-w-full
                                                        ${msg.senderId === userId
                                                        ? "bg-blue-500 text-white rounded-tr-sm ml-auto"
                                                        : "bg-gray-100 text-gray-800 rounded-tl-sm"
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.message}</p>
                                            </div>

                                            <p className="mt-2 text-xs text-gray-500">
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Action Chat */}
                    <div className="sticky bottom-0 border-t border-gray-200 p-3">
                        <form className="flex items-center justify-between" onSubmit={sendMessage}>
                            <div className="relative w-full">
                                <Button className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 sm:left-3 cursor-pointer">
                                    <HiOutlineFaceSmile className="size-6" />
                                </Button>

                                <input
                                    type="text"
                                    placeholder="Type a message"
                                    className="h-9 w-full border-none bg-transparent pl-12 pr-5 text-sm text-gray-800 outline-hidden placeholder:text-gray-400 focus:border-0 focus:ring-0"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center">
                                <Button className="mr-2 text-gray-500 hover:text-gray-800 cursor-pointer">
                                    <GoPaperclip className="size-6" />
                                </Button>

                                <Button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                                    <IoMicOutline className="size-6" />
                                </Button>

                                <Button
                                    className="ml-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-brand-600 xl:ml-5 cursor-pointer"
                                    onClick={() => sendMessage} // Sửa lại cú pháp onClick
                                >
                                    <PiPaperPlaneTilt className="size-6" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ChatList;
