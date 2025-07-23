import { MenuItemType } from "~/types/tippyType";
import Button from "./Button";

function Wrapper({ data, onClick }: MenuItemType) {
    return (
        <Button
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium w-full text-gray-700 hover:bg-gray-100`}
            to={data.to}
            onClick={onClick}
        >
            <span className="text-xl text-gray-500 group-hover:text-gray-700">{data.icon}</span>
            <span className="text-gray-500 group-hover:text-gray-700">{data.name}</span>
        </Button>
    );
}

export default Wrapper;