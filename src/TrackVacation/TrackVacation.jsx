import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useSelector } from "react-redux";
import { cancel, confirmVacations, selectEmployee, submit } from "../common/constants/constants";
import './TrackVacation.scss';
import leaveData from '../temp/leave.json';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

const TrackVacation = () => {
    const displayLimit = 6;
    let currentState = useSelector((state) => state.users);
    const [vacationValues, setVacationValues] = useState();
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
    const [finalSaveObject, setFinalSaveObject] = useState();
    const [currentRowStart, setCurrentRowStart] = useState(0);
    const [currentRowLimit, setCurrentRowLimit] = useState(displayLimit);
    const [currentDisplayObject, setCurrentDisplayObject] = useState([]);

    /**
     *  API response contains all the leave details. Extracting just date from that for
     * setting to calendar
     */
    useEffect(() => {

    }, []);


    /**
     * Dropdown changed add it to value
     * @param {} e 
     */
    const userChanged = (e) => {
        let tempVacations = [];
        for (let index = 0; index < leaveData.leaves.length; index++) {
            let timestamp = Date.parse(leaveData.leaves[index].date);
            let dateObject = new Date(timestamp);
            tempVacations.push(dateObject);
        }
        setVacationValues(tempVacations);
        setCurrentUser(e.target.value);
    }

    /**
     * Save call to API with all vacation values
     */
    const setNewVacationDateObjects = () => {
        let saveObject = {
            gpn: currentUser,
            leaves: []
        }
        if (vacationValues.length > 0 && vacationValues[0] instanceof Date) {
            let myModal = new Modal(document.getElementById('noData'));
            myModal.show();
        } else {
            let myModal = new Modal(document.getElementById('leaveType'));
            myModal.show();
            vacationValues.forEach(vacation => {
                const currentDate = `${vacation.month.number > 9 ? vacation.month.number : `0${vacation.month.number}`}/${vacation.day > 9 ? vacation.day : `0${vacation.day}`}/${vacation.year}`;
                let newDate = {};
                if (dateAlreadyPresent(currentDate)) {
                    newDate = {
                        date: `${vacation.month.number}/${vacation.day}/${vacation.year}`,
                        planned: leaveData.leaves[getAlreadyDatePresentIndex(currentDate)].planned,
                        type: leaveData.leaves[getAlreadyDatePresentIndex(currentDate)].type,
                        ph: leaveData.leaves[getAlreadyDatePresentIndex(currentDate)].ph
                    }
                } else {
                    newDate = {
                        date: `${vacation.month.number}/${vacation.day}/${vacation.year}`,
                        planned: true,
                        type: true,
                        ph: false
                    }
                }
                saveObject.leaves.push(newDate);
            });
            saveObject.leaves.sort((a, b) => {
                let ts1 = Date.parse(a.date);
                let date1 = new Date(ts1);
                let ts2 = Date.parse(b.date);
                let date2 = new Date(ts2);
                return ((date1 > date2) ? -1 : ((date2 > date1) ? 1 : 0));
            });
            setFinalSaveObject(saveObject);
            refreshTableData(saveObject, currentRowStart, currentRowLimit);

        }

    }

    const refreshTableData = (saveObject, rowStart, rowLimit) => {
        let newDisplayObject = [];
        saveObject.leaves.forEach((leave, index) => {
            if (index >= rowStart && index < rowLimit) {
                newDisplayObject.push(leave);
            }
        });
        setCurrentDisplayObject(newDisplayObject);
    }

    const dateAlreadyPresent = (edittingDate) => {
        let alreadyExists = false;
        leaveData.leaves.forEach((element, index) => {
            if (element.date === edittingDate) {
                alreadyExists = true;
            }
        });
        return alreadyExists;
    }

    const getAlreadyDatePresentIndex = (edittingDate) => {
        let returnIndex = 0;
        leaveData.leaves.forEach((element, index) => {
            if (element.date === edittingDate) {
                returnIndex = index;
            }
        });
        return returnIndex;
    }

    const updateLeaveType = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.leaves.forEach(element => {
            if (element.date === vacationDate) {
                element.type = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const updatePlanned = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.leaves.forEach(element => {
            if (element.date === vacationDate) {
                element.planned = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const updatePH = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.leaves.forEach(element => {
            if (element.date === vacationDate) {
                element.ph = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const saveVacation = () => {
        //API call
        //Show save pop up and redirect to front screen
        navigate('/');
    }


    return (
        <div className="row mt-4">
            <div className="col-md-12">
                <div className="row mt-3 mb-3 ms-3">
                    <div className="col-md-12">
                        <select value={currentUser} className="drop-down mb-3" onChange={(e) => userChanged(e)}>
                            <option selected>{selectEmployee}</option>
                            {currentState.users.map(user => {
                                return (
                                    <option key={user.userGPN} value={user.userGPN}>{user.userName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                {currentUser &&
                <div className="row ms-3">
                    {confirmVacations}
                </div>}
                {currentUser && <div className="row ms-1 mt-2">
                    <div className="col-md-6">
                        <DatePicker
                            multiple
                            numberOfMonths={2}
                            value={vacationValues}
                            onChange={setVacationValues}
                            plugins={[
                                <DatePanel />
                            ]}
                        />
                    </div>
                </div>}
                {currentUser && <div className="row mt-5 ms-3">
                    <div className="col-md-1">
                        <button disabled={!currentUser} className="btn bg-blue" onClick={setNewVacationDateObjects}>{submit}</button>
                    </div>
                    <div className="col-md-1">
                        <button disabled={!currentUser} className="btn btn-secondary">{cancel}</button>
                    </div>
                </div>}
            </div>
            <div class="modal fade" id="leaveType" tabindex="-1" role="dialog" aria-labelledby="leaveType" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confirm your leave type</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row ms-5">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {finalSaveObject && finalSaveObject.leaves.length > displayLimit &&
                                                <div className="row">
                                                    <div className="col-md-3 offset-md-5">
                                                        Showing {currentDisplayObject.length + currentRowStart} of {finalSaveObject.leaves.length} items
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button disabled={currentRowStart === 0} className="btn btn-success" onClick={() => {
                                                            setCurrentRowStart(currentRowStart - displayLimit);
                                                            setCurrentRowLimit(currentRowLimit - displayLimit);
                                                            refreshTableData(finalSaveObject, currentRowStart - displayLimit,
                                                                currentRowLimit - displayLimit);
                                                        }}>Show previous</button>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button disabled={finalSaveObject && currentRowLimit >= finalSaveObject.leaves.length} className="btn btn-success" onClick={() => {
                                                            setCurrentRowStart(currentRowStart + displayLimit);
                                                            setCurrentRowLimit(currentRowLimit + displayLimit);
                                                            refreshTableData(finalSaveObject, currentRowStart + displayLimit,
                                                                currentRowLimit + displayLimit);
                                                        }}>
                                                            Show next</button>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                    <table className="table mt-5">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th>Planned leave?</th>
                                                <th>Full day?</th>
                                                <th>Public holiday</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentDisplayObject && currentDisplayObject.map((vacation, index) => {
                                                return (
                                                    < tr key={vacation.date} >
                                                        <td>{currentRowStart + index + 1}</td>
                                                        <td>{vacation.date}</td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updatePlanned(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.planned} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updateLeaveType(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.type} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updatePH(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.ph} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={saveVacation} data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="noData" tabindex="-1" role="dialog" aria-labelledby="noData" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            No data to save. Please enter some vacation dates
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
export default TrackVacation;