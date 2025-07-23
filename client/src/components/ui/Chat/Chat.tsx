import Image from "~/components/ui/Image/Image";
import Button from "../Button/Button";
import * as signalR from "@microsoft/signalr";

import { PiPaperPlaneTilt, PiPhone } from "react-icons/pi";
import { IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { GoPaperclip } from "react-icons/go";

import "./Chat.module.scss"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Message = {
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
};

interface ChatProps {
    userId: number; // Nhận userId từ props thay vì hardcode
}

function Chat({ userId }: ChatProps) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const adminId = 1; // Admin ID mặc định trong hệ thống

    useEffect(() => {
        if (!userId) return;

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:7263/chathub?userId=${userId}&userType=Customer`)
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(async () => {
                console.log("✅ Connected to SignalR");
                setConnection(newConnection);
                setIsConnected(true);

                // Lấy lịch sử chat với admin
                await newConnection.invoke("LoadMessages", userId, adminId);
            })
            .catch(err => {
                // console.error("❌ Connection error:", err);
                toast.error(`Cannot connect to chat server ${err}`, { duration: 5000, position: "bottom-center" });
            });

        // Sự kiện nhận tin nhắn mới
        newConnection.on("ReceiveMessage", (senderId, receiverId, message, timestamp) => {
            setMessages(prev => [...prev, { senderId, receiverId, message, timestamp }]);
        });

        // Nhận lịch sử tin nhắn
        newConnection.on("LoadChatHistory", (history: Message[]) => {
            // console.log("📂 Loaded chat history", history);
            setMessages(history);
        });

        return () => {
            newConnection.stop();
        };
    }, [userId]);

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!connection || !isConnected || message.trim() === "") {
            toast.error("Please enter a message or check your connection");
            return;
        }

        const newMessage: Message = {
            senderId: userId,
            receiverId: adminId,
            message: message.trim(),
            timestamp: new Date().toISOString(), // timestamp local
        };

        try {
            // Hiển thị ngay tin nhắn mới trong UI
            setMessages(prev => [...prev, newMessage]);

            // Gửi lên server
            await connection.invoke("SendMessageToAdmin", userId, message);

            // Clear input
            setMessage("");
        } catch (error) {
            // console.error("❌ Error sending message:", error);
            toast.error(`Failed to send message ${error}`, { duration: 5000, position: "bottom-center" });
        }
    };


    // Handle key press for sending message
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage(event);
        }
    };

    return (
        <>
            {/* Chat */}
            <div className={`chat-container`}>
                {/* Header Chat */}
                <div className="chat-header">
                    <div className="header-left">
                        <div className="profile-container">
                            <Image
                                src="https://demo.tailadmin.com/src/images/user/user-17.jpg"
                                alt="Admin profile"
                                className="profile-image"
                            />
                            <span className={`online-indicator ${isConnected ? 'online' : 'offline'}`}></span>
                        </div>
                        <div>
                            <h5 className="customer-name">Admin Support</h5>
                            <p className="connection-status">
                                {isConnected ? "Online" : "Connecting..."}
                            </p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <Button className="action-button">
                            <PiPhone className="icon" />
                        </Button>
                        <Button className="action-button">
                            <IoVideocamOutline className="icon" />
                        </Button>
                        <div className="dropdown-container">
                            <Button className="action-button">
                                <HiDotsVertical />
                            </Button>
                            <div className="dropdown-menu">
                                <Button className="dropdown-item">
                                    View More
                                </Button>
                                <Button className="dropdown-item">
                                    Clear Chat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body Chat */}
                <div className="chat-body scrollbar-custom">
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            <p>Start a conversation with our support team</p>
                        </div>
                    ) : (
                        messages
                            .filter(msg =>
                                (msg.senderId === userId && msg.receiverId === adminId) ||
                                (msg.senderId === adminId && msg.receiverId === userId)
                            )
                            .map((msg, index) => (
                                <div key={index} className={`message ${msg.senderId === userId ? "sent" : "received"}`}>
                                    <div className={`message-content ${msg.senderId === userId ? "sent" : "received"}`}>
                                        {/* User Avatar - chỉ hiển thị cho tin nhắn từ admin */}
                                        {msg.senderId !== userId && (
                                            <div className="avatar">
                                                <Image
                                                    src="https://demo.tailadmin.com/src/images/user/user-17.jpg"
                                                    alt="Admin profile"
                                                    className="profile-image"
                                                />
                                            </div>
                                        )}
                                        {/* Message Bubble */}
                                        <div className="message-bubble">
                                            <div className={`bubble ${msg.senderId === userId ? "sent" : "received"}`}>
                                                <p className="message-text">{msg.message}</p>
                                            </div>
                                            <p className="timestamp">
                                                {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Action Chat */}
                <div className="chat-input">
                    <form className="input-form" onSubmit={sendMessage}>
                        <div className="input-container">
                            <Button
                                type="button"
                                className="emoji-button"
                            >
                                <HiOutlineFaceSmile className="icon" />
                            </Button>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="message-input outline-hidden"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={!isConnected}
                            />
                        </div>

                        <div className="input-actions">
                            <Button
                                type="button"
                                className="action-button attachment"
                            >
                                <GoPaperclip className="icon" />
                            </Button>

                            <Button
                                type="button"
                                className="action-button"
                            >
                                <IoMicOutline className="icon" />
                            </Button>

                            <Button
                                type="submit"
                                className="send-button"
                            >
                                <PiPaperPlaneTilt className="icon" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chat;