import { useQuery } from "@tanstack/react-query";
import instance from "~/services/axios";

function useGet<T>(
    url: string,
    options?: object,
    params?: object
) {
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            const response = await instance.get<T>(url, {
                params,
                ...options
            });
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!url,
    });
}

export default useGet;
