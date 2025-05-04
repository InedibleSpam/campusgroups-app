import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import ListGroups from "../components/ListGroups";
import SearchGroups from "../components/SearchGroups";
export default function HomePage() {

    const navigate = useNavigate();
    const data = { fname: "John", lname: "Thomas" }

    return (

        <>

            <GroupNavbar />

            <h1> This is the My Group page </h1>
            <SearchGroups />
        </>
    )
}