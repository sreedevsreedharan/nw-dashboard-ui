import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import './TrackVacation.scss';
import { useSelector } from 'react-redux';
import leaveData from '../temp/leave.json';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

const TrackVacation = () => {
    let currentState = useSelector((state) => state.users);
    const [vacationValues, setVacationValues] = useState();
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
    const [finalSaveObject, setFinalSaveObject] = useState();

    /**
     *  API response contains all the leave details. Extracting just date from that for
     * setting to calendar
     */
    useEffect(() => {
        let tempVacations = [];
        for (let index = 0; index < leaveData.leaves.length; index++) {
            let timestamp = Date.parse(leaveData.leaves[index].date);
            let dateObject = new Date(timestamp);
            tempVacations.push(dateObject);
        }
        setVacationValues(tempVacations);
    }, []);


    /**
     * Dropdown changed add it to value
     * @param {} e 
     */
    const userChanged = (e) => {
        setCurrentUser(e.target.value);
    }

    /**
     * Save call to API with all vacation values
     */
    const setNewVacationDateObjects = () => {
        let myModal = new Modal(document.getElementById('leaveType'));
        myModal.show();
        let saveObject = {
            gpn: currentUser,
            leaves: []
        }
        if (vacationValues.length > 0 && vacationValues[0] instanceof Date) {
            /**
             * If vacation values have date which means no new date is inserted 
             * If any date is inserted then it will have value of date picker type 'r'
             * Need to provide an additional check to see if no data is present in current
             * month. Then show some pop-up's
             */
        } else {
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
                        type: "full",
                        ph: false
                    }
                }
                saveObject.leaves.push(newDate);
            });
            console.log('saveObject', saveObject)
            saveObject.leaves.sort((a, b) => {
                let ts1 = Date.parse(a.date);
                let date1 = new Date(ts1);
                let ts2 = Date.parse(b.date);
                let date2 = new Date(ts2);
               return ((date1 > date2) ? -1 : ((date2 > date1) ? 1 : 0));
            });
            console.log('saveObject', saveObject)
            setFinalSaveObject(saveObject);
        }

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
                if (checked) {
                    element.type = "full";
                } else {
                    element.type = "half";
                }
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const updatePlanned = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.leaves.forEach(element => {
            if (element.date === vacationDate) {
                element.planned = checked
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
                            <option selected>--Employee Name--</option>
                            {currentState.users.map(user => {
                                return (
                                    <option key={user.GPN} value={user.GPN}>{user.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row ms-3">
                    Confirm your vacations:
                </div>
                <div className="row ms-1 mt-2">
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
                </div>
                <div className="row mt-5 ms-3">
                    <div className="col-md-1">
                        <button className="btn bg-blue" onClick={setNewVacationDateObjects}>Submit</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
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
                                            {finalSaveObject && finalSaveObject.leaves.map((vacation, index) => {
                                                return (
                                                    < tr key={vacation.date} >
                                                        <td>{index + 1}</td>
                                                        <td>{vacation.date}</td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updatePlanned(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.planned} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updateLeaveType(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.type === 'full'} />
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

        </div >
    )
}
export default TrackVacation;