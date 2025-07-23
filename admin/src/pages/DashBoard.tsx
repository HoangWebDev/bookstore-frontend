import SalesChart from "~/components/ui/SalesChart";
import TargetChart from "~/components/ui/TargetChart";
import Image from "~/components/ui/Image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import useGet from "~/hooks/useGet";
import BookModel from "~/models/BookModel";
import formatPrice from "~/utils/formatPrice";

function DashBoard() {
    const { data: books } = useGet<BookModel[]>('/book/all_books')
    const { data: userCount } = useGet<{ Users: number }>('/statistics/count_user')

    return (
        <section className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-7 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-center size-12 rounded-md bg-gray-100 p-2">
                            <HiOutlineUsers className="size-6" />
                        </div>
                        <div className="mt-5 flex items-end justify-between">
                            <div>
                                <div className="text-sm text-gray-500 font-medium">Customers</div>
                                <h2 className="mt-2 text-3xl font-bold text-gray-800">{userCount && userCount.Users}</h2>
                            </div>
                            <span className="flex items-center bg-green-50 text-green-600 py-0.5 px-2 gap-1 text-sm font-medium rounded-xl">
                                <FaArrowUp className="size-3" />
                                11.5%
                            </span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-center size-12 rounded-md bg-gray-100 p-2">
                            <FiBox className="size-6" />
                        </div>
                        <div className="mt-5 flex items-end justify-between">
                            <div>
                                <div className="text-sm text-gray-500 font-medium">Orders</div>
                                <h2 className="mt-2 text-3xl font-bold text-gray-800">99</h2>
                            </div>
                            <span className="flex items-center bg-red-50 text-red-600 py-0.5 px-2 gap-1 text-sm font-medium rounded-xl">
                                <FaArrowDown className="size-3" />
                                8.5%
                            </span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <SalesChart />
                </div>
            </div>
            <div className="col-span-5">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <TargetChart />
                </div>
            </div>
            <div className="col-span-12">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
                    <table className="w-full text-left">
                        <thead className="border-t border-gray-100">
                            <tr className="bg-gray-50 text-xs text-gray-500">
                                <th className="px-6 py-2">Book</th>
                                <th className="px-6 py-2">Category</th>
                                <th className="px-6 py-2">Author</th>
                                <th className="px-6 py-2">Price</th>
                                <th className="px-6 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {books?.filter(book => book.price > 50).slice(0, 5).map((book) => (
                                <tr key={book.bookId} className="text-sm border-t border-gray-100">
                                    <td className="px-6 py-3 flex items-center gap-3">
                                        <Image className="size-8" src={book.image as string} alt={book.bookName} />
                                        {book.bookName}
                                    </td>
                                    <td className="px-6 py-3 text-gray-500">{book.category.categoryName}</td>
                                    <td className="px-6 py-3 text-gray-500">{book.author.authorName}</td>
                                    <td className="px-6 py-3 text-gray-500">{formatPrice(book.discountedPrice as number)}</td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm font-medium py-1 px-2 rounded-md bg-green-100 text-green-600">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default DashBoard;