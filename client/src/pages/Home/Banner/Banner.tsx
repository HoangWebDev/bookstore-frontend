import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import book1 from "~/assets/image/home-book-1.png";
import book2 from "~/assets/image/home-book-2.png";
import book3 from "~/assets/image/home-book-3.png";
import book4 from "~/assets/image/home-book-4.png";
import "./Banner.module.scss"
import Image from "~/components/ui/Image/Image";
import Button from "~/components/ui/Button/Button";

function Banner() {
    return (
        <>
            {/* < !--==================== HOME ==================== --> */}
            <section className="banner section">
                <div className="banner__container container grid">
                    <div className="banner__data">
                        <h1 className="banner__title">
                            Browse & <br />
                            Select E-Books
                        </h1>

                        <p className="banner__description">
                            Find the best e-books from your favorite
                            writers, explore hundreds of books with all
                            possible categories, take advantage of the
                            50% discount and much more.
                        </p>

                        <Button to="">
                            Explore Now
                        </Button>
                    </div>

                    <div className="banner__images">
                        <Swiper
                            loop={true}
                            spaceBetween={-24}
                            grabCursor={true}
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                1220: {
                                    spaceBetween: -32,
                                },
                            }}
                            modules={[Autoplay]}
                            className="banner__swiper"
                        >
                            <SwiperSlide className="banner__article">
                                <Image src={book1} alt="image" className="banner__img" />
                            </SwiperSlide>

                            <SwiperSlide className="banner__article">
                                <Image src={book2} alt="image" className="banner__img" />
                            </SwiperSlide>

                            <SwiperSlide className="banner__article">
                                <Image src={book3} alt="image" className="banner__img" />
                            </SwiperSlide>

                            <SwiperSlide className="banner__article">
                                <Image src={book4} alt="image" className="banner__img" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Banner;