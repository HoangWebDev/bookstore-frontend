import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";
import "./New.module.scss"
import Image from "~/components/ui/Image/Image";
import useGet from "~/hooks/useGet";
import BookModel from "~/models/BookModel";
import formatPrice from "~/utils/formatPrice";

function New() {
    const { data: bookNew } = useGet<BookModel[]>('/book/all_books');
    return (
        //  < !--==================== NEW BOOKS ==================== -->
        <section className="new section" id="new">
            <h2 className="section__title">
                New Books
            </h2>

            <div className="new__container container">
                <Swiper
                    loop={bookNew && bookNew.length > 5}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    breakpoints={{
                        1150: {
                            slidesPerView: 3,
                        },
                    }}
                    className="new__swiper"
                >
                    {bookNew?.map((book) => (
                        <SwiperSlide key={book.bookId} className="new__card">
                            <Link to={`/detail/${book.slug}`}>
                                <Image src={book.image} alt="image" className="new__img" />
                            </Link>

                            <Link to={`/detail/${book.slug}`}>
                                <h2 className="new__title">
                                    {book.bookName}
                                </h2>

                                <div className="new__prices">
                                    <span className="new__discount">{formatPrice(book.discountedPrice)}</span>
                                    <span className="new__price">{formatPrice(book.price)}</span>
                                </div>

                                <div className="new__stars">
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarHalfFill />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    loop={bookNew && bookNew.length > 5}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    breakpoints={{
                        1150: {
                            slidesPerView: 3,
                        },
                    }}
                    className="new__swiper"
                >
                    {bookNew?.map((book, index) => (
                        <SwiperSlide key={index} className="new__card">
                            <Link to={`detail/${book.slug}`}>
                                <Image src={book.image} alt="image" className="new__img" />
                            </Link>

                            <Link to={`detail/${book.slug}`}>
                                <h2 className="new__title">
                                    {book.bookName}
                                </h2>

                                <div className="new__prices">
                                    <span className="new__discount">{formatPrice(book.discountedPrice)}</span>
                                    <span className="new__price">{formatPrice(book.price)}</span>
                                </div>

                                <div className="new__stars">
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarFill />
                                    <RiStarHalfFill />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default New;