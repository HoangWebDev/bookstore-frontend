import { ReactNode, useState, useEffect, useRef } from "react";
import "./ReadMore.module.scss";

function ReadMore({ children, maxLength }: { children: ReactNode; maxLength: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const textRef = useRef<HTMLDivElement | null>(null);
    const [textHeight, setTextHeight] = useState(0);

    // Tính chiều cao của văn bản khi thu gọn
    useEffect(() => {
        if (textRef.current) {
            setTextHeight(textRef.current.scrollHeight);
        }
    }, [children]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="read__more">
            <div
                className="read__more-text"
                ref={textRef}
                style={{
                    maxHeight: isExpanded ? `${textHeight}px` : `${maxLength}px`,
                }}
            >
                {children}
            </div>

            {/* Hiển thị gradient chỉ khi không mở rộng */}
            {!isExpanded && (
                <div
                    className="read__more-gradient"
                    style={{ height: `${maxLength * 2}px` }}
                />
            )}

            <button onClick={toggleExpand} className="read__more-button">
                {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
        </div>
    );
}

export default ReadMore;
