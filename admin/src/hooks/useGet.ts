import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import instance from "~/services/axios";

function useGet<T>(
    url: string,
    options?: object,
) {
    const token = useSelector((state: RootState) => state.token.token);
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            const response = await instance.get<T>(url, {
                ...options,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!url,
    });
}

export default useGet;