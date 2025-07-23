import { IoIosArrowDown } from "react-icons/io";
import { DefaultValues, FieldValues, Path, PathValue, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import FormProps from "~/types/formType";
import Button from "./Button";
import AIArticle from "./AIArticle";
import TinyEditor from "./TinyEditor";
import { useSlugGenerator } from "~/hooks/useSlugGenerator";
import { checkSlugExists } from "~/services/checkSlug";

function FormEdit<T extends FieldValues>({ fields, onSubmit, defaultValues, isLoading }: FormProps<T>) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<T>({ defaultValues: (defaultValues ?? {}) as DefaultValues<T> });

    const {
        slugValid,
        isSlugManuallyEdited,
        setSlugValid,
        setIsSlugManuallyEdited,
    } = useSlugGenerator({
        watch,
        setValue,
        nameField: "bookName" as Path<T>,
        slugField: "slug" as Path<T>,
        checkSlugUrl: (slug) => `https://localhost:7263/api/book/check-slug/${slug}`,
    });

    const [showAI, setShowAI] = useState(false);
    const [aiContent, setAIContent] = useState("");

    const [, setShowEditor] = useState(false);
    const [, setEditorContent] = useState(""); // nội dung đã chỉnh sửa

    const initialSlugRef = useRef<string>((defaultValues?.slug ?? "") as string);

    useEffect(() => {
        const aiField = fields.find(f => f.name === "biography" || f.name === "description" || f.name === "content");
        if (aiField) {
            setValue(aiField.name as Path<T>, aiContent as PathValue<T, Path<T>>);
        }
    }, [aiContent, fields, setValue]);

    // Reset form khi defaultValues thay đổi để đảm bảo hiển thị đúng dữ liệu cũ
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleShowAI = () => {
        setShowAI(!showAI);
    };

    console.log(initialSlugRef);

    return (
        <>
            <div className="w-full bg-white rounded-lg border border-gray-200">
                <div className="px-5 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">Edit Form</h3>
                </div>
                <div className="p-5 space-y-6 border-t border-gray-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="-mx-2.5 flex flex-wrap gap-y-5">
                            {/* Slug input riêng */}
                            <div className="w-1/2 px-2.5">
                                <label htmlFor="slug" className="mb-1.5 block text-sm font-bold text-gray-700">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="slug"
                                    type="text"
                                    placeholder="Enter or auto-generate slug"
                                    {...register("slug" as Path<T>, {
                                        required: "Slug is required",
                                        minLength: {
                                            value: 3,
                                            message: "Slug must be at least 3 characters"
                                        },
                                        validate: async (value) => {
                                            setIsSlugManuallyEdited(true);
                                            if (!isSlugManuallyEdited || value === initialSlugRef.current) return true;
                                            return await checkSlugExists("/book/check-slug", value);
                                        }
                                    })}
                                    onChange={() => {
                                        setIsSlugManuallyEdited(true);
                                    }}
                                    className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                />

                                {/* Lỗi từ react-hook-form */}
                                {errors["slug"] && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors["slug"]?.message?.toString()}
                                    </p>
                                )}

                                {/* Kết quả kiểm tra slug từ API */}
                                {slugValid === false && (
                                    <p className="text-sm text-red-500 mt-1">Slug already exists.</p>
                                )}
                                {slugValid === true && (
                                    <p className="text-sm text-green-600 mt-1">Slug is available.</p>
                                )}
                            </div>
                            {fields.map((field, index) => {
                                if (field.name === "slug") return null;
                                if (field.name !== "biography" && field.name !== "description" && field.name !== "content") {
                                    return (
                                        <div className="w-1/2 px-2.5" key={index}>
                                            <label htmlFor={field.name} className="mb-1.5 block text-sm font-bold text-gray-700">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>

                                            {/* Kiểm tra input hoặc select */}
                                            {field.element === "input" ? (
                                                field.type === "file" ? (
                                                    <input
                                                        id={field.name}
                                                        type="file"
                                                        accept="image/*"
                                                        {...register(field.name, field.validation)}
                                                        className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    />
                                                ) : (
                                                    <input
                                                        id={field.name}
                                                        type={field.type || "text"}
                                                        placeholder={field.placeholder}
                                                        {...register(field.name, field.validation)}
                                                        className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    />
                                                )
                                            ) : field.element === "select" ? (
                                                <div className="relative">
                                                    <select
                                                        id={field.name}
                                                        {...register(field.name, field.validation)}
                                                        className="h-11 w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                                                    >
                                                        <option value="" className="text-gray-400">Select an option</option>
                                                        {field.options?.map((option, i) => (
                                                            <option key={i} value={option.value} className="text-gray-700">
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <IoIosArrowDown className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500" />
                                                </div>
                                            ) : null}

                                            {/* Hiển thị lỗi */}
                                            {errors[field.name] && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors[field.name]?.message?.toString()}
                                                </p>
                                            )}

                                            {/* Hiển thị file đã chọn (nếu có) */}
                                            {field.type === "file" && watch(field.name) && (
                                                <p className="text-sm text-green-600 mt-1">
                                                    {(watch(field.name) as FileList)?.[0]?.name}
                                                </p>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <div className="w-full px-2.5 mt-4" key={index}>
                                        <label htmlFor={field.name} className="mb-1.5 block text-sm font-bold text-gray-700">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                            <Button
                                                type="button"
                                                className="py-2.5 px-5 text-sm font-bold border border-red-600 text-center text-white bg-red-600 rounded-md transition-all duration-300 hover:bg-red-700 cursor-pointer"
                                                onClick={handleShowAI}
                                            >
                                                Write an AI article
                                            </Button>
                                        </label>
                                        <TinyEditor
                                            value={watch(field.name) || ""}
                                            onChange={(content) => {
                                                setValue(field.name as Path<T>, content as PathValue<T, Path<T>>);
                                            }}
                                        />
                                        {errors[field.name] && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors[field.name]?.message?.toString()}
                                            </p>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Nút Submit & Cancel */}
                            <div className="w-full px-2.5">
                                <div className="mb-1.5 block text-sm text-gray-400">
                                    (<span className="text-red-500"> * </span>Required)
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-[calc((1/4*100%)-0.5625rem)] py-2.5 px-5 text-sm font-bold border border-blue-600 text-center text-white bg-blue-600 rounded-md transition-all duration-300 hover:bg-blue-700 cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isLoading ? "Loading..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    className="w-[calc((1/4*100%)-0.5625rem)] ml-2 py-2.5 px-5 text-sm font-bold border border-gray-200 text-center text-black bg-white rounded-md transition-all duration-300 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        reset()
                                        setIsSlugManuallyEdited(false);
                                        setSlugValid(null);
                                        initialSlugRef.current = (defaultValues?.slug ?? "") as string;
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {showAI && (
                <AIArticle
                    handleShowAI={() => setShowAI(false)}
                    onContentGenerated={(content) => {
                        setAIContent(content);
                        setEditorContent(content); // hiển thị lên trình soạn thảo
                        setShowEditor(true); // mở trình soạn thảo
                    }}
                />
            )}
        </>
    );
}

export default FormEdit;
