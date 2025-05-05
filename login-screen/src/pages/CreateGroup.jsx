import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import Create from "../components/Create";
export default function CreateGroup() {

    const navigate = useNavigate();
    const data = { fname: "John", lname: "Thomas" }

    return (

        <>

            <h1> This is the Create Group Page </h1>
            <Create />
        </>
    )
}