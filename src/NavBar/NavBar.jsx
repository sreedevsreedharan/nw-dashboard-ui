import React from "react";
import './NavBar.scss';
import icon from '../images/logo-color.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Modal } from "bootstrap";
import DashboardRestService from "../common/rest/DashboardRestService";


const NavBar = () => {
    const navigate = useNavigate();
    const restService = new DashboardRestService();

    const showModal = () => {
        let myModal = new Modal(document.getElementById('logoutModal'));
        myModal.show();
    }

    const logout = () => {
        restService.userLogout()
        .then(()=>{
            localStorage.setItem('accessToken','');
            localStorage.setItem('role',""); 
            navigate("/");            
        }).catch((error)=>{
            localStorage.setItem('accessToken','');
            localStorage.setItem('role',""); 
            navigate("/");            
        })
    }

    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img className="icon" src={icon} />
                {window.location.pathname != '/' &&
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Vacation
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to="/trackVacation">Track Vacation</Link></li>
                                    {localStorage.getItem('role')==="ADMIN" && <li><Link class="dropdown-item" to="/viewReport">View Report</Link></li>}
                                </ul>
                            </li>
                            {localStorage.getItem('role')==="ADMIN" && <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Users
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to="/addUsers">Add User</Link></li>
                                    <li><Link class="dropdown-item" to="/editUsers">Edit Users</Link></li>
                                </ul>
                            </li>}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" onClick={showModal}>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>}
            </div>
            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        {/* <div class='modal-header modal-error'>
                            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div class="modal-body text-dark">
                            Are you sure you want to logout?
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={logout} class="btn btn-success" data-bs-dismiss="modal">Yes</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;