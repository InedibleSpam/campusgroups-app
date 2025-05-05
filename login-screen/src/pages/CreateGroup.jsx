import { Link, useNavigate } from "react-router-dom";
import GroupNavbar from "../components/groupnavbar";
import Create from "../components/Create";
export default function CreateGroup() {

    const navigate = useNavigate();

    return (

        <>

            <Create />
        </>
    )
}