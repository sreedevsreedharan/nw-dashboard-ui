import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addUsers, defaulterMail, editUsers, home, trackVacation, viewReport } from "../common/constants/constants";
import './SidePanel.scss';

const SidePanel = ({ defaultersFeature }) => {

    const getCurrentLocation = () => {
        const location = window.location.pathname;
        switch (location) {
            case "/":
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
    }

    const [active, setActive] = useState(getCurrentLocation());
    const getClassName = (link) => {
        if (active === link) {
            return "text-light active-link";
        } else {
            return "text-light";
        }
    }

    return (
        <div className="row mt-3 ms-3">
            <div className="col-md-12">
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
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link onClick={() => setActive('AddUser')} className={getClassName('AddUser')} to="/addUsers">{addUsers}</Link>
                    </div>
                </div>
                {/*
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/editUsers">{editUsers}</Link>
                    </div>
                </div> */}
            </div>

        </div>
    )
}
export default SidePanel;