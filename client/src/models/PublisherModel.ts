class PublisherModel {
    publisherId: number;
    publisherName: string;
    slug: string;
    address: string;

    constructor(publisherId: number, publisherName: string, slug: string, address: string) {
        this.publisherId = publisherId;
        this.publisherName = publisherName;
        this.slug = slug;
        this.address = address
    }
}

export default PublisherModel