import CategoryModel from "~/models/CategoryModel";
import { FormField } from "~/types/formType";

const categoryFields: FormField<CategoryModel>[] = [
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
        name: "categoryName",
        label: "Category Name",
        type: "text",
        placeholder: "Enter category name",
        element: "input",
        required: true,
        validation: {
            required: "Category name is required",
            minLength: {
                value: 3,
                message: "At least 3 characters"
            }
        }
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Enter category description",
        element: "input"
    }
];

export default categoryFields;