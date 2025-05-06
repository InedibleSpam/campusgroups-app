import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberSearch from "./MemberSearch"; // Import the MemberSearch component

function Edit({ group }) {
    const [groupName, setGroupName] = useState(group.name);
    const [groupDescription, setGroupDescription] = useState(group.description);
    const [groupTag, setGroupTag] = useState(group.tag);
    const [members, setMembers] = useState(group.members || []); // Initialize members state
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the updated group object
        const updatedGroup = {
            ...group,
            name: groupName,
            description: groupDescription,
            tag: groupTag,
            members: members, // Include updated members
        };

        // Update the group in localStorage
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        const updatedGroups = savedGroups.map((g) =>
            g.id === group.id ? updatedGroup : g
        );
        localStorage.setItem("groups", JSON.stringify(updatedGroups));

        // alert("Group updated successfully!");

        navigate("/grouphomepage"); // Redirect to the groups page after editing
    };

    const handleDelete = () => {
        // Remove the group from localStorage
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        const updatedGroups = savedGroups.filter((g) => g.id !== group.id);
        localStorage.setItem("groups", JSON.stringify(updatedGroups));

        alert("Group deleted successfully!");

        navigate("/grouphomepage"); // Redirect to the groups page after deletion
    };

    const handleAddMember = (member) => {
        if (!members.some((m) => m.name === member.name)) {
            setMembers([...members, member]);
        } else {
            alert("Member already added!");
        }
    };

    const handleRemoveMember = (memberName) => {
        // Remove the member by their username
        setMembers(members.filter((m) => m.name !== memberName));
    };
    return (
        <div className="create-group-container">
            <div className="search-group-header">
                <h1>Edit Group</h1>
            </div>
            <form onSubmit={handleSubmit} className="search-group-form">
                <div className="form-group">
                    <label htmlFor="groupName" className="form-label">
                        Group Name
                    </label>
                    <input
                        id="groupName"
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="groupDescription" className="form-label">
                        Group Description
                    </label>
                    <textarea
                        id="groupDescription"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="groupTag" className="form-label">
                        Group Tag
                    </label>
                    <select
                        id="groupTag"
                        value={groupTag}
                        onChange={(e) => setGroupTag(e.target.value)}
                        className="form-select"
                    >
                        <option value="Sports">Sports</option>
                        <option value="Music">Music</option>
                        <option value="Technology">Technology</option>
                        <option value="Art">Art</option>
                    </select>
                </div>

                <div className="form-group">
                    <h2 className="form-label">Add Members</h2>
                    <MemberSearch onAddMember={handleAddMember} />
                    <ul className="added-members-list">
                        {members.map((member) => (
                            <li key={member.name} className="added-member-item">
                                {member.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMember(member.name)}
                                    className="remove-member-button"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-actions">
                    <button type="submit" className="form-submit-button">
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="form-delete-button"
                        onClick={handleDelete}
                    >
                        Delete Group
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;