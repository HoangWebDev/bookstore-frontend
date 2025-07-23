import ContactModel from "~/models/ContactModel";
import { FormField } from "~/types/formType";

const contactFields: FormField<ContactModel>[] = [
    {
        name: "content",
        label: "Content",
        type: "text",
        element: "input",
    }
];

export default contactFields;