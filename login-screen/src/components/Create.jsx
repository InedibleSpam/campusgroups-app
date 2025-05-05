import MemberSearch from "./MemberSearch";
import React, { useState } from "react";

function Create() {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groupTag, setGroupTag] = useState("");
    const [members, setMembers] = useState([]);
    const [createdGroups, setCreatedGroups] = useState([]); // State to store created groups for display

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
    }

    return <>
        <h1>Create a new group!</h1>
        <form onSubmit={handleSubmit}>
            <h2>Group Name</h2>
            <input
                type="name"
                placeholder="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)} />
            <br></br>
            <h2>Group description</h2>
            <textarea
                placeholder="description"
                rows='4'
                cols='50'
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)} />
            <br></br>
            <h2>Group Tags</h2>
            <label>
                <input
                    type="radio"
                    name="groupTag"
                    value="Sports"
                    checked={groupTag === "Sports"}
                    onChange={(e) => setGroupTag(e.target.value)} />
                Sports
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    name="groupTag"
                    value="Music"
                    checked={groupTag === "Music"}
                    onChange={(e) => setGroupTag(e.target.value)} />
                Music
            </label>
            <br />
            <label>
                <input type="radio"
                    name="groupTag"
                    value="Technology"
                    checked={groupTag === "Technology"}
                    onChange={(e) => setGroupTag(e.target.value)} />
                Technology
            </label>
            <br />
            <label>
                <input type="radio"
                    name="groupTag"
                    value="Art"
                    checked={groupTag === "Art"}
                    onChange={(e) => setGroupTag(e.target.value)} />
                Art
            </label>
            <h2>Add Members</h2>
            <MemberSearch />
            <br></br>
            <button type="submit"> Create Group! </button>
        </form>
    </>
}

export default Create;