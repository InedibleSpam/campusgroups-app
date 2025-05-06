import { Navigate } from "react-router-dom";
import MemberSearch from "./MemberSearch";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Create() {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groupTag, setGroupTag] = useState("");
    const [members, setMembers] = useState([]);
    const navigate = useNavigate(); // Hook to programmatically navigate between routes
    const [createdGroups, setCreatedGroups] = useState([]); // State to store created groups for display

    const handleAddMember = (member) => {
        if (!members.some((m) => m.id === member.id)) {
            setMembers([...members, member]);
        } else {
            alert("Member already added!");
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a group object
        const newGroup = {
            id: Date.now().toString(), // Convert ID to a string
            name: groupName,
            description: groupDescription,
            tag: groupTag,
            members: members,
        };

        // Save the group to localStorage
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        savedGroups.push(newGroup);
        localStorage.setItem("groups", JSON.stringify(savedGroups));

        setCreatedGroups(savedGroups);

        setGroupName("");
        setGroupDescription("");
        setGroupTag("");
        setMembers([]);

        console.log("Form submitted!");
        alert("Group created successfully!");
        navigate("/grouphomepage"); // Redirect to the groups page after creation
    };

    return (
        <div className="create-group-container">
            <div className="create-group-header">
                <h1>Create a New Group</h1>
            </div>
            <form onSubmit={handleSubmit} className="create-group-form">
                <div className="form-group">
                    <label htmlFor="groupName" className="form-label">
                        Group Name
                    </label>
                    <input
                        id="groupName"
                        type="text"
                        placeholder="Enter group name"
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
                        placeholder="Enter group description"
                        rows="4"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <h2 className="form-label">Group Tags</h2>
                    <div className="form-radio-group">
                        <label>
                            <input
                                type="radio"
                                name="groupTag"
                                value="Sports"
                                checked={groupTag === "Sports"}
                                onChange={(e) => setGroupTag(e.target.value)}
                            />
                            Sports
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="groupTag"
                                value="Music"
                                checked={groupTag === "Music"}
                                onChange={(e) => setGroupTag(e.target.value)}
                            />
                            Music
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="groupTag"
                                value="Technology"
                                checked={groupTag === "Technology"}
                                onChange={(e) => setGroupTag(e.target.value)}
                            />
                            Technology
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="groupTag"
                                value="Art"
                                checked={groupTag === "Art"}
                                onChange={(e) => setGroupTag(e.target.value)}
                            />
                            Art
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <h2>Add Members</h2>
                    <MemberSearch onAddMember={handleAddMember} />
                    <ul className="added-members-list">
                        {members.map((member) => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="form-actions">
                    <button type="submit" className="form-submit-button">
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;