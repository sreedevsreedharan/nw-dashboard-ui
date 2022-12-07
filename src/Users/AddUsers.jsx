/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { baseLocation, cancel, error, locationList, name, ok, project, selectEmployee, selectProject, submit, success, userAdded, userNotAdded, valdiationError } from "../common/constants/constants";
import DashboardRestService from "../common/rest/DashboardRestService";
import './AddUsers.scss';
import { useNavigate } from 'react-router-dom';
import { Modal } from "bootstrap";
import { useSelector } from "react-redux";
import Select from 'react-select';
const AddUsers = ({ editUser }) => {
    let currentState = useSelector((state) => state.users);
    const restService = new DashboardRestService();
    const [projects, setProjects] = useState([]);
    const [userName, setUserName] = useState('');
    const [userProjectName, setUserProjectName] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [errorFields, setErrorFields] = useState([]);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [dropDownUsers, setDropdownUsers] = useState([]);
    const navigate = useNavigate();

    const messageModalClick = () => {
        navigate("/");
    }

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate("/");
        }
    }, []);



    const validateEntries = () => {
        let isValidated = true;
        let errorField = [];
        if (userName === '') {
            isValidated = false;
            errorField.push(name);
        }
        if (userProjectName === '') {
            isValidated = false;
            errorField.push(project);
        }
        if (userLocation === '') {
            isValidated = false;
            errorField.push(baseLocation);
        }
        setErrorFields(errorField);
        return isValidated;
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
                value: user.userName
            })
        })
        setDropdownUsers(userList);


    }, []);

    const addUser = () => {
        setShowSpinner(true);
        const isValidated = validateEntries();
        if (isValidated) {
            const user = [{
                "userGPN": "",
                "userName": userName,
                "userProjectName": userProjectName,
                "userEmail": "",
                "userActive": true,
                "userLocation": userLocation
            }];

            restService.saveUser(user)
                .then(res => {
                    setModalHeader(success);
                    setModalBody(userAdded);
                    let myModal = new Modal(document.getElementById('messageModal'));
                    myModal.show();
                    setShowSpinner(false);
                })
                .catch(er => {
                    setModalHeader(error);
                    setModalBody(userNotAdded);
                    let myModal = new Modal(document.getElementById('messageModal'));
                    myModal.show();
                    setShowSpinner(false);
                })
            clearForm();
        }

    }

    const clearForm = () => {
        setUserLocation('');
        setUserName('');
        setUserProjectName('');
    }

    useEffect(() => {
        restService.getProjects()
            .then(res => {
                if (null != res.data) {
                    setProjects(res.data);
                }
            })
    }, [])

    const userChanged = (e) => {
        setCurrentUser(e);
        currentState.users.forEach(user => {
            if (user.userName === e.value) {
                setUserLocation(user.userLocation);
                setUserName(user.userName);
                setUserProjectName(user.userProjectName);
                setShowForm(true);
            }
        });

    }

    const removeUser = () => {
        let myModal = new Modal(document.getElementById('deleteModal'));
        myModal.show();
    }

    const removeUserConfirm = () => {
        const request = [];
        currentState.users.forEach(user => {
            if (user.userName === currentUser.value) {
                request.push(user);
            }
        });

        restService.removeUser(request)
            .then((response) => {
                if(response.status ===200){
                    navigate("/home");
                }
            })
            .catch(() => {
                setModalHeader("Error");
                setModalBody("Unable to delete the user. Please try after sometime");
                let myModal = new Modal(document.getElementById('messageModal'));
                myModal.show();
            })

        //on success redirect to home

        // on error populate error message
        console.log('request', request);

    }
    return (
        <div>
            {(editUser) && <div className="mt-5 ms-3 col-md-4">
                <Select placeholder={selectEmployee} options={dropDownUsers}
                    onChange={(e) => userChanged(e)}
                    value={currentUser} />
            </div>}
            {(editUser && showForm) && <div className="mt-5 ms-3 col-md-4">
                <button className="btn btn-danger" onClick={removeUser}>Remove User</button>
            </div>}
            {(!editUser || showForm) && <div>
                {errorFields.length > 0 &&
                    <div className="row">
                        <div className="col-md-6 mt-5 ms-3 bg-danger text-light border-dark">
                            {valdiationError}{errorFields.map(field => {
                                return (`${field},`)
                            })}
                        </div>
                    </div>}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="row ms-2 mt-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        {name}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2 mt-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        {[project]}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <select onChange={(e) => setUserProjectName(e.target.value)} value={userProjectName} className="form-control fc-dropdown">
                                            <option value="">{selectProject}</option>
                                            {projects && projects.length > 0 &&
                                                projects.map(project => {
                                                    return (
                                                        <option value={project.projectName}>{project.projectName}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2 mt-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        {baseLocation}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <select onChange={(e) => setUserLocation(e.target.value)} value={userLocation} className="form-control fc-dropdown">
                                            {locationList && locationList.length > 0 &&
                                                locationList.map(location => {
                                                    return (
                                                        <option value={location}>{location}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-2 mt-3">
                            <div className="col-md-1">
                                <button className="btn-success btn" onClick={addUser}>
                                    {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                    {!showSpinner && <span>{submit}</span>}
                                </button>
                            </div>
                            <div className="col-md-1">
                                <button className="btn-secondary btn" onClick={() => clearForm()}>{cancel}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class={modalHeader === error ? 'modal-header modal-error' : 'modal-header modal-success'}>
                                <h5 class="modal-title" id="exampleModalLabel">{modalHeader}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-5">
                                {modalBody}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary ps-5 pe-5" onClick={messageModalClick} data-bs-dismiss="modal">{ok}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body p-5">
                                Are you sure you want to delete {currentUser? currentUser.value:""} ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger ps-5 pe-5" onClick={removeUserConfirm} data-bs-dismiss="modal">Yes</button>
                                <button type="button" class="btn btn-primary ps-5 pe-5" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default AddUsers;