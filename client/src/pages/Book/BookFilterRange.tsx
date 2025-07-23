import { memo, useCallback, useState } from "react";
import { Ranges } from "~/constants/bookRange";

function BookFilterRange({ ranges, onChange }: { ranges: Ranges, onChange: (ids: string[]) => void }) {
    const [checkedRanges, setCheckedRanges] = useState<string[]>(["all"]);

    const handleCheckboxChange = useCallback((id: string) => {
        let newChecked: string[];

        if (id === "all") {
            // Nếu chọn "All", thì bỏ chọn tất cả các range khác
            newChecked = ["all"];
        } else {
            // Nếu chọn range khác, thì loại bỏ "all" ra khỏi danh sách
            const filtered = checkedRanges.filter(item => item !== "all");

            // Đã chọn trước đó rồi -> bỏ chọn
            if (checkedRanges.includes(id)) {
                newChecked = filtered.filter(item => item !== id);
            } else {
                newChecked = [...filtered, id];
            }

            // Nếu không còn range nào được chọn -> thêm lại "all"
            if (newChecked.length === 0) {
                newChecked = ["all"];
            }
        }

        setCheckedRanges(newChecked);
        onChange(newChecked);

        window.scrollTo({ top: 0, behavior: "smooth" });

    }, [onChange, checkedRanges]);

    return (
        <div className={`book__filters-${ranges.className}`}>
            <h3 className="book__filters-title">
                {ranges.title}
            </h3>
            <ul className="book__filters-ranges">
                {ranges.range.map((range, index) => (
                    <li key={index} className="book__filters-range">
                        <input
                            type="checkbox"
                            checked={checkedRanges.includes(range.id)}
                            onChange={() => {
                                handleCheckboxChange(range.id)
                            }}
                            id={range.id}
                        />
                        <label htmlFor={range.id}>{range.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(BookFilterRange);