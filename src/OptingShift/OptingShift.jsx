import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import './OptingShift.scss';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import DashboardRestService from "../common/rest/DashboardRestService";
import { useEffect } from "react";
import Select from 'react-select';
import { error, ok, selectProjectName, submit } from "../common/constants/constants";

const OptingShift = () => {
    const displayLimit = 6;
    let currentState = useSelector((state) => state.users);
    const [vacationValues, setVacationValues] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [currentProject, setCurrentProject] = useState();
    const navigate = useNavigate();
    // const restService = new DashboardRestService();
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [isNavigate, setNavigate] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [dropDownUsers, setDropdownUsers] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [currentProjectUsers, setCurrentProjectUsers] = useState([]);

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
    const projectChanged = (e) => {
        let users = currentState.users;
        let tempCurrentProjectUsers = [];
        users.map(user => {
            if (user.userProjectName === e.value) {
                tempCurrentProjectUsers.push(user);
            }
        });
        console.log('currentProjectUsers', tempCurrentProjectUsers);
        setCurrentProjectUsers(tempCurrentProjectUsers);
        setCurrentProject(e);
    }

    useEffect(() => {
        let users = currentState.users;
        let projects = [];
        users.map(user => {
            if (!projects.includes(user.userProjectName)) {
                projects.push(user.userProjectName);
            }
        });
        let sortedProject = projects.slice().sort(function (a, b) {
            var userA = a.toUpperCase();
            var userB = b.toUpperCase();
            return (userA < userB) ? -1 : (userA > userB) ? 1 : 0;
        });
        let tempProjectList = [];
        sortedProject.map(p => {
            tempProjectList.push({
                label: p,
                value: p
            })
        })
        setProjectList(tempProjectList);


    }, []);




    return (
        <div className="row mt-4 ms-3">
            <div className="col-md-12">
                <div className="row mt-3 mb-3 ">
                    <div className="col-md-4">
                        {dropDownUsers &&
                            <Select placeholder={selectProjectName} options={projectList}
                                onChange={(e) => projectChanged(e)}
                                value={currentProject} />}
                    </div>
                </div>
                {currentProjectUsers.length > 0 && <div className="row ms-3 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <div className="col-md-4 border-black"><b>Name</b></div>
                                <div className="col-md-2 border-black"><b>Shift Opting</b></div>
                            </div>


                            {currentProjectUsers.length > 0 && currentProjectUsers.map(user => {
                                return (
                                    <div className="row mb-2  ">
                                        <div className="col-md-4 border-black">{user.userName}</div>
                                        <div className="col-md-2 border-black">
                                            <div class="form-check form-switch">
                                                <input
                                                    class="form-check-input"
                                                    // onChange={(e) => updateLeaveType(e.target.checked, vacation.date)}
                                                    type="checkbox"
                                                    id="flexSwitchCheckChecked"
                                                    defaultChecked={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>}
                {currentProjectUsers.length > 0 && <div className="ms-5 mt-3">
                    <button
                        className="btn bg-blue">
                        {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {!showSpinner && <span>{submit}</span>}
                    </button>
                </div>}
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
export default OptingShift;