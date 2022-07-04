import React from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import './TrackVacation.scss';

const TrackVacation = () => {
    return (
        <div className="row mt-4">
            <div className="col-md-12">
                <div className="row mt-3 mb-3 ml-3">
                    <div className="col-md-12">
                        <select className="drop-down mb-3">
                            <option selected>--Employee Name--</option>
                            <option value="Shivam">Shivam Kale</option>
                            <option value="Soumen">Soumen Barik</option>
                            <option value="Sreedev">Sreedev Sreedharan</option>
                        </select>
                    </div>
                </div>
                <div className="row ml-3">
                    Confirm your vacations:
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
                        <button className="btn bg-blue">Submit</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TrackVacation;