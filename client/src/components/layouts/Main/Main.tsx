import ChildrenType from "~/types/childrenType";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Chat from "~/components/ui/Chat/Chat";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import "./Main.module.scss"
import { useState } from "react";
import Button from "~/components/ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

function MainLayout({ children }: ChildrenType) {
    const customer = useSelector((state: RootState) => state.customer.customer);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);

    return (
        <>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
            <Button
                className={`chat__button`}
                onClick={handleShow}
            >
                <IoChatbubbleEllipsesOutline className="chat__button-icon" />
            </Button>
            {show && <Chat userId={customer ? customer?.userId : 0} />}
        </>
    );
}

export default MainLayout;