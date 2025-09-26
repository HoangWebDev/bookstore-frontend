import PublisherModel from "~/models/PublisherModel";
import { FormField } from "~/types/formType";

const publisherFields: FormField<PublisherModel>[] = [
    {
        name: "slug",
        label: "Slug",
        type: "text",
        element: "input",
        placeholder: "Auto-generated slug",
        required: true,
        validation: {
            required: "Slug is required",
            minLength: {
                value: 3,
                message: "Slug must be at least 3 characters"
            },
            pattern: {
                value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: "Slug can only contain lowercase letters, numbers, and hyphens"
            }
        }
    },
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
