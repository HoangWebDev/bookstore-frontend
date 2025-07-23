import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEdit from "~/components/ui/FormEdit";
import categoryFields from "~/constants/categoryFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import CategoryModel from "~/models/CategoryModel";

function EditCategory() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const categoryId = Number(id);

    const [isLoading, setIsLoading] = useState(false);

    const { data: category } = useGet<CategoryModel>(`/category/category/` + categoryId);
    const { mutate: put } = usePut();

    const handleSubmit = (data: CategoryModel) => {
        setIsLoading(true);
        try {
            put({
                url: "/category/update_category",
                data: {
                    categoryId,
                    categoryName: data.categoryName,
                    description: data.description
                }
            }, {
                onSuccess: async () => {
                    toast.success("Update successful category");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/category/all_categories"] });
                    // Invalidate lại thông tin của sách hiện tại
                    await queryClient.invalidateQueries({ queryKey: [`/category/category/${categoryId}`] });
                    navigate("/category");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Edit Category</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Edit Category
                        </li>
                    </ol>
                </nav>
            </div>
            <FormEdit fields={categoryFields} onSubmit={handleSubmit} defaultValues={category} isLoading={isLoading} />
        </section>
    );
}

export default EditCategory;