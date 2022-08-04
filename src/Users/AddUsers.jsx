import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { baseLocation, cancel, error, eyMailId, gpn, locationList, name, ok, project, selectProject, submit, success, userAdded, userNotAdded, valdiationError } from "../common/constants/constants";
import DashboardRestService from "../common/rest/DashboardRestService";
import './AddUsers.scss';
import { useNavigate } from 'react-router-dom';
import { Modal } from "bootstrap";

const AddUsers = () => {
    const restService = new DashboardRestService();
    const [projects, setProjects] = useState([]);
    const [userGPN, setUserGPN] = useState('');
    const [userName, setUserName] = useState('');
    const [userProjectName, setUserProjectName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [errorFields, setErrorFields] = useState([]);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const navigate = useNavigate();

    const messageModalClick = () => {
        navigate("/");
    }


    const validateEntries = () => {
        let isValidated = true;
        let errorField = [];
        if (userGPN === '') {
            isValidated = false;
            errorField.push(gpn);
        }
        if (userName === '') {
            isValidated = false;
            errorField.push(name);
        }
        if (userProjectName === '') {
            isValidated = false;
            errorField.push(project);
        }
        if (userEmail === '') {
            isValidated = false;
            errorField.push(eyMailId);
        }
        if (userLocation == '') {
            isValidated = false;
            errorField.push(baseLocation);
        }
        setErrorFields(errorField);
        return isValidated;
    }

    const addUser = () => {
        setShowSpinner(true);
        const isValidated = validateEntries();
        if (isValidated) {
            const user = {
                "userGPN": userGPN,
                "userName": userName,
                "userProjectName": userProjectName,
                "userEmail": userEmail,
                "userActive": true,
                "userLocation": userLocation
            }

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
        setUserEmail('');
        setUserGPN('');
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
    return (
        <div>
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
                                    {gpn}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input onChange={(e) => setUserGPN(e.target.value)} value={userGPN} type="text" className="form-control"></input>
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
                                    {eyMailId}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} type="text" className="form-control"></input>
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
        </div>
    )
}
export default AddUsers;