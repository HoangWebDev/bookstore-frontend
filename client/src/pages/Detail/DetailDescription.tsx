import ReadMore from "~/components/ui/ReadMore/ReadMore";
import BookModel from "~/models/BookModel";

function DetailDescription({ bookDetail }: { bookDetail: BookModel }) {
    return (
        <div className="detail__description">
            <h2 className="detail__description-title">Description</h2>
            <ReadMore maxLength={100}>
                <>
                    <div className="detail__description-author">
                        <h3 className="detail__description-author-title">About the Author</h3>
                        <div
                            className="rich-content-wrapper"
                            dangerouslySetInnerHTML={{ __html: bookDetail?.author?.biography || "" }}
                        />
                    </div>
                    <div className="detail__description-book">
                        <h3 className="detail__description-book-title">About the Book</h3>
                        <div
                            className="rich-content-wrapper"
                            dangerouslySetInnerHTML={{
                                __html: bookDetail?.description || ""
                            }}
                        />
                    </div>
                </>
            </ReadMore>
        </div>
    );
}

export default DetailDescription;