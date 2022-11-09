import React from "react";
import './NavBar.scss';
import icon from '../images/logo-color.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img className="icon" src={icon} />
                {window.location.pathname != '/login' &&
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>                       
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Vacation
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                            
                                <li><Link class="dropdown-item" to="/trackVacation">Track Vacation</Link></li>
                                <li><Link class="dropdown-item" to="/viewReport">View Report</Link></li>                                
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Users
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                            
                                <li><Link class="dropdown-item" to="/addUsers">Add User</Link></li>
                                <li><Link class="dropdown-item" to="/editUsers">Edit Users</Link></li>                                
                            </ul>
                        </li>
                    </ul>
                </div>}
            </div>
        </nav>
    )
}
export default NavBar;