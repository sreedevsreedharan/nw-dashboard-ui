import React, { useState } from "react";
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import DashboardRestService from "../common/rest/DashboardRestService";
import { useEffect } from "react";
import { Modal } from "bootstrap";
import { error } from "../common/constants/constants";

const SignupPage = () => {
    const [credentials, setCredentials] = useState();
    const navigate = useNavigate();
    const restService = new DashboardRestService();
    const [modalHeader, setModalHeader] = useState();
    const [modalBody, setModalBody] = useState();
    const [showSpinner, setShowSpinner] = useState(false);

    const submit = () => {
        setShowSpinner(true);
        console.log('credentials', credentials)
        if (!credentials) {
            setShowSpinner(false);
            setModalHeader("Error");
            setModalBody("Please enter some values");
        }

        else if (!credentials.userName || credentials.userName === '') {
            setShowSpinner(false);
            setModalHeader("Error");
            setModalBody("Username cannot be empty");
        } else if (!credentials.password || credentials.password === '') {
            setShowSpinner(false);
            setModalHeader("Error");
            setModalBody("Password cannot be empty");
        } else if (!credentials.confirmPassword || credentials.confirmPassword === '') {
            setShowSpinner(false);
            setModalHeader("Error");
            setModalBody("Confirm password cannot be empty");
        } else if (credentials.password != credentials.confirmPassword) {
            setShowSpinner(false);
            setModalHeader("Error");
            setModalBody("Passwords do not match");
        } else {
            restService.signup({
                "userName": credentials.userName,
                "userPassword": credentials.password,
                "userRole": "USER"
            }).then(()=>{
                setShowSpinner(false);
                setModalHeader("Success");
                setModalBody("User Created");
            }).catch(()=>{
                setShowSpinner(false);
                setModalHeader("Error");
                setModalBody("An internal error has occured. Please try after sometime");
            })
            
        }
        let myModal = new Modal(document.getElementById('messageModal'));
        myModal.show();
    }

    const isRedirect = () => {
        if (modalHeader === "Success") {
            navigate("/");
        }
    }

    const pressSubmit = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    }

    return (
        <div className="row">
            <div className="col-md-12 center-box">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row mt-5">
                            <div className="col-md-12 text-light mt-2 title">
                                Signup
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 input-box">
                                <div className="row">
                                    <input type="text"
                                        onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
                                        placeholder="Username" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4">
                                    <input type="password"
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        placeholder="Password" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4">
                                    <input type="password" onKeyDown={pressSubmit}
                                        onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                                        placeholder="Confirm Password" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4 title">
                                    <button className="btn btn-success" onClick={submit}>
                                        {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        {!showSpinner && <span>Submit</span>}
                                    </button>
                                </div>
                                <div className="row signup text-light">
                                    New user? Signup<a href="/signup">here</a>
                                </div>
                            </div>
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
                        <div class="modal-footer">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-1 offset-md-11">
                                            <button type="button" class="btn btn-secondary ps-5 pe-5" onClick={isRedirect} data-bs-dismiss="modal">OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupPage;