import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEdit from "~/components/ui/FormEdit";
import authorFields from "~/constants/authorFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import AuthorModel from "~/models/AuthorModel";

function EditAuthor() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const authorId = Number(id);

    const [isLoading, setIsLoading] = useState(false);

    const { mutate: put } = usePut();
    const { data: author } = useGet<AuthorModel>(`/author/author/` + authorId);

    const handleSubmit = (data: AuthorModel) => {
        setIsLoading(true);
        try {
            put({
                url: "/author/update_author",
                data: {
                    authorId,
                    authorName: data.authorName,
                    biography: data.biography,
                    dateOfBirth: data.dateOfBirth,
                    dateOfDeath: data.dateOfDeath
                }
            }, {
                onSuccess: async () => {
                    toast.success("Update successful author");
                    // Invalidate query để đảm bảo data mới nhất
                    await queryClient.invalidateQueries({ queryKey: ["/author/all_authors"] });
                    // Invalidate lại thông tin của sách hiện tại
                    await queryClient.invalidateQueries({ queryKey: [`/author/author/${authorId}`] });
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
                <h1 className="text-xl font-semibold text-gray-800">Edit Author</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Edit Author
                        </li>
                    </ol>
                </nav>
            </div>
            <FormEdit fields={authorFields} onSubmit={handleSubmit} defaultValues={author} isLoading={isLoading} />
        </section>
    );
}

export default EditAuthor;