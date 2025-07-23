import { useMutation } from "@tanstack/react-query";
import instance from "~/services/axios";

function usePut() {
    return useMutation({
        mutationFn: async ({ url, data }: { url: string, data: object }) => {
            const response = await instance.put(url, data);
            return response.data;
        },
    });
}

export default usePut
    ;