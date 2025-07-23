import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Table from "~/components/ui/DataTable";
import Popup from "~/components/ui/Popup";
import useDelete from "~/hooks/useDelete";
import useGet from "~/hooks/useGet";
import CategoryModel from "~/models/CategoryModel";

function Category() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data } = useGet<CategoryModel[]>(`/category/all_categories`)
    const { mutate: del } = useDelete();

    const [visible, setVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const CategoryColumn: ColumnDef<CategoryModel>[] = [
        { accessorKey: "categoryName", header: "Category" },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const categoryId = row.original.categoryId
                return (
                    <div className="flex justify-center gap-2">
                        {/* Nút Xóa */}
                        <div
                            className="bg-red-100 flex justify-center items-center py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-red-200 cursor-pointer"
                            onClick={() => {
                                setSelectedCategoryId(categoryId);
                                setVisible(true)
                            }}
                        >
                            <FiTrash2 className="size-4 text-red-500 transition-all duration-300 hover:text-red-600" />
                        </div>

                        {/* Popup Xóa */}
                        <Popup visible={visible} setVisible={setVisible}>
                            <>
                                <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
                                <p className="mt-2 text-base text-gray-600">Are you sure you want to delete this category?</p>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-200 rounded-md transition-colors duration-300 hover:bg-gray-300"
                                        onClick={() => setVisible(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-md transition-colors duration-300 hover:bg-red-700"
                                        onClick={() => {
                                            if (selectedCategoryId === null) return
                                            handleDelete(selectedCategoryId);
                                            setVisible(false);
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </>
                        </Popup>

                        {/* Nút Chỉnh Sửa */}
                        <Link
                            to={`/category/update/${categoryId}`}
                            className="bg-blue-100 flex justify-center items-center py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-blue-200 cursor-pointer"
                        >
                            <FiEdit2 className="size-4 text-blue-500 transition-all duration-300 hover:text-blue-600" />
                        </Link>
                    </div >
                )
            },
        }
    ];

    const handleDelete = (categoryId: number) => {
        del({
            url: `/category/delete_category/${categoryId}`
        }, {
            onSuccess: async () => {
                toast.success("Delete successful category");
                // Invalidate query để đảm bảo data mới nhất
                await queryClient.invalidateQueries({ queryKey: ["/category/all_categories"] });
                navigate("/category");
            },
            onError: (error: Error) => {
                console.log(error);
            }
        })
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Category</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Category
                        </li>
                    </ol>
                </nav>
            </div>
            <Table data={data || []} columns={CategoryColumn} link="/category/new" />
        </section>
    );
}

export default Category;