import joinBg from "~/assets/image/join-bg.jpg";
import "./Join.module.scss"
import Button from "~/components/ui/Button/Button";

function Join() {
    return (
        // < !--==================== JOIN ==================== -->
        <section className="join section">
            <div className="join__container">
                <img src={joinBg} alt="image" className="join__bg" />

                <div className="join__data container grid">
                    <h2 className="join__title section__title">
                        Subscribe To Receive <br />
                        The Latest Updates
                    </h2>

                    <form action="" className="join__form">
                        <input type="email" placeholder="Enter email" className="join__input" />
                        <Button type="submit" className="join__button">Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Join;