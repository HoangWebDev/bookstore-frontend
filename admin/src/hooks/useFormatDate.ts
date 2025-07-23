import { format } from "date-fns";

function useFormatDate(date: string | number | Date | null | undefined, dateFormat: string) {
    if (!date) return "N/A";
    try {
        return format(new Date(date), dateFormat);
    } catch (error) {
        console.error("Invalid date format:", date, error);
        return "Invalid Date";
    }
}

export default useFormatDate;