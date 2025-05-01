import { use } from "react";
import { useEffect, useState } from "react";
import React from "react";
import EditGroup from "./Edit";
import { useLocation, useNavigate } from "react-router-dom";

function SearchGroups() {
    const [groups, setGroups] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        setGroups(savedGroups);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value.toLowerCase();
        if (searchTerm.trim() == "") {
            setFilteredGroups([]); //Clear the filtered Groups
        } else {
            const filtered = groups.filter((group) =>
                group.name.toLowerCase().includes(searchTerm)
            );
            setFilteredGroups(filtered); //Set the filtered groups to the state
        }
    }

    const handleEdit = (group) => {

        navigate(`/Edit`, { state: { group } });
    }
    return (<>
        <form onSubmit={handleSubmit}>
            <h2>Search for a group</h2>
            <input type="text" name="search" placeholder="Search by group name" />
            <button type="submit">Search</button>
        </form>
        <h2>Search Results</h2>
        {filteredGroups.length > 0 ? (
            <ul>
                {filteredGroups.map((group, index) => (
                    <li key={index}>
                        <strong>{group.name}</strong>: {group.description} ({group.tag})
                        <button onClick={()=> handleEdit(group)}>Edit</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>{filteredGroups.length === 0 && "No Groups Found"}</p>
        )}


    </>
    )
}
export default SearchGroups;