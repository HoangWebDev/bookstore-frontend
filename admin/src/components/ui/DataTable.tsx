import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
    SortingState,
    getFilteredRowModel,
} from "@tanstack/react-table";
import "~/assets/scss/DataTable.module.scss"
import FormSearch from "./FormSearch";
import Button from "./Button";
import { IoIosArrowDown } from "react-icons/io";

type Props<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    link?: string
};

function Table<T>({ data, columns, link }: Props<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className={`tableContainer`}>
            <div className="table-button">
                <Button
                    to={link}
                    className="table-button_add"
                >
                    Add
                </Button>
            </div>

            <div className="table-header">
                {/* Dropdown chọn số lượng entries */}
                <div className="entries-selector">
                    <label>Show</label>
                    <div className="relative">
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="w-12 border appearance-none border-gray-200 shadow-xs outline-none focus:border-sky-700 focus:ring-4 focus:ring-sky-700/10"
                        >
                            {[5, 10, 25, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <IoIosArrowDown className="pointer-events-none absolute top-1/2 right-1.5 z-30 -translate-y-1/2 text-gray-500" />
                    </div>
                    <span>entries</span>
                </div>

                {/* Ô tìm kiếm */}
                <FormSearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>

            {/* Bảng */}
            <table className={`table`}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={(header.column.getIsSorted() ?
                                        header.column.getIsSorted() === "asc" ? "sorted-asc " : "sorted-desc "
                                        : "")
                                        + "text-sm text-gray-600"
                                        + (header.column.id === "action" ? " w-20 text-center" : "")
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="text-sm"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="pagination-container">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    {Array.from({ length: table.getPageCount() }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => table.setPageIndex(i)}
                            className={`pagination-button ${table.getState().pagination.pageIndex === i ? "active" : ""}`}
                        >
                            {i + 1}
                        </button>
                    )).slice(0, 3)}
                    {table.getPageCount() > 3 && <span className="pagination-dots">...</span>}
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="pagination-button"
                    >
                        Next
                    </button>
                </div>

                {/* Hiển thị tổng số trang bên phải */}
                <span className="pagination-total">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                    {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries
                </span>
            </div>

        </div>
    );
};

export default Table;
