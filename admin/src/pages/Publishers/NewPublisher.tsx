import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Form from "~/components/ui/Form";
import publisherFields from "~/constants/publisherFields";
import usePost from "~/hooks/usePost";
import PublisherModel from "~/models/PublisherModel";

function NewPublisher() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = usePost();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (data: PublisherModel) => {
        setIsLoading(true);
        try {
            mutate({
                url: "/publisher/new_publisher",
                data
            }, {
                onSuccess: async () => {
                    toast.success("Add successful publisher");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/publisher/all_publishers"] });
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
                <h1 className="text-xl font-semibold text-gray-800">New Publisher</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            New Publisher
                        </li>
                    </ol>
                </nav>
            </div>
            <Form fields={publisherFields} onSubmit={handleSubmit} isLoading={isLoading} />
        </section>
    );
}

export default NewPublisher;