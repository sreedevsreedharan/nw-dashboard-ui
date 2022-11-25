import React, { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useSelector } from "react-redux";
import { cancel, confirm, confirmLeaveHeader, confirmLeaveTableHeaders, confirmVacations, connectionErrorMessage, currentMonthVacationMessage, error, items, noDataErrorMessage, noVacationDatesMessage, of, ok, saveErrorMessage, selectEmployee, showing, showNext, showPrevious, submit, success, vacationSuccessMessage } from "../common/constants/constants";
import './TrackVacation.scss';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import DashboardRestService from "../common/rest/DashboardRestService";
import { useEffect } from "react";
import Select from 'react-select';

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
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [isNavigate, setNavigate] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [dropDownUsers, setDropdownUsers] = useState([]);
    const datePickerRef = useRef();

    const messageModalClick = () => {
        if (isNavigate) {
            navigate("/");
            isNavigate(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate("/");
        }
    }, []);

    /**
     * Dropdown changed add it to value
     * @param {} e 
     */
    const userChanged = (e) => {
        setShowSpinner(true);
        setVacationValues([]);
        let tempVacations = [];
        let vacationDates = [];
        restService.getVacations(e.value)
            .then(res => {
                if (res.data.vacations) {
                    vacationDates = res.data.vacations;
                }
                if (vacationDates.length > 0) {
                    vacationDates.forEach(date => {
                        let timestamp = Date.parse(date.vacationDate);
                        let dateObject = new Date(timestamp);
                        tempVacations.push(dateObject);
                        setVacationValues(tempVacations);
                    });
                }
                setShowSpinner(false);
            })
            .catch(e => {
                let myModal = new Modal(document.getElementById('messageModal'));
                myModal.show();
                setModalHeader(error);
                setModalBody(connectionErrorMessage);
                setNavigate(true);
                setShowSpinner(false);
            });
        setCurrentUser(e);
    }

    /**
     * Save call to API with all vacation values
     */
    const setNewVacationDateObjects = () => {
        let saveObject = {
            userGPN: currentUser.value,
            vacations: []
        }
        if (vacationValues.length > 0 && vacationValues[0] instanceof Date) {
            let myModal = new Modal(document.getElementById('messageModal'));
            myModal.show();
            setModalHeader(error);
            setModalBody(noDataErrorMessage);
        } else if (vacationValues.length === 0) {
            let myModal = new Modal(document.getElementById('messageModal'));
            myModal.show();
            setModalHeader(error);
            setModalBody(noVacationDatesMessage);
        } else {
            let myModal = new Modal(document.getElementById('leaveType'));
            myModal.show();
            vacationValues.forEach(vacation => {
                const currentDate = `${vacation.year}-${vacation.month.number > 9 ? vacation.month.number : `0${vacation.month.number}`}-${vacation.day > 9 ? vacation.day : `0${vacation.day}`}`;
                let newDate = {};
                if (dateAlreadyPresent(currentDate)) {
                    newDate = {
                        vacationDate: currentDate,
                        vacationPlanned: vacationValues[getAlreadyDatePresentIndex(currentDate)].vacationPlanned,
                        vacationFullDay: vacationValues[getAlreadyDatePresentIndex(currentDate)].vacationFullDay,
                        // publicHoliday: vacationValues[getAlreadyDatePresentIndex(currentDate)].publicHoliday
                    }
                } else {
                    newDate = {
                        vacationDate: currentDate,
                        vacationPlanned: true,
                        vacationFullDay: true,
                        // publicHoliday: false
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

    // const updatePH = (checked, vacationDate) => {
    //     let tempFinalSaveObject = finalSaveObject;
    //     tempFinalSaveObject.vacations.forEach(element => {
    //         if (element.date === vacationDate) {
    //             element.publicHoliday = checked;
    //         }
    //     });
    //     setFinalSaveObject(tempFinalSaveObject);
    // }

    const isCurrentMonthsChangesPresent = () => {
        let monthArray = [];
        if (finalSaveObject && finalSaveObject.vacations.length > 0) {
            finalSaveObject.vacations.forEach(vacation => {
                let ts = Date.parse(vacation.vacationDate);
                let date = new Date(ts);
                console.log(date);
                monthArray.push(date.getMonth() + 1);
            });
        }
        const currentMonth = ((new Date()).getMonth()) + 1;
        if (monthArray.includes(currentMonth)) {
            return true;
        } else {
            return false;
        }

    }

    const saveVacation = () => {
        if (isCurrentMonthsChangesPresent()) {
            setShowSpinner(true);
            restService.saveVacations(finalSaveObject)
                .then(res => {
                    let myModal = new Modal(document.getElementById('messageModal'));
                    setModalHeader(success);
                    setModalBody(vacationSuccessMessage);
                    setNavigate(true);
                    myModal.show();
                    setShowSpinner(false);
                    // document.querySelectorAll('.modal-backdrop')[0].classList.remove("modal-backdrop");
                })
                .catch(e => {
                    let myModal = new Modal(document.getElementById('messageModal'));
                    myModal.show();
                    setModalHeader(error);
                    setModalBody(saveErrorMessage);
                    setShowSpinner(false);
                    setNavigate(true);
                })
        } else {
            let myModal = new Modal(document.getElementById('messageModal'));
            myModal.show();
            setModalHeader(error);
            setModalBody(currentMonthVacationMessage);
        }


    }

    useEffect(() => {
        let users = currentState.users;
        let userList = [];
        let sortedUsers = users.slice().sort(function (a, b) {
            var userA = a.userName.toUpperCase();
            var userB = b.userName.toUpperCase();
            return (userA < userB) ? -1 : (userA > userB) ? 1 : 0;
        });

        sortedUsers.map(user => {
            userList.push({
                label: user.userName,
                value: user.userGPN
            })
        })
        setDropdownUsers(userList);


    }, []);




    return (
        <div className="row mt-4">
            <div className="col-md-12">
                <div className="row mt-3 mb-3 ms-3">
                    <div className="col-md-4">
                        {dropDownUsers &&
                            <Select placeholder={selectEmployee} options={dropDownUsers}
                                onChange={(e) => userChanged(e)}
                                value={currentUser} />}
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
                            ref={datePickerRef}
                            shadow
                            numberOfMonths={2}
                            value={vacationValues}
                            onChange={setVacationValues}
                            plugins={[
                                <DatePanel />
                            ]}
                        >
                            <button
                                className="btn btn-success"
                                style={{ margin: "10px" }}
                                onClick={() => datePickerRef.current.closeCalendar()}
                            >
                                Confirm
                            </button>
                        </DatePicker>
                    </div>
                </div>}
                {currentUser && <div className="row mt-5 ms-3">
                    <div className="col-md-1">
                        <button
                            disabled={!currentUser}
                            className="btn bg-blue"
                            onClick={setNewVacationDateObjects}>
                            {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            {!showSpinner && <span>{submit}</span>}
                        </button>
                    </div>
                    <div className="col-md-1">
                        <button
                            disabled={!currentUser}
                            className="btn btn-secondary">
                            {cancel}
                        </button>
                    </div>
                </div>}
            </div>
            <div class="modal fade" id="leaveType" tabindex="-1" role="dialog"
                aria-labelledby="leaveType" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                {confirmLeaveHeader}</h5>
                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row ms-5">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {finalSaveObject &&
                                                finalSaveObject.vacations.length > displayLimit &&
                                                <div className="row">
                                                    <div className="col-md-3 offset-md-5">
                                                        {showing}{currentDisplayObject.length + currentRowStart}{of}{finalSaveObject.vacations.length}{items}
                                                    </div>
                                                    <div className="col-md-1">
                                                        <button disabled={currentRowStart === 0} className="btn btn-success" onClick={() => {
                                                            setCurrentRowStart(currentRowStart - displayLimit);
                                                            setCurrentRowLimit(currentRowLimit - displayLimit);
                                                            refreshTableData(finalSaveObject, currentRowStart - displayLimit,
                                                                currentRowLimit - displayLimit);
                                                        }}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <button disabled={finalSaveObject &&
                                                            currentRowLimit >= finalSaveObject.vacations.length} className="btn btn-success" onClick={() => {
                                                                setCurrentRowStart(currentRowStart + displayLimit);
                                                                setCurrentRowLimit(currentRowLimit + displayLimit);
                                                                refreshTableData(finalSaveObject, currentRowStart + displayLimit,
                                                                    currentRowLimit + displayLimit);
                                                            }}>
                                                            <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                    <table className="table mt-5">
                                        <thead>
                                            <tr>
                                                {confirmLeaveTableHeaders.map(header => {
                                                    return (
                                                        <th>{header}</th>
                                                    )
                                                })}
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
                                                                <input
                                                                    class="form-check-input"
                                                                    onChange={(e) => updatePlanned(e.target.checked, vacation.date)}
                                                                    type="checkbox"
                                                                    id="flexSwitchCheckChecked"
                                                                    defaultChecked={vacation.vacationPlanned}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check form-switch">
                                                                <input
                                                                    class="form-check-input"
                                                                    onChange={(e) => updateLeaveType(e.target.checked, vacation.date)}
                                                                    type="checkbox"
                                                                    id="flexSwitchCheckChecked"
                                                                    defaultChecked={vacation.vacationFullDay}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <div class="form-check form-switch">
                                                                <input
                                                                    class="form-check-input"
                                                                    onChange={(e) => updatePH(e.target.checked, vacation.date)}
                                                                    type="checkbox"
                                                                    id="flexSwitchCheckChecked"
                                                                    defaultChecked={vacation.publicHoliday}
                                                                />
                                                            </div>
                                                        </td> */}
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
                            <button type="button"
                                class="btn btn-secondary"
                                onClick={saveVacation}
                                data-bs-dismiss="modal">
                                {confirm}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2 mt-2">
                                            {modalHeader === error ? <i class="fa-2xl text-danger fa-solid fa-circle-exclamation"></i> :
                                                <i class="fa-2xl text-success fa-solid fa-check"></i>}
                                        </div>
                                        <div className="col-md-9">
                                            {modalBody}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-1 offset-md-8 pb-2">
                                            <button type="button" class="btn btn-secondary ps-5 pe-5" onClick={messageModalClick} data-bs-dismiss="modal">{ok}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
export default TrackVacation;