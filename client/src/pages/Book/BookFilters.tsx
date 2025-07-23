import { RiCloseLine, RiFilter3Fill } from "react-icons/ri";
import BookFilterRange from "./BookFilterRange";
import PriceRanges from "~/constants/bookRange";
import useGenreRange from "~/hooks/useGenreRange";
import useAuthorRange from "~/hooks/useAuthorRange";
import usePublisherRange from "~/hooks/usePublisherRange";
import { Filter } from "./Book";
import { memo } from "react";

function BookFilters({ handleShowFilter, showFilter, setFilter }: { handleShowFilter: () => void, showFilter: boolean, setFilter: React.Dispatch<React.SetStateAction<Filter>>; }) {

    const genreRanges = useGenreRange();
    const authorRanges = useAuthorRange();
    const publisherRanges = usePublisherRange();

    if (!genreRanges || !authorRanges || !publisherRanges) return null; // hoặc hiển thị loading...

    return (
        <div className="book__filters">
            <div className="book__filters-buys">
                <ul className="book__filters-lists">
                    <li>Popular</li>
                    <li>Highest Price</li>
                    <li>Lowest Price</li>
                </ul>
            </div>
            <div
                className="book__filters-button"
                onClick={handleShowFilter}
            >
                Filter
                <RiFilter3Fill />
            </div>
            <div className={`book__filters-filter ${showFilter ? "book__filters-filter-active" : ""}`}>
                <div className="book__filters-header">
                    <h2 className="book__filters-text">
                        Filter
                    </h2>
                    <RiCloseLine
                        className="book__filters-close"
                        onClick={handleShowFilter}
                    />
                </div>
                <div className="book__filters-data">

                    {/* <============= PRICE ===============> */}
                    <BookFilterRange
                        ranges={PriceRanges}
                        onChange={(ids) => setFilter(prev => ({ ...prev, price: ids }))}
                    />

                    {/* <============= GENRE ===============> */}
                    <BookFilterRange
                        ranges={genreRanges}
                        onChange={(ids) => setFilter(prev => ({ ...prev, genre: ids }))}
                    />

                    {/* <============= PUBLISHER ===============> */}
                    <BookFilterRange
                        ranges={publisherRanges}
                        onChange={(ids) => setFilter(prev => ({ ...prev, publisher: ids }))}
                    />

                    {/* <============= AUTHOR ===============> */}
                    <BookFilterRange
                        ranges={authorRanges}
                        onChange={(ids) => setFilter(prev => ({ ...prev, author: ids }))}
                    />
                </div>
            </div>

            {showFilter ? <div className="book__filters-overlay" onClick={handleShowFilter}></div> : null}
        </div>
    );
}

export default memo(BookFilters);