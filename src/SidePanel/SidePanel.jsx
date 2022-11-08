import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addUsers, defaulterMail, editUsers, home, trackVacation, viewReport } from "../common/constants/constants";
import './SidePanel.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const SidePanel = () => {

    const defaultersFeature = process.env.REACT_APP_DEFAULTERS_MAIL_TOGGLE;
    const addUserFeature = process.env.REACT_APP_ADD_USER_TOGGLE;

    const navigate = useNavigate();

    const getCurrentLocation = () => {
        const location = window.location.pathname;
        switch (location) {
            case "/":
            case "/login":
                return "Home";
            case "/trackVacation":
                return "Track";
            case "/viewReport":
                return "View";
            case "/defaulterMail":
                return "Defaulter";
            case "/addUsers":
                return "AddUser";
            default:
                break;
        }
    };

    


    const [active, setActive] = useState(getCurrentLocation());


    const getClassName = (link) => {
        if (active === link) {
            return "text-light active-link";
        } else {
            return "text-light";
        }
    }

    return (
        <div>
            {window.location.pathname != '/login' && <div className="row">
                <div className="col-md-12 side-panel-parent pt-3 ps-4">
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <Link onClick={() => setActive('Home')} className={getClassName('Home')} to="/">{home}</Link>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <Link onClick={() => setActive('Track')} className={getClassName('Track')} to="/trackVacation">{trackVacation}</Link>

                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <Link onClick={() => setActive('View')} className={getClassName('View')} to="/viewReport">{viewReport}</Link>
                        </div>
                    </div>
                    {defaultersFeature === "true" && <div className="row mt-3">
                        <div className="col-md-12">
                            <Link onClick={() => setActive('Defaulter')} className={getClassName('Defaulter')} to="/defaulterMail">{defaulterMail}</Link>
                        </div>
                    </div>}
                    {addUserFeature === "true" && <div className="row mt-3">
                        <div className="col-md-12">
                            <Link onClick={() => setActive('AddUser')} className={getClassName('AddUser')} to="/addUsers">{addUsers}</Link>
                        </div>
                    </div>}
                    {/*
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/editUsers">{editUsers}</Link>
                    </div>
                </div> */}
                </div>

            </div>}
        </div>
    )
}
export default SidePanel;