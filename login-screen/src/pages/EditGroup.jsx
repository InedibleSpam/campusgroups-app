import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import { useLocation } from "react-router-dom";
import ListGroups from "../components/ListGroups";
import SearchGroups from "../components/SearchGroups";
import Edit from "../components/Edit";

export default function EditGroup() {
    const location = useLocation();
    const group = location.state?.group;

if(!group){
    return<p>No Gorup data available to edit.</p>
}

    return (

        <>

            
           <Edit group={group} />

        </>
    )
}