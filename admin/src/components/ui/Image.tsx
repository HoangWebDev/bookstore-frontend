import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import bookDefault from "~/assets/image/book_default.png";

type ImageProps = {
    alt?: string;
    src?: string;
    className?: string;
    fallbackSrc?: string;
    onClick?: () => void;
};

function Image({ alt, src, className, fallbackSrc = bookDefault, onClick }: ImageProps) {
    const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!src) {
            setImgSrc(fallbackSrc); // Nếu src không tồn tại ngay từ đầu, dùng ảnh mặc định
        }
    }, [src, fallbackSrc]);

    const handleAfterLoad = () => setIsLoaded(true);

    const handleError = () => setImgSrc(fallbackSrc); // Nếu lỗi, đổi sang ảnh mặc định

    return (
        <LazyLoadImage
            alt={alt}
            src={imgSrc}
            placeholderSrc={fallbackSrc}
            effect="blur"
            onLoad={handleAfterLoad}
            onError={handleError}
            className={`${className} transition-opacity duration-700 ease-in-out m-0 p-0 ${isLoaded ? "opacity-100" : "opacity-0 blur-md"
                }`}
            onClick={onClick}
        />
    );
}

export default Image;
