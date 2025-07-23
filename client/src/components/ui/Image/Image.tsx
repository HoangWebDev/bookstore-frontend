import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import bookDefault from "~/assets/image/discount-book-1.png";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Image.module.scss";

type ImageProps = {
    alt?: string;
    src?: string | FileList | File[];
    className?: string;
    fallbackSrc?: string;
    maxWidth?: string | number;
    maxHeight?: string | number;
    onClick?: () => void;
};

function Image({
    alt,
    src,
    className,
    fallbackSrc = bookDefault,
    maxWidth,
    maxHeight,
    onClick,
}: ImageProps) {
    const [imgSrc, setImgSrc] = useState<string | FileList | File[]>(src || fallbackSrc);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!src) {
            setImgSrc(fallbackSrc);
        }
    }, [src, fallbackSrc]);

    const handleAfterLoad = () => setIsLoaded(true);

    const handleError = () => setImgSrc(fallbackSrc);

    return (
        <LazyLoadImage
            alt={alt}
            src={imgSrc as string}
            placeholderSrc={fallbackSrc}
            effect="blur"
            onLoad={handleAfterLoad}
            onError={handleError}
            className={`image ${className} ${isLoaded ? "image__loaded" : "image__unloaded"}`}
            onClick={onClick}
            style={{
                objectFit: "contain",
                display: "block",
                maxWidth: maxWidth, // Áp dụng maxWidth thông qua style
                maxHeight: maxHeight, // Áp dụng maxHeight thông qua style
            }}
        />
    );
}

export default Image;