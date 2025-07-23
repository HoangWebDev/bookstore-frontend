interface Range {
    id: string,
    label: string
}

export interface Ranges {
    className: string,
    title: string,
    range: Range[]
}

const PriceRanges: Ranges =
{
    className: "prices",
    title: "Price",
    range: [
        {
            id: "all",
            label: "All"
        },
        {
            id: "0-50000",
            label: "0 - 50000"
        },
        {
            id: "51000-100000",
            label: "51000 - 100000"
        },
        {
            id: "101000-200000",
            label: "101000 - 200000"
        }
    ]
}

export default PriceRanges