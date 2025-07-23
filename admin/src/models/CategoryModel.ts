class CategoryModel {
    categoryId: number;
    categoryName: string;
    slug: string;
    description: string;

    constructor(categoryId: number, categoryName: string, slug: string, description: string) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.slug = slug;
        this.description = description;
    }
}

export default CategoryModel