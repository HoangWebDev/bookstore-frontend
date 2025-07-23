import { FieldValues, Path, RegisterOptions } from "react-hook-form";

type FieldOption = { label: string; value: number };

export type FormField<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    type?: "text" | "email" | "password" | "number" | "file" | "date";
    placeholder?: string;
    element: "input" | "select";
    required?: boolean;
    options?: FieldOption[];
    validation?: RegisterOptions<T, Path<T>>;
};

type FormProps<T extends FieldValues> = {
    fields: FormField<T>[];
    onSubmit: (data: T) => void;
    defaultValues?: T,
    isLoading?: boolean
};

export default FormProps