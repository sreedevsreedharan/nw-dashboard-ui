import React from "react";
import './DashBoardBox.scss';

const DashBoardBox = ({count, text}) => {
    return (
        <div className="col-md-2 dashboard-box ms-5">
            <div className="row ">
                <div className="col-md-12 text-center count-span">{count}</div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    {text}
                </div>
            </div>
        </div>
    )
}
export default DashBoardBox