import React, { useState, useEffect } from "react";

function MemberSearch({ onAddMember }) {
    const [users, setUsers] = useState([]); // List of all users
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on search

    // Load users from the API
    useEffect(() => {
        fetch("http://localhost:3000/api/users") // Fetch from the server API
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error loading users:", error));
    }, []);

    // Filter users based on the search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers([]);
        } else {
            const filtered = users.filter((user) =>
                user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    return (
        <div className="member-search-container">
            <input
                type="text"
                placeholder="Search for a member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="member-search-input"
            />
            {filteredUsers.length > 0 && (
                <ul className="member-search-dropdown">
                    {filteredUsers.map((user) => (
                        console.log(filteredUsers),
                        <li key={user.name} className="member-search-item">
                            {user.name}
                            <button
                                type="button" // Prevents form submission
                                onClick={() => onAddMember(user)}
                                className="add-member-button"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MemberSearch;