import { useEffect, useMemo, useState } from "react";
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import "./Book.module.scss"
import { Link } from "react-router-dom";
import BookFilters from "./BookFilters";
import BookListsItem from "./BookListsItem";
import BookModel from "~/models/BookModel";
import useGet from "~/hooks/useGet";

export interface Filter {
    price: string[],
    genre: string[],
    author: string[],
    publisher: string[]
}

interface QueryParams {
    priceRanges: {
        min: number;
        max: number;
    }[];
    authorId: string;
    publisherId: string;
    categoryId: string;
}

function Book() {
    const [showFilter, setShowFilter] = useState(false);
    const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
    const [filter, setFilter] = useState<Filter>({
        price: [],
        genre: [],
        author: [],
        publisher: []
    });


    useEffect(() => {
        const params = getQueryParamsFromFilter(filter);
        setQueryParams(params);
    }, [filter]);

    const { data: books } = useGet<BookModel[]>("book/filter", {
        params: queryParams // nếu bạn cấu hình hook để hỗ trợ
    });

    console.log(books);


    const filteredBooks = useMemo(() => {
        return books?.filter(book => {
            const matchAuthor =
                filter.author.length === 0 ||
                filter.author.includes("all") ||
                filter.author.includes(book.authorId.toString());

            const matchPublisher =
                filter.publisher.length === 0 ||
                filter.publisher.includes("all") ||
                filter.publisher.includes(book.publisherId.toString());

            const matchGenre =
                filter.genre.length === 0 ||
                filter.genre.includes("all") ||
                filter.genre.includes(book.categoryId.toString());

            const matchPrice =
                filter.price.length === 0 ||
                filter.price.includes("all") ||
                filter.price.some(priceRange => {
                    const [min, max] = priceRange.split("-").map(Number);
                    return book.discountedPrice >= min && book.discountedPrice <= max;
                });

            return matchAuthor && matchPublisher && matchGenre && matchPrice;
        });
    }, [books, filter]);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <>
            {/* < !--==================== BOOK ==================== --> */}
            <section className="book section" id="book">
                <div className="book__navigate container">
                    <span className="book__navigate-link">
                        Home
                        <RiArrowRightSLine />
                        Book
                    </span>

                    <Link to="/" className="book__navigate-prevent">
                        <RiArrowLeftLine className="book__navigate-prevent--icon" />
                        Home
                    </Link>
                </div>
                <div className="book__container container grid">
                    {/* < !--==================== BOOK FILTERS ==================== --> */}
                    <BookFilters handleShowFilter={handleShowFilter} showFilter={showFilter} setFilter={setFilter} />

                    {/* < !--==================== LISTS BOOK ==================== --> */}
                    <BookListsItem books={filteredBooks || []} />
                </div>
            </section>
        </>
    );
}

export default Book;

const getQueryParamsFromFilter = (filter: Filter): QueryParams | null => {
    const { price, genre, author, publisher } = filter;

    // Bỏ "all" nếu có
    const clean = (arr: string[]) => arr.filter(item => item !== "all");

    const cleanPrice = clean(price);
    const cleanAuthor = clean(author);
    const cleanPublisher = clean(publisher);
    const cleanGenre = clean(genre);

    const hasActiveFilter =
        cleanPrice.length || cleanGenre.length || cleanAuthor.length || cleanPublisher.length;

    if (!hasActiveFilter) return null;

    const numericRanges = cleanPrice
        .map(range => {
            const [min, max] = range.split("-").map(Number);
            return (!isNaN(min) && !isNaN(max)) ? { min, max } : null;
        })
        .filter((r): r is { min: number; max: number } => r !== null);

    const mergedRange = (() => {
        if (numericRanges.length === 0) return [];

        const allMins = numericRanges.map(r => r.min);
        const allMaxs = numericRanges.map(r => r.max);

        return [{
            min: Math.min(...allMins),
            max: Math.max(...allMaxs)
        }];
    })();

    return {
        priceRanges: mergedRange,
        authorId: cleanAuthor.join(","),
        publisherId: cleanPublisher.join(","),
        categoryId: cleanGenre.join(","),
    };
};





