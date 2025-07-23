import BookModel from "~/models/BookModel";
import Image from "./Image";
import useGet from "~/hooks/useGet";

type DetailProps = {
    openDetail: boolean;
    setOpenDetail: (open: boolean) => void;
    bookId: number;
};

function Detail({ openDetail, setOpenDetail, bookId }: DetailProps) {
    const { data: book } = useGet<BookModel>(`/book/book/` + bookId);

    if (!book) return null

    return (
        <div
            onClick={() => setOpenDetail(false)}
            className={`
                fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300
                ${openDetail ? "visible bg-black/40 opacity-100" : "invisible opacity-0"}
            `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-h-[80%] max-w-4xl transition-all duration-300 transform scale-95 flex gap-6"
            >
                {/* Ảnh bìa + Giá sách */}
                <div className="w-1/3 flex flex-col">
                    {book.image ? (
                        <Image
                            src={book.image as string}
                            alt={book.bookName}
                            className="w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                    <p className="mt-4 text-lg font-semibold text-red-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price as number)}
                    </p>

                    {/* Các thông tin khác */}
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Size:</span> {book.size}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Publish Year:</span> {book.publishYear}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Page Count:</span> {book.pageCount}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Weight:</span> {book.weight} grams
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Cover Type:</span> {book.coverType}
                    </p>
                </div>

                {/* Thông tin sách */}
                <div className="w-2/3 flex flex-col">
                    {/* Tiêu đề */}
                    <h2 className="text-2xl font-bold text-gray-800">{book.bookName}</h2>

                    {/* Tác giả & Danh mục & NXB */}
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Author:</span> {book.author.authorName}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Publisher:</span> {book.publisher.publisherName}
                    </p>

                    {/* Mô tả */}
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">Description</h3>
                    <div className="overflow-y-auto scrollbar-custom">
                        <p
                            className="text-gray-700 leading-relaxed rich-content-wrapper"
                            dangerouslySetInnerHTML={{
                                __html: book?.description || ""
                            }}
                        />
                        {/* {book.description || "No description available."} */}
                    </div>

                    {/* Nút đóng */}
                    <div className="mt-6 flex justify-end">
                        <button
                            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md transition-all duration-300 hover:bg-blue-700"
                            onClick={() => setOpenDetail(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
