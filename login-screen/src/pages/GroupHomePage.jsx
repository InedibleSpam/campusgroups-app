import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import ListGroups from "../components/ListGroups";
export default function GroupHomePage() {

    const navigate = useNavigate();
    const data = { fname: "John", lname: "Thomas" }

    return (

        <>

            <GroupNavbar />

            <h1> This is the Homepage </h1>
            <ListGroups />
        </>
    )
}