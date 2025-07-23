import { IoSearch } from "react-icons/io5";

type Props = {
    globalFilter: string;
    setGlobalFilter: (value: string) => void | undefined;
};

function FormSearch({ globalFilter, setGlobalFilter }: Props) {
    return (
        <div className="relative">
            <form action="">
                <IoSearch className="size-5 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 fill-gray-400" />
                <input
                    type="search"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400
                    focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" />
            </form>
        </div>
    );
}

export default FormSearch;