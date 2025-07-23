import CategoryModel from "~/models/CategoryModel";
import { FormField } from "~/types/formType";

const categoryFields: FormField<CategoryModel>[] = [
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