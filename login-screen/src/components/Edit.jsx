import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit({ group }) {
    const [groupName, setGroupName] = useState(group.name);
    const [groupDescription, setGroupDescription] = useState(group.description);
    const [groupTag, setGroupTag] = useState(group.tag);
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the updated group object
        const updatedGroup = {
            ...group,
            name: groupName,
            description: groupDescription,
            tag: groupTag,
        };

        // Update the group in localStorage
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        const updatedGroups = savedGroups.map((g) =>
            g.id === group.id ? updatedGroup : g
        );
        localStorage.setItem("groups", JSON.stringify(updatedGroups));

        alert("Group updated successfully!");

        Navigate("/Groups")
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Group Name:
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Group Description:
                <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                />
            </label>
            <br />
            <label>
                Group Tag:
                <select
                    value={groupTag}
                    onChange={(e) => setGroupTag(e.target.value)}
                >
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="Technology">Technology</option>
                    <option value="Art">Art</option>
                </select>
            </label>
            <br />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default Edit;