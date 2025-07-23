import useGet from "~/hooks/useGet";
import AuthorModel from "~/models/AuthorModel";
import BookModel from "~/models/BookModel";
import CategoryModel from "~/models/CategoryModel";
import PublisherModel from "~/models/PublisherModel";
import { FormField } from "~/types/formType";

const useFieldBook = () => {
    const { data: categories } = useGet<CategoryModel[]>("/category/all_categories")
    const { data: authors } = useGet<AuthorModel[]>("/author/all_authors")
    const { data: publishers } = useGet<PublisherModel[]>("/publisher/all_publishers")

    // Cache để tránh gọi API liên tục cho cùng một slug
    const slugCache = new Map<string, boolean>();

    const checkSlugExists = async (value: unknown): Promise<true | string> => {
        const slug = String(value || "").trim();
        if (!slug) return "Slug is required";

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
            return "Invalid slug format";
        }

        if (slug.length < 3) {
            return "Slug must be at least 3 characters";
        }

        if (slug.length > 100) {
            return "Slug must be less than 100 characters";
        }

        const exists = await actualCheckSlugExists(slug);
        return exists ? "This slug is already taken. Please choose another." : true;
    };

    const actualCheckSlugExists = async (slug: string): Promise<boolean> => {
        if (!slug) return false;

        if (slugCache.has(slug)) {
            return !slugCache.get(slug);
        }

        try {
            const res = await fetch(`/api/book/check_slug?slug=${encodeURIComponent(slug)}`);
            const data = await res.json();
            slugCache.set(slug, data.isValid);
            return !data.isValid;
        } catch (err) {
            console.error("Error checking slug:", err);
            return false;
        }
    };

    const bookFields: FormField<BookModel>[] = [
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
                },
                validate: {
                    checkExists: async (value: unknown): Promise<true | string> => {
                        const slug = String(value || "").trim();
                        if (!slug) return "Slug is required";
                        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "Invalid slug format";
                        if (slug.length < 3) return "Slug must be at least 3 characters";
                        if (slug.length > 100) return "Slug must be less than 100 characters";
                        const exists = await checkSlugExists(slug);
                        return exists ? "This slug is already taken. Please choose another." : true;
                    }
                }
            }
        },
        {
            name: "bookName",
            label: "Book Name",
            type: "text",
            placeholder: "Enter book name",
            element: "input",
            required: true,
            validation: {
                required: "Book name is required",
                minLength: {
                    value: 3,
                    message: "At least 3 characters"
                }
            }
        },
        {
            name: "price",
            label: "Price",
            type: "text",
            placeholder: "Enter price",
            element: "input",
            required: true,
            validation: {
                required: "Price is required",
                validate: (value) => {
                    // Kiểm tra nếu không phải số
                    if (isNaN(Number(value))) return "Please enter a valid number";
                    // Kiểm tra nếu nhỏ hơn hoặc bằng 0
                    if (Number(value) <= 0) return "Price must be greater than 0";
                    return true;
                }
            }
        },
        {
            name: "discountPercent",
            label: "Discount Percent",
            type: "text",
            placeholder: "Enter Discount Percent",
            element: "input",
            required: true,
            validation: {
                required: "Discount Percent is required",
                validate: (value) => {
                    // Kiểm tra nếu không phải số
                    if (isNaN(Number(value))) return "Please enter a valid number";
                    // Kiểm tra nếu nhỏ hơn hoặc bằng 0
                    if (Number(value) <= 0) return "Discount Percent must be greater than 0";
                    return true;
                }
            }
        },
        {
            name: "categoryId",
            label: "Category",
            element: "select",
            options: categories && categories?.map(category => ({ value: category.categoryId, label: category.categoryName })),
            required: true,
            validation: {
                required: "Category is required"
            }
        },
        {
            name: "authorId",
            label: "Author",
            element: "select",
            options: authors && authors?.map(author => ({ value: author.authorId, label: author.authorName })),
            required: true,
            validation: {
                required: "Author is required"
            }
        },
        {
            name: "publisherId",
            label: "Publisher",
            element: "select",
            options: publishers && publishers?.map(publisher => ({ value: publisher.publisherId, label: publisher.publisherName })),
            required: true,
            validation: {
                required: "Publisher is required"
            }
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "Enter book description",
            element: "input"
        },
        {
            name: "publishYear",
            label: "Publish Year",
            type: "text",
            placeholder: "Enter publish year",
            element: "input",
            required: true,
            validation: {
                required: "Publish year is required",
                validate: (value) => {
                    // Kiểm tra nếu không phải số
                    if (isNaN(Number(value))) return "Please enter a valid number";
                    // Kiểm tra nếu nhỏ hơn hoặc bằng 0
                    if (Number(value) <= 0) return "Publish year must be greater than 0";
                    return true;
                }
            }
        },
        {
            name: "coverType",
            label: "Cover Type",
            type: "text",
            placeholder: "Enter cover type",
            element: "input",
            required: true,
            validation: {
                required: "Cover type is required",
                minLength: {
                    value: 3,
                    message: "At least 3 characters"
                }
            }
        },
        {
            name: "pageCount",
            label: "Page Count",
            type: "text",
            placeholder: "Enter page count",
            element: "input",
            required: true,
            validation: {
                required: "Page count is required",
                validate: (value) => {
                    // Kiểm tra nếu không phải số
                    if (isNaN(Number(value))) return "Please enter a valid number";
                    // Kiểm tra nếu nhỏ hơn hoặc bằng 0
                    if (Number(value) <= 0) return "Page count must be greater than 0";
                    return true;
                }
            }
        },
        {
            name: "size",
            label: "Size",
            type: "text",
            placeholder: "Enter size",
            element: "input",
            required: true,
            validation: {
                required: "Size is required",
                minLength: {
                    value: 3,
                    message: "At least 3 characters"
                }
            }
        },
        {
            name: "weight",
            label: "Weight",
            type: "text",
            placeholder: "Enter weight",
            element: "input",
            required: true,
            validation: {
                required: "Weight is required",
                validate: (value) => {
                    // Chuyển dấu phẩy thành dấu chấm (tránh lỗi nhập 13,5 thay vì 13.5)
                    let parsedValue = parseFloat(value ? value.toString().replace(",", ".") : "");

                    // Kiểm tra nếu không phải số hoặc NaN
                    if (isNaN(parsedValue)) return "Please enter a valid number";

                    // Kiểm tra nếu nhỏ hơn hoặc bằng 0
                    if (parsedValue <= 0) return "Weight must be greater than 0";
                    return true;
                }
            }
        },
        {
            name: "image", label: "Image", type: "file",
            element: "input"
        },
    ]

    return { bookFields };
}

export default useFieldBook