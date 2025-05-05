import { useState } from "react";
import SearchGroups from "../components/SearchGroups";
import { useEffect } from "react";
import React from "react";
import Create from "../components/Create";
import CreateGroupButton from "../components/CreateGroupButton";

export default function GroupHomePage() {
    const [groups, setGroups] = useState([])
    useEffect(() => {
        const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        setGroups(savedGroups);
    }, []);


    return (
        <>

            <SearchGroups groups={groups} />

        </>
    );
}