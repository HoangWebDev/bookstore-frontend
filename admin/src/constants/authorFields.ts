import AuthorModel from "~/models/AuthorModel";
import { FormField } from "~/types/formType";

const authorFields: FormField<AuthorModel>[] = [
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
        name: "authorName",
        label: "Author Name",
        type: "text",
        placeholder: "Enter author name",
        element: "input",
        required: true,
        validation: {
            required: "Author name is required",
            minLength: {
                value: 3,
                message: "At least 3 characters"
            }
        }
    },
    {
        name: "biography",
        label: "Biography",
        type: "text",
        placeholder: "Enter biography",
        element: "input"
    },
    {
        name: "dateOfBirth",
        label: "Date Of Birth",
        type: "date",
        placeholder: "Enter date of birth",
        element: "input"
    },
    {
        name: "dateOfDeath",
        label: "Date Of Death",
        type: "date",
        placeholder: "Enter date of death",
        element: "input"
    },
]

export default authorFields
