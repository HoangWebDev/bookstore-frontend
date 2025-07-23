import useGet from "./useGet";
import { Ranges } from "~/constants/bookRange";
import PublisherModel from "~/models/PublisherModel";

function usePublisherRange() {
    const { data: publishersData } = useGet<PublisherModel[]>(`publisher/all_publishers`);

    if (!publishersData) return null;

    const publishers: Ranges = {
        className: "publishers",
        title: "Publishers",
        range: [
            { id: "all", label: "All" },
            ...publishersData.map((item) => ({
                id: item.publisherId.toString(),
                label: item.publisherName
            }))
        ]
    };

    return publishers;
}

export default usePublisherRange;