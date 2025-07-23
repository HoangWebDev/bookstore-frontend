import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import instance from "~/services/axios";

function usePost() {
    const token = useSelector((state: RootState) => state.token.token);
    return useMutation({
        mutationFn: async ({ url, data }: { url: string, data?: object }) => {
            const response = await instance.post(url, data, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return response;
        },
    });
}

export default usePost;