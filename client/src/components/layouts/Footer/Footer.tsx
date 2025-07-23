import { Link } from "react-router-dom";
import { RiBook3Line, RiFacebookCircleLine, RiInstagramLine, RiTwitterXLine } from "react-icons/ri";
import "./Footer.module.scss"

function Footer() {
    return (
        // < !--==================== FOOTER ==================== -->
        <footer className="footer">
            <div className="footer__container container">
                <div>
                    <Link to="#" className="footer__logo">
                        <RiBook3Line className="footer__logo-icon" />E-Book
                    </Link>

                    <p className="footer__description">
                        Find and explore the best <br />
                        eBooks from all your <br />
                        favorite writers.
                    </p>
                </div>

                <div className="footer__data grid">
                    <div>
                        <h3 className="footer__title">About</h3>

                        <ul className="footer__links">
                            <li>
                                <Link to="#" className="footer__link">Awards</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">FAQs</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">Privacy policy</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">Terms of services</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Company</h3>

                        <ul className="footer__links">
                            <li>
                                <Link to="#" className="footer__link">Blogs</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">Community</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">Our team</Link>
                            </li>

                            <li>
                                <Link to="#" className="footer__link">Help center</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Contact</h3>

                        <ul className="footer__links">
                            <li>
                                <address className="footer__info">
                                    Av. Hacienda <br />
                                    Lima 4321, Perú
                                </address>
                            </li>

                            <li>
                                <address className="footer__info">
                                    e.book@email.com <br />
                                    0987-654-321
                                </address>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer__title">Social</h3>

                        <div className="footer__social">
                            <Link to="https://www.facebook.com/" target="_blank" className="footer__social-link">
                                <RiFacebookCircleLine />
                            </Link>

                            <Link to="https://www.instagram.com/" target="_blank" className="footer__social-link">
                                <RiInstagramLine />
                            </Link>

                            <Link to="https://twitter.com/" target="_blank" className="footer__social-link">
                                <RiTwitterXLine />
                            </Link>
                        </div >
                    </div >
                </div >
            </div >

            <span className="footer__copy">
                &#169; All Rights Reserved By Bedimcode
            </span>
        </footer >
    );
}

export default Footer;