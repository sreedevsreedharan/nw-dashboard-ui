import React from "react";

const SidePanel = ({toggleScreen}) => {
    return(
        <div className="row mt-3 ml-3">
            <div className="col-md-12">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#"  className="text-light"onClick={toggleScreen}>Home</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#"  className="text-light" onClick={toggleScreen}>Track Vacation</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#" className="text-light">View Report</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#" className="text-light">Add User</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#" className="text-light">Add Public Holiday</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <a href="#" className="text-light">View Public Holidays</a>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SidePanel;