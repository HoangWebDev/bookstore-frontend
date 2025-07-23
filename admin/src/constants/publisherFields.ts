import PublisherModel from "~/models/PublisherModel";
import { FormField } from "~/types/formType";

const publisherFields: FormField<PublisherModel>[] = [
    {
        name: "publisherName",
        label: "Publisher Name",
        type: "text",
        placeholder: "Enter publisher name",
        element: "input",
        required: true,
        validation: {
            required: "Publisher name is required",
            minLength: {
                value: 3,
                message: "At least 3 characters"
            }
        }
    },
    {

        name: "address", label: "Address",
        type: "text", placeholder: "Enter publisher address",
        element: "input"
    },
]

export default publisherFields
