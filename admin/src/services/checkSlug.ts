import instance from "./axios";

export const checkSlugExists = async (url: string, slug: string): Promise<true | string> => {
    try {
        const res = await instance.get(`${url}/${slug}`);

        // Kiểm tra xem có trả đúng kiểu không
        if (!res.data || typeof res.data.exists !== "boolean") {
            return "Unable to validate slug"; // fallback
        }

        return res.data.exists ? "Slug already exists" : true;
    } catch (err: any) {
        console.error("Slug check error:", err);
        return "Check slug error";
    }
};
