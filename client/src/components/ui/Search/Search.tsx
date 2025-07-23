import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import "./Search.module.scss"

function Search({ setSearchOpen }: { setSearchOpen: (open: boolean) => void }) {
    return (
        // < !--==================== SEARCH ==================== -->
        <div className="search grid" id="search-content">
            <form action="" className="search__form grid">
                <RiSearchLine className="search__icon" />
                <input type="search" placeholder="What are you looking for?" className="search__input" />
            </form>

            <RiCloseLine className="search__close" onClick={() => setSearchOpen(false)} />
        </div>
    );
}

export default Search;