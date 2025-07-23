import useGet from "./useGet";
import { Ranges } from "~/constants/bookRange";
import AuthorModel from "~/models/AuthorModel";

function useAuthorRange() {
    const { data: authorsData } = useGet<AuthorModel[]>(`author/all_authors`);

    if (!authorsData) return null;

    const authors: Ranges = {
        className: "authors",
        title: "Authors",
        range: [
            { id: "all", label: "All" },
            ...authorsData.map((item) => ({
                id: item.authorId.toString(),
                label: item.authorName
            }))
        ]
    };

    return authors;
}

export default useAuthorRange;