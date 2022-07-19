import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useSelector } from "react-redux";
import { cancel, confirmVacations, selectEmployee, submit } from "../common/constants/constants";
import './TrackVacation.scss';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import DashboardRestService from "../common/rest/DashboardRestService";

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
    const restService = new DashboardRestService();

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
        setVacationValues([]);
        let tempVacations = [];
        let vacationDates = [];
        restService.getVacations(e.target.value)
            .then(res => {
                if (res.data.vacations) {
                    vacationDates = res.data.vacations;
                }
                if (vacationDates.length > 0) {
                    vacationDates.forEach(date => {
                        console.log(date.vacationDate);
                        let timestamp = Date.parse(date.vacationDate);
                        console.log(timestamp);
                        let dateObject = new Date(timestamp);
                        console.log(dateObject);
                        tempVacations.push(dateObject);
                        setVacationValues(tempVacations);
                    });
                }
            });



        setCurrentUser(e.target.value);
    }

    /**
     * Save call to API with all vacation values
     */
    const setNewVacationDateObjects = () => {
        let saveObject = {
            userGPN: currentUser,
            vacations: []
        }
        if (vacationValues.length > 0 && vacationValues[0] instanceof Date) {
            let myModal = new Modal(document.getElementById('noData'));
            myModal.show();
        } else if(vacationValues.length === 0){
            let myModal = new Modal(document.getElementById('removeAll'));
            myModal.show();
        } else {
            let myModal = new Modal(document.getElementById('leaveType'));
            myModal.show();
            vacationValues.forEach(vacation => {
                console.log(vacation);
                const currentDate = `${vacation.year}-${vacation.month.number > 9 ? vacation.month.number : `0${vacation.month.number}`}-${vacation.day > 9 ? vacation.day : `0${vacation.day}`}`;
                let newDate = {};
                if (dateAlreadyPresent(currentDate)) {
                    newDate = {
                        vacationDate: currentDate,
                        vacationPlanned: vacationValues[getAlreadyDatePresentIndex(currentDate)].vacationPlanned,
                        vacationFullDay: vacationValues[getAlreadyDatePresentIndex(currentDate)].vacationFullDay,
                        publicHoliday: vacationValues[getAlreadyDatePresentIndex(currentDate)].publicHoliday
                    }
                } else {
                    newDate = {
                        vacationDate: currentDate,
                        vacationPlanned: true,
                        vacationFullDay: true,
                        publicHoliday: false
                    }
                }
                saveObject.vacations.push(newDate);
            });
            saveObject.vacations.sort((a, b) => {
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
        saveObject.vacations.forEach((leave, index) => {
            if (index >= rowStart && index < rowLimit) {
                newDisplayObject.push(leave);
            }
        });
        setCurrentDisplayObject(newDisplayObject);
    }

    const dateAlreadyPresent = (edittingDate) => {
        let alreadyExists = false;        
        vacationValues.forEach((element, index) => {
            if (element.date === edittingDate) {
                alreadyExists = true;
            }
        });
        return alreadyExists;
    }

    const getAlreadyDatePresentIndex = (edittingDate) => {
        let returnIndex = 0;
        vacationValues.forEach((element, index) => {
            if (element.date === edittingDate) {
                returnIndex = index;
            }
        });
        return returnIndex;
    }

    const updateLeaveType = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.vacations.forEach(element => {
            if (element.date === vacationDate) {
                element.vacationFullDay = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const updatePlanned = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.vacations.forEach(element => {
            if (element.date === vacationDate) {
                element.vacationPlanned = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const updatePH = (checked, vacationDate) => {
        let tempFinalSaveObject = finalSaveObject;
        tempFinalSaveObject.vacations.forEach(element => {
            if (element.date === vacationDate) {
                element.publicHoliday = checked;
            }
        });
        setFinalSaveObject(tempFinalSaveObject);
    }

    const saveVacation = () => {
        restService.saveVacations(finalSaveObject)
        .then(res=>{
            console.log(res)
            let myModal = new Modal(document.getElementById('saveSuccess'));
            myModal.show();
        })
        .catch(error=>{
            let myModal = new Modal(document.getElementById('saveFail'));
            myModal.show();
        })
        
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
                                            {finalSaveObject && finalSaveObject.vacations.length > displayLimit &&
                                                <div className="row">
                                                    <div className="col-md-3 offset-md-5">
                                                        Showing {currentDisplayObject.length + currentRowStart} of {finalSaveObject.vacations.length} items
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
                                                        <button disabled={finalSaveObject && currentRowLimit >= finalSaveObject.vacations.length} className="btn btn-success" onClick={() => {
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
                                                    < tr key={vacation.vacationDate} >
                                                        <td>{currentRowStart + index + 1}</td>
                                                        <td>{vacation.vacationDate}</td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updatePlanned(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.vacationPlanned} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updateLeaveType(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.vacationFullDay} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" onChange={(e) => updatePH(e.target.checked, vacation.date)} type="checkbox" id="flexSwitchCheckChecked" defaultChecked={vacation.publicHoliday} />
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
            <div class="modal fade" id="removeAll" tabindex="-1" role="dialog" aria-labelledby="removeAll" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Please insert some vacation dates
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="saveSuccess" tabindex="-1" role="dialog" aria-labelledby="saveSuccess" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Success</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Vacation dates saved succesfully
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=> navigate('/')}  class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="saveFail" tabindex="-1" role="dialog" aria-labelledby="saveFail" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Unable to save the vacations. Please try after sometime
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=> navigate('/')} class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
export default TrackVacation;