import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import instance from "~/services/axios";

function useDelete() {
    const token = useSelector((state: RootState) => state.token.token);
    return useMutation({
        mutationFn: async ({ url }: { url: string }) => {
            const response = await instance.delete(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return response.data;
        },
    });
}

export default useDelete
    ;