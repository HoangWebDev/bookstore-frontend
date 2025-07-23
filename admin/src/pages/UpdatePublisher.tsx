import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEdit from "~/components/ui/FormEdit";
import publisherFields from "~/constants/publisherFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import PublisherModel from "~/models/PublisherModel";

function EditPublisher() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const publisherId = Number(id);

    const [isLoading, setIsLoading] = useState(false);

    const { data: publisher } = useGet<PublisherModel>(`/publisher/publisher/` + publisherId);
    const { mutate: put } = usePut();

    const handleSubmit = (data: PublisherModel) => {
        setIsLoading(true);
        try {
            put({
                url: "/publisher/update_publisher",
                data: {
                    publisherId,
                    publisherName: data.publisherName,
                    address: data.address
                }
            }, {
                onSuccess: async () => {
                    toast.success("Update successful publisher");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/publisher/all_publishers"] });
                    // Invalidate lại thông tin của sách hiện tại
                    await queryClient.invalidateQueries({ queryKey: [`/publisher/publisher/${publisherId}`] });
                    navigate("/publisher");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Edit Publisher</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Edit Publisher
                        </li>
                    </ol>
                </nav>
            </div>
            <FormEdit fields={publisherFields} onSubmit={handleSubmit} defaultValues={publisher} isLoading={isLoading} />
        </section>
    );
}

export default EditPublisher;