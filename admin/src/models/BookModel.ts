import AuthorModel from "./AuthorModel"
import CategoryModel from "./CategoryModel"
import PublisherModel from "./PublisherModel";

class BookModel {
    author: AuthorModel;
    authorId: number;
    bookId: number;
    bookName: string;
    slug: string;
    category: CategoryModel;
    categoryId: number;
    createdAt: Date;
    description: string;
    image?: string | FileList | File[];
    price: number;
    discountPercent: number;
    discountedPrice?: number;
    publisher: PublisherModel;
    publisherId: number;
    publishYear: number;
    pageCount: number;
    weight: number;
    size: string;
    coverType: string;

    constructor(
        bookId: number,
        bookName: string,
        slug: string,
        description: string,
        image: string | FileList | File[],
        price: number,
        discountPercent: number,
        discountedPrice: number,
        createdAt: Date,
        publisher: PublisherModel,
        category: CategoryModel,
        author: AuthorModel,
        authorId: number,
        publisherId: number,
        categoryId: number,
        publishYear: number,
        pageCount: number,
        weight: number,
        size: string,
        coverType: string,
    ) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.slug = slug;
        this.description = description;
        this.image = image;
        this.price = price;
        this.discountPercent = discountPercent;
        this.discountedPrice = discountedPrice;
        this.createdAt = createdAt;
        this.publisher = publisher;
        this.category = category;
        this.author = author;
        this.authorId = authorId;
        this.publisherId = publisherId;
        this.categoryId = categoryId;
        this.publishYear = publishYear;
        this.pageCount = pageCount;
        this.weight = weight;
        this.size = size;
        this.coverType = coverType
    }
}

export default BookModel