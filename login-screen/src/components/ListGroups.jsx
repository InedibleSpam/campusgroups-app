import { use } from "react"
import { useEffect, useState } from "react";
import React from "react";

function ListGroups() {

    const[groups, setGroups] = useState([])
    useEffect(() => {
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        setGroups(savedGroups);
    }, []);

    return <>

        <h2>List of all the Groups</h2>
        {groups.length > 0 ? (
            <ul>
                {groups.map((group, index) => (
                    <li key={index}>
                        <strong>{group.name}</strong>: {group.description} ({group.tag})
                    </li>
                ))}
            </ul>
        ) : (
            <p>No groups found.</p>
        )}


    </>
}
export default ListGroups