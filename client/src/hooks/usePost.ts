import { useMutation } from "@tanstack/react-query";
import instance from "~/services/axios";

function usePost() {
    return useMutation({
        mutationFn: async ({ url, data }: { url: string; data: object }) => {
            const response = await instance.post(url, data);
            return response;
        },
    });
}

export default usePost;
