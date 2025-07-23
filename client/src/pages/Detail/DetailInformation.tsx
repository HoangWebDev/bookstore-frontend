import BookModel from "~/models/BookModel";

function DetailInformation({ bookDetail }: { bookDetail: BookModel }) {
    return (
        <div className="detail__tables">
            <h2 className="detail__tables-title">Information</h2>
            <table className="detail__table">
                <tbody>
                    <tr>
                        <th>Author</th>
                        <td>{bookDetail.author.authorName}</td>
                    </tr>
                    <tr>
                        <th>Publisher</th>
                        <td>{bookDetail.publisher.publisherName}</td>
                    </tr>
                    <tr>
                        <th>Year of publication</th>
                        <td>{bookDetail.publishYear}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>{bookDetail.weight} g</td>
                    </tr>
                    <tr>
                        <th>Dimensions</th>
                        <td>{bookDetail.size}</td>
                    </tr>
                    <tr>
                        <th>Number of pages</th>
                        <td>{bookDetail.pageCount}</td>
                    </tr>
                    <tr>
                        <th>Cover</th>
                        <td>Bìa {bookDetail.coverType}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DetailInformation;