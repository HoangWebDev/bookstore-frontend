import { RiLock2Line, RiTruckLine, RiCustomerService2Line } from "react-icons/ri";
import "./Services.module.scss"

function Services() {
    return (
        // < !--==================== SERVICES ==================== -->
        <section className="services section">
            <div className="services__container container grid">
                <article className="services__card">
                    <RiTruckLine className="services__card-icon" />
                    <h3 className="services__title">Free Shipping</h3>
                    <p className="services__description">Order More Than $100</p>
                </article>

                <article className="services__card">
                    <RiLock2Line className="services__card-icon" />
                    <h3 className="services__title">Secure Payment</h3>
                    <p className="services__description">100% Secure Payment</p>
                </article>

                <article className="services__card">
                    <RiCustomerService2Line className="services__card-icon" />
                    <h3 className="services__title">24/7 Support</h3>
                    <p className="services__description">Call us anytime</p>
                </article>
            </div>
        </section>
    );
}

export default Services;