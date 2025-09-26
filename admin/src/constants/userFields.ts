import UserModel from "~/models/UserModel";
import { FormField } from "~/types/formType";

const userFields: FormField<UserModel>[] = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        element: "input",
        required: true,
        validation: {
            required: "Full name is required",
            minLength: {
                value: 3,
                message: "At least 3 characters"
            }
        }
    },
    {
        name: "userName",
        label: "User Name",
        type: "text",
        placeholder: "Enter user name",
        element: "input"
    },
    {
        name: "role",
        label: "Role",
        type: "text",
        placeholder: "Enter role",
        element: "input"
    },
]

export default userFields
