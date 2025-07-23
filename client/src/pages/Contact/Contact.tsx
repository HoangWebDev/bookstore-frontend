import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import "./Contact.module.scss"
import Form from "~/components/ui/Form/Form";
import contactFields from "~/constants/contactFields";
import useGet from "~/hooks/useGet";
import ContactModel from "~/models/ContactModel";

function Contact() {
    const { data: contact } = useGet<ContactModel>(`/contact/contact/1`);
    const handleSubmit = () => {
        console.log("submit");
    }
    return (
        <>
            {/* < !--==================== CONTACT ==================== */}
            <section className="contact section">
                <div className="contact__navigate container">
                    <span className="contact__navigate-link">
                        Home
                        <RiArrowRightSLine />
                        Contact
                    </span>

                    <Link to="/" className="contact__navigate-prevent">
                        <RiArrowLeftLine className="contact__navigate-prevent--icon" />
                        Home
                    </Link>
                </div>
                <div className="contact__container container grid">
                    <div
                        className="contact__infor"
                        dangerouslySetInnerHTML={{
                            __html: contact?.content || ""
                        }}
                    />

                    <div className="contact__form">
                        <Form fields={contactFields} onSubmit={handleSubmit} isLoading={false} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;