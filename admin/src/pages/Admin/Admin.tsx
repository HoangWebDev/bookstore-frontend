import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import FormEdit from "~/components/ui/FormEdit";
import useFieldBook from "~/constants/bookFields";
import userFields from "~/constants/userFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import UserModel from "~/models/UserModel";

function Admin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: put } = usePut();
    const { data: admin } = useGet<UserModel>(`/user/user/1`);


    const handleSubmit = (data: UserModel) => {
        const formData = new FormData();

        formData.append("fullName", data.fullName);
        formData.append("discountPercent", data.userName);
        formData.append("categoryId", data.passwordHash);

        setIsLoading(true);

        try {
            put({
                url: "/book/update_book",
                data: formData
            }, {
                onSuccess: (response) => {
                    console.log(response);
                    toast.success("Update successful user");
                    // Invalidate query để đảm bảo data mới nhất
                    queryClient.invalidateQueries({ queryKey: ["/user/all_users"] });
                    // Invalidate lại thông tin của sách hiện tại
                    queryClient.invalidateQueries({ queryKey: [`/user/user/1`] });
                    navigate("/admin");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false); // Dừng loading bất kể thành công hay lỗi
                }
            })
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Admin Information</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Admin
                        </li>
                    </ol>
                </nav>
            </div>
            <FormEdit fields={userFields} onSubmit={handleSubmit} defaultValues={admin} isLoading={isLoading} />
        </section>
    );
}

export default Admin;