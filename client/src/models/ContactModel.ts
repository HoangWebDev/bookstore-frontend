class ContactModel {
    contactId: number;
    content: string;
    createdAt: Date;

    constructor(contactId: number, content: string, createdAt: Date) {
        this.contactId = contactId;
        this.content = content;
        this.createdAt = createdAt;
    }
}

export default ContactModel;