import { useEffect, useState } from "react";
import { UseFormSetValue, Path, PathValue, UseFormWatch, FieldValues } from "react-hook-form";

// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str: string): string {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // loại dấu
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D"); // đ → d
    return str;
}

interface UseSlugGeneratorProps<T extends FieldValues> {
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
    nameField: Path<T>; // ví dụ: "bookName"
    slugField: Path<T>; // ví dụ: "slug"
    checkSlugUrl: (slug: string) => string; // callback tạo URL kiểm tra slug
}

export function useSlugGenerator<T extends FieldValues>({
    watch,
    setValue,
    nameField,
    slugField,
    checkSlugUrl
}: UseSlugGeneratorProps<T>) {
    const [slugValid, setSlugValid] = useState<boolean | null>(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const name = watch(nameField) as string;
    const slug = watch(slugField) as string;

    // Tự động sinh slug khi nhập tên
    useEffect(() => {
        if (name && !isSlugManuallyEdited) {
            const generatedSlug = removeVietnameseTones(name)
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

            setValue(slugField, generatedSlug as PathValue<T, Path<T>>);
        }
    }, [name, isSlugManuallyEdited, setValue, slugField]);

    // Kiểm tra slug trùng lặp (debounce 500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (slug) {
                fetch(checkSlugUrl(slug))
                    .then((res) => res.json())
                    .then((data) => setSlugValid(data.isValid));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [slug, checkSlugUrl]);

    return {
        slugValid,
        isSlugManuallyEdited,
        setSlugValid,
        setIsSlugManuallyEdited,
    };
}
