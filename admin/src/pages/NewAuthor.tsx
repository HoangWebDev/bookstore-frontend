import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Form from "~/components/ui/Form";
import authorFields from "~/constants/authorFields";
import usePost from "~/hooks/usePost";
import AuthorModel from "~/models/AuthorModel";

function NewAuthor() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = usePost();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (data: AuthorModel) => {

        console.log(data);

        const formData = {
            authorName: data.authorName?.trim() || null, // ✅ khớp với BE            
            biography: data.biography?.trim() || null,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
            dateOfDeath: data.dateOfDeath ? new Date(data.dateOfDeath).toISOString() : null,
        };

        setIsLoading(true);
        try {
            mutate({
                url: "/author/new_author",
                data: formData
            }, {
                onSuccess: async () => {
                    toast.success("Add successful author");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/author/all_authors"] });
                    navigate("/author");
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
                <h1 className="text-xl font-semibold text-gray-800">New Author</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            New Author
                        </li>
                    </ol>
                </nav>
            </div>
            <Form fields={authorFields} onSubmit={handleSubmit} isLoading={isLoading} />
        </section>
    );
}

export default NewAuthor;