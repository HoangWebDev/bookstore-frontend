import CategoryModel from "~/models/CategoryModel";
import useGet from "./useGet";
import { Ranges } from "~/constants/bookRange";

function useGenreRange() {
    const { data: genresData } = useGet<CategoryModel[]>(`category/all_categories`);

    if (!genresData) return null;

    const ranges: Ranges = {
        className: "genres",
        title: "Genre",
        range: [
            { id: "all", label: "All" },
            ...genresData.map((item) => ({
                id: item.categoryId.toString(),
                label: item.categoryName
            }))
        ]
    };

    return ranges;
}

export default useGenreRange;