import React from "react";
import { Link } from "react-router-dom";

const SidePanel = () => {
    return (
        <div className="row mt-3 ml-3">
            <div className="col-md-12">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/">Home</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/trackVacation">Track Vacation</Link>

                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <Link className="text-light" to="/">View report</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                    <Link className="text-light" to="/">Add User</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                    <Link className="text-light" to="/">Add Public Holiday</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                    <Link className="text-light" to="/">View Public Holidays</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SidePanel;