import { FormField } from "~/types/formType";

export type ContactField = {
    fullName: string;
    phone: string;
    email: string;
    content: string;
}

const contactFields: FormField<ContactField>[] = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        element: "input",
    },
    {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter phone",
        element: "input",
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email",
        element: "input",
    },
    {
        name: "content",
        label: "Content",
        type: "text",
        placeholder: "Enter content",
        element: "input"
    }
];

export default contactFields;