class AuthorModel {
    authorId: number;
    authorName: string;
    slug: string;
    biography?: string;
    dateOfBirth?: Date;
    dateOfDeath?: Date;

    constructor(authorId: number, authorName: string, slug: string, biography?: string, dateOfBirth?: Date, dateOfDeath?: Date) {
        this.authorId = authorId;
        this.authorName = authorName;
        this.slug = slug;
        this.biography = biography;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
    }
}

export default AuthorModel