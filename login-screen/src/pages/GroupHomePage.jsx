import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import ListGroups from "../components/ListGroups";
import SearchGroups from "../components/SearchGroups";
export default function GroupHomePage() {

    const navigate = useNavigate();
    const data = { fname: "John", lname: "Thomas" }

    return (

        <>

            <h1> This is the Homepage </h1>
            <SearchGroups />
            <ListGroups />
            

            <div style={{ marginTop: "20px" }}>
                <Link to="/create-group">
                    <button>+ Create New Group</button>
                </Link>
            </div>
        </>
    )
}