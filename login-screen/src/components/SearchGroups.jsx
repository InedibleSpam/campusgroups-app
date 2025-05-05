import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateGroupButton from "./CreateGroupButton";

function SearchGroups({ onSearch, groups = [] }) {
    const [filteredGroups, setFilteredGroups] = useState(groups);
    const [searchType, setSearchType] = useState("title");
    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(groups)) {
            setFilteredGroups(groups);
        }
    }, [groups]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.trim() === "") {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter((group) =>
                searchType === "title"
                    ? group.name.toLowerCase().includes(searchTerm)
                    : group.tag && group.tag.toLowerCase().includes(searchTerm)
            );
            setFilteredGroups(filtered);
        }
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleEdit = (group) => {
        navigate(`/edit-group/${group.id}`, { state: { group } });
    };

    return (
        <div className="search-groups-container">
            <div className="groups-header">
                <h1>All Groups</h1>
                <CreateGroupButton />
            </div>
            <form className="search-groups-form">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="search-groups-select"
                >
                    <option value="title">Title</option>
                    <option value="tag">Tag</option>
                </select>
                <input
                    type="text"
                    name="search"
                    placeholder={`Search by ${searchType}`}
                    onChange={handleSearch}
                    className="search-groups-input"
                />
            </form>
            <h2 className="search-groups-results-title">Search Results</h2>
            {filteredGroups && filteredGroups.length > 0 ? (
                <ul className="search-groups-list">
                    {filteredGroups.map((group) => (
                        <li key={group.id} className="search-groups-item">
                            <strong>{group.name}</strong>
                            {/* <br></br> */}
                             {group.description} ({group.tag})
                            <button
                                className="search-groups-edit-button"
                                onClick={() => handleEdit(group)}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="search-groups-no-results">No Groups Found</p>
            )}
        </div>
    );
}

export default SearchGroups;