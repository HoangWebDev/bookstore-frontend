import discountBook1 from "~/assets/image/discount-book-1.png";
import discountBook2 from "~/assets/image/discount-book-2.png";
import "./Discount.module.scss";
import Image from "~/components/ui/Image/Image";
import Button from "~/components/ui/Button/Button";

function Discount() {
    return (
        // < !--==================== DISCOUNT ==================== -->
        <section className="discount section" id="discount">
            <div className="discount__container container grid">
                <div className="discount__data">
                    <h2 className="discount__title section__title">
                        Up To 50% Discount
                    </h2>

                    <p className="discount__description">
                        Take advantage of the discount days we
                        have for you, buy books from your favorite
                        writers, the more you buy, the more
                        discounts we have for you.
                    </p>

                    <Button to="#">
                        Shop Now
                    </Button>
                </div>

                <div className="discount__images">
                    <Image src={discountBook1} alt="image" className="discount__img-1" />
                    <Image src={discountBook2} alt="image" className="discount__img-2" />
                </div>
            </div>
        </section>
    );
}

export default Discount;