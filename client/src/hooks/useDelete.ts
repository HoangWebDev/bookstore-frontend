import { useMutation } from "@tanstack/react-query";
import instance from "~/services/axios";

function useDelete() {
    return useMutation({
        mutationFn: async ({ url }: { url: string }) => {
            const response = await instance.delete(url);
            return response.data;
        },
    });
}

export default useDelete
    ;