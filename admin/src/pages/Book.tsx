import { ColumnDef } from "@tanstack/react-table";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RiArrowRightSLine } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Table from "~/components/ui/DataTable";
import useFormatDate from "~/hooks/useFormatDate";
import useGet from "~/hooks/useGet";
import BookModel from "~/models/BookModel";
import useDelete from "~/hooks/useDelete";
import Image from "~/components/ui/Image";
import Popup from "~/components/ui/Popup";
import { useState } from "react";
import Detail from "~/components/ui/Detail";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import formatPrice from "~/utils/formatPrice";

function Book() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data } = useGet<BookModel[]>(`/book/all_books`)
    const { mutate: del } = useDelete();

    const [visible, setVisible] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const BookColumn: ColumnDef<BookModel>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ getValue }) => {
                const imageUrl = getValue() as string | undefined;
                return imageUrl ? (
                    <Image src={imageUrl} alt="Book Cover" className="w-16 h-16 object-cover rounded" />
                ) : (
                    <span>No Image</span>
                );
            }
        },
        { accessorKey: "bookName", header: "Book" },
        { accessorKey: "author.authorName", header: "Author" },
        { accessorKey: "publisher.publisherName", header: "Publisher" },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ getValue }) => formatPrice(getValue() as number),
        },
        {
            accessorKey: "discountPercent",
            header: "Discount Percent",
            cell: ({ getValue }) => `${getValue() as number}%`,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) => useFormatDate(getValue() as string | undefined, "dd/MM/yyyy"),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const bookId = row.original.bookId
                return (
                    <div className="flex justify-center gap-2">
                        {/* Nút Xóa */}
                        <div
                            className="bg-red-100 flex justify-center items-center py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-red-200 cursor-pointer"
                            onClick={() => {
                                setSelectedBookId(bookId); // Gán đúng ID sách
                                setVisible(true); // Mở popup
                            }}
                        >
                            <FiTrash2 className="size-4 text-red-500 transition-all duration-300 hover:text-red-600" />
                        </div>

                        {/* Popup Xóa */}
                        <Popup visible={visible} setVisible={setVisible}>
                            <>
                                <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
                                <p className="mt-2 text-base text-gray-600">
                                    Are you sure you want to delete this book {selectedBookId}?
                                </p>
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
                                            if (selectedBookId !== null) {
                                                handleDelete(selectedBookId);
                                                setVisible(false);
                                            }
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </>
                        </Popup>

                        {/* Nút Chỉnh Sửa */}
                        <Link
                            to={`/book/update/${bookId}`}
                            className="bg-blue-100 flex justify-center items-center py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-blue-200 cursor-pointer"
                        >
                            <FiEdit2 className="size-4 text-blue-500 transition-all duration-300 hover:text-blue-600" />
                        </Link>
                    </div >
                )
            },
        },
        {
            accessorKey: "detail",
            header: "Detail",
            cell: ({ row }) => {
                const bookId = row.original.bookId
                return (
                    <>
                        <div
                            className="bg-green-100 flex justify-center items-center py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-green-200 cursor-pointer"
                            onClick={() => handleOpenDetail(bookId)}
                        >
                            <CgDetailsMore className="size-4 text-green-500 transition-all duration-300 hover:text-green-600" />
                        </div>
                    </>
                )
            },
        },
    ];

    const handleOpenDetail = (bookId: number) => {
        setSelectedBookId(bookId);
        setOpenDetail(true);
    };

    const handleDelete = (bookId: number) => {
        del({
            url: `/book/delete_book/${bookId}`
        }, {
            onSuccess: async () => {
                toast.success("Delete successful book");
                // Invalidate query để đảm bảo data mới nhất
                await queryClient.invalidateQueries({ queryKey: ["/book/all_books"] });
                navigate("/book");
            },
            onError: (error: Error) => {
                console.log(error);
            }
        })
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Book</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Book
                        </li>
                    </ol>
                </nav>
            </div>
            <Table data={data || []} columns={BookColumn} link="/book/new" />
            {openDetail && selectedBookId &&
                <Detail openDetail={openDetail} setOpenDetail={setOpenDetail} bookId={selectedBookId} />
            }
        </section>
    );
}

export default Book;