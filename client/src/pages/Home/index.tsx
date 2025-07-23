import Button from "~/components/ui/Button/Button";
import Discount from "./Discount/Discount";
import Featured from "./Featured/Featured";
import Banner from "./Banner/Banner";
import Join from "./Join/Join";
import New from "./New/New";
import Services from "./Services/Services";
import { RiArrowUpLine } from "react-icons/ri";
import "./index.module.scss"
import { useEffect, useState } from "react";

function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleShow = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleShow);
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* < !--==================== HOME ==================== --> */}
            <Banner />

            {/* < !--==================== SERVICES ==================== --> */}
            <Services />

            {/* < !--==================== FEATURED ==================== --> */}
            <Featured />

            {/* < !--==================== DISCOUNT ==================== --> */}
            <Discount />

            {/* < !--==================== NEW ==================== --> */}
            <New />

            {/* < !--==================== JOIN ==================== --> */}
            <Join />

            {/* < !--==================== SCROLL UP ==================== */}

            <Button
                className={`scroll__up ${isVisible ? "show" : ""}`}
                onClick={handleBackToTop}
            >
                <RiArrowUpLine className="scroll__up-icon" />
            </Button>

        </>
    );
}

export default Home;