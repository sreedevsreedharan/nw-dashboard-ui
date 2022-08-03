import React from "react";
import { Link } from "react-router-dom";
import { addUsers, defaulterMail, home, trackVacation, viewReport } from "../common/constants/constants";
import './SidePanel.scss';

const SidePanel = ({ defaultersFeature }) => {
    return (
        <div className="row mt-3 ms-3">
            <div className="col-md-12">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/">{home}</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/trackVacation">{trackVacation}</Link>

                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/viewReport">{viewReport}</Link>
                    </div>
                </div>
                {defaultersFeature === "true" && <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/defaulterMail">{defaulterMail}</Link>
                    </div>
                </div>}
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/addUsers">{addUsers}</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SidePanel;