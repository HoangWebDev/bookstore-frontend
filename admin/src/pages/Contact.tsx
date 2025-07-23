import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import FormStatic from "~/components/ui/FormStatic";
import contactFields from "~/constants/contactFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import ContactModel from "~/models/ContactModel";

function Contact() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: put } = usePut();
    const { data: contact } = useGet<ContactModel>(`/contact/contact/1`);

    const handleSubmit = (data: ContactModel) => {

        const payload: { contactId?: number; content: string } = {
            content: data.content
        };

        if (contact?.contactId) {
            payload.contactId = contact.contactId;
        }

        setIsLoading(true);
        try {
            put({
                url: "/contact/update_contact",
                data: payload
            }, {
                onSuccess: async () => {
                    toast.success("Update successful contact");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/contact/contact"] });
                    navigate("/contact");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Contact Information</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Contact
                        </li>
                    </ol>
                </nav>
            </div>
            <FormStatic fields={contactFields} onSubmit={handleSubmit} defaultValues={contact} isLoading={isLoading} titleForm="Contact" />
        </section>
    );
}

export default Contact;