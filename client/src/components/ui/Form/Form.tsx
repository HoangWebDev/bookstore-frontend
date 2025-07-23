import { IoIosArrowDown } from "react-icons/io";
import { FieldValues, useForm } from "react-hook-form";
import FormProps from "~/types/formType";
import "./Form.module.scss"


function Form<T extends FieldValues>({ fields, onSubmit, isLoading }: FormProps<T>) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<T>();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div className="form-fields">
                    {fields.map((field, index) => (
                        <div className="field-wrapper" key={index}>
                            <label htmlFor={field.name} className="field-label">
                                {field.label} {field.required && <span className="required-asterisk">*</span>}
                            </label>

                            {/* Kiểm tra nếu là input hay select */}
                            {field.element === "input" ? (
                                (
                                    <input
                                        id={field.name}
                                        type={field.type || "text"}
                                        placeholder={field.placeholder}
                                        {...register(field.name, field.validation)}
                                        className="form-input"
                                    />
                                )
                            ) : field.element === "select" ? (
                                <div className="select-wrapper">
                                    <select
                                        id={field.name}
                                        {...register(field.name, field.validation)}
                                        className="form-select"
                                    >
                                        <option value="" className="placeholder">Select an option</option>
                                        {field.options?.map((option, i) => (
                                            <option key={i} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <IoIosArrowDown className="select-arrow" />
                                </div>
                            ) : null}

                            {/* Hiển thị lỗi */}
                            {errors[field.name] && (
                                <p className="error-message">
                                    {errors[field.name]?.message?.toString()}
                                </p>
                            )}

                            {/* Hiển thị file đã chọn (nếu có) */}
                            {field.type === "file" && watch(field.name) && (
                                <p className="file-selected">
                                    {(watch(field.name) as FileList)?.[0]?.name}
                                </p>
                            )}
                        </div>
                    ))}
                    <div className="button-wrapper">
                        <div className="required-note">
                            (<span className="required-asterisk"> * </span>Required)
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`button submit-button`}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                        <button
                            type="reset"
                            className="button cancel-button"
                            onClick={() => reset()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Form;