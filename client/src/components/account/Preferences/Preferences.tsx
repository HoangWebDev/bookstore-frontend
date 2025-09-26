import { useState } from "react";
import "./Preferences.module.scss"
import { RiCloseFill } from "react-icons/ri";

function Preferences() {
    const [genres, setGenres] = useState<string[]>(['Tiểu thuyết', 'Kinh tế', 'Văn học']);

    const handleAddGenre = () => {
        const newGenre = prompt('Thêm thể loại yêu thích');
        if (newGenre) {
            setGenres([...genres, newGenre]);
        }
    };

    return (
        <div className="preferences">
            <h2>Sở thích</h2>
            <div className="preferences-genre">
                <ul className="preferences-genre__list">
                    {genres.map((genre, index) => (
                        <li key={index}>
                            <span>
                                {genre}
                            </span>
                            <RiCloseFill
                                className="icon"
                                onClick={() => setGenres(genres.filter((_, i) => i !== index))}
                            />
                        </li>
                    ))}
                </ul>
                <div className="preferences-genre__btn">
                    <button className="button" onClick={handleAddGenre}>Thêm thể loại</button>
                </div>
            </div>
        </div>
    );
}

export default Preferences;