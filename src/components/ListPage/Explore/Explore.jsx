import { SearchandFilterProvider } from "../../../context/SearchAndFilterContext";
import Filters from './Filters/Filters';
import SearchResults from "./SearchResult/SearchResults";

export default function Explore() {
    return (
        <>
            <SearchandFilterProvider>
                <div className="min-h-[386px] bg-[#002A3B] flex flex-col ">
                <Filters />
                <SearchResults />
                </div>
            </SearchandFilterProvider>
        </>
    )
}