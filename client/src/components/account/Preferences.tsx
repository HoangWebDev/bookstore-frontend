import { useState } from "react";

function Preferences() {
    const [genres, setGenres] = useState<string[]>(['Tiểu thuyết', 'Kinh tế', 'Văn học']);

    const handleAddGenre = () => {
        const newGenre = prompt('Thêm thể loại yêu thích');
        if (newGenre) {
            setGenres([...genres, newGenre]);
        }
    };

    return (
        <div className="section">
            <h2>Sở thích</h2>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
            <button className="btn" onClick={handleAddGenre}>Thêm thể loại</button>
        </div>
    );
}

export default Preferences;