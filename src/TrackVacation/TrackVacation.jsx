import React from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useSelector } from "react-redux";
import { cancel, confirmVacations, selectEmployee, submit } from "../common/constants/constants";
import './TrackVacation.scss';

const TrackVacation = () => {
    let currentState = useSelector((state) => state.leaveToday);

    return (
        <div className="row mt-4">
            <div className="col-md-12">
                <div className="row mt-3 mb-3 ml-3">
                    <div className="col-md-12">
                        <select className="drop-down mb-3">
                            <option selected>{selectEmployee}</option>
                            {currentState.users.map(user=>{
                                return(
                                    <option value={user.GPN}>{user.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row ml-3">
                    {confirmVacations}
                </div>
                <div className="row ml-1 mt-2">
                    <div className="col-md-6">
                        <DatePicker
                            multiple
                            numberOfMonths={2}
                            plugins={[
                                <DatePanel />
                            ]}
                        />
                    </div>
                </div>
                <div className="row mt-5 ml-3">
                    <div className="col-md-1">
                        <button className="btn bg-blue">{submit}</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-secondary">{cancel}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TrackVacation;