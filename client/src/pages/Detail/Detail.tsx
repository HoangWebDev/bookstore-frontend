import Image from "~/components/ui/Image/Image";
import "./Detail.module.scss"
import { RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri";
import BookModel from "~/models/BookModel";
import { Link, useParams } from "react-router-dom";
import useGet from "~/hooks/useGet";
import DetailItem from "./DetailItem";
import DetailInformation from "./DetailInformation";
import DetailDescription from "./DetailDescription";

function Detail() {
    const { slug } = useParams()

    console.log(slug);

    const { data: bookDetail, isLoading } = useGet<BookModel>(`book/bookbyslug/${slug}`)

    if (isLoading) {
        return (
            <>
                Loading book
            </>
        )
    }

    return (
        <>
            {/* < !--==================== DETAIL ==================== --> */}
            <section className="detail section" id="detail">
                <div className="detail__navigate container">
                    <span className="detail__navigate-link">
                        Home
                        <RiArrowRightSLine />
                        {bookDetail?.category.categoryName}
                    </span>

                    <Link to="/" className="detail__navigate-prevent">
                        <RiArrowLeftLine className="detail__navigate-prevent--icon" />
                        Home
                    </Link>
                </div>
                <div className="detail__container container grid">
                    <div className="detail__images">
                        <Image src={bookDetail?.image} alt="image" className="detail__img" />
                    </div>

                    {/* < !--==================== DETAIL CONTENT ==================== --> */}
                    <DetailItem bookDetail={bookDetail as BookModel} />

                    {/* < !--==================== DETAIL INFORMATION ==================== --> */}
                    <DetailInformation bookDetail={bookDetail as BookModel} />

                    {/* < !--==================== DETAIL DESCRIPTION ==================== --> */}
                    <DetailDescription bookDetail={bookDetail as BookModel} />
                </div>
            </section>
        </>
    );
}

export default Detail;