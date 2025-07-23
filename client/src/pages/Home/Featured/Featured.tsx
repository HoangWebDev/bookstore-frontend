import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { RiArrowRightSLine, RiArrowLeftSLine, RiSearchLine, RiHeart3Line, RiEyeLine } from "react-icons/ri";
import "./Featured.module.scss"
import Image from "~/components/ui/Image/Image";
import useGet from "~/hooks/useGet";
import BookModel from "~/models/BookModel";
import { Link } from "react-router-dom";
import formatPrice from "~/utils/formatPrice";
import Button from "~/components/ui/Button/Button";
import { useDispatch } from "react-redux";
import { addCart } from "~/redux/cart";

function Featured() {
    const dispatch = useDispatch();
    const { data: bookFeatured } = useGet<BookModel[]>('/book/all_books');

    const handleAddToCart = (bookDetail: BookModel) => {
        dispatch(addCart({
            book: bookDetail,
            quantity: 1
        }));
    };

    return (
        // < !--==================== FEATURED ==================== -->
        <section className="featured section" id="featured">
            <h2 className="section__title">
                Featured Books
            </h2>

            <div className="featured__container container">
                <Swiper
                    loop={bookFeatured && bookFeatured.length > 5}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    breakpoints={{
                        1150: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                    }}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    modules={[Navigation, Autoplay]}
                    className="featured__swiper"
                >
                    {bookFeatured?.map((book) => (
                        <SwiperSlide key={book.bookId} className="featured__card">
                            <Link to={`/detail/${book.slug}`}>
                                <Image src={book.image} alt={`Featured Book ${book.bookName}`} className="featured__img" />
                            </Link>
                            <Link to={`/detail/${book.slug}`}>
                                <h2 className="featured__title">{book.bookName}</h2>
                            </Link>
                            <div className="featured__prices">
                                <div>
                                    <span className="featured__discount">{formatPrice(book.discountedPrice)}</span>
                                    <span className="featured__price">{formatPrice(book.price)}</span>
                                </div>
                                <span className="featured__sale">-{book.discountPercent} %</span>
                            </div>
                            <Button
                                onClick={() => handleAddToCart(book)}
                            >
                                Add To Cart
                            </Button>
                            <div className="featured__actions">
                                <button><RiSearchLine /></button>
                                <button><RiHeart3Line /></button>
                                <button><RiEyeLine /></button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Nút Next và Prev */}
                <Button className="swiper-button-next">
                    <RiArrowRightSLine />
                </Button>
                <Button className="swiper-button-prev">
                    <RiArrowLeftSLine />
                </Button>
            </div>
        </section>
    );
}

export default Featured;