import React, { useState } from "react";
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import DashboardRestService from "../common/rest/DashboardRestService";
import { useEffect } from "react";
import { Modal } from "bootstrap";

const LoginPage = () => {
    const [credentials, setCredentials] = useState();
    const navigate = useNavigate();
    const restService = new DashboardRestService();
    const [showSpinner, setShowSpinner] = useState(false);

    const submit = () => {
        setShowSpinner(true);
        restService.userLogin(credentials.userName, credentials.password)
            .then((response) => {
                setShowSpinner(false);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('role', response.data.userRole);
                navigate("/home");
            })
            .catch(() => {
                setShowSpinner(false);
                let myModal = new Modal(document.getElementById('messageModal'));
                myModal.show();
            })
    }
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            navigate("/home");
        }
    }, [])

    const pressSubmit = (e) =>{
        if(e.key==='Enter'){
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
                                Login
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
                                    <input type="password" onKeyDown={pressSubmit}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        placeholder="Password" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4 title">
                                    <button className="btn btn-success" onClick={submit}>
                                        {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        {!showSpinner && <span>Submit</span>}
                                    </button>
                                </div>
                            </div>
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
                                            <i class="fa-2xl text-danger fa-solid fa-circle-exclamation"></i>
                                        </div>
                                        <div className="col-md-9">
                                            Invalid credentials. Please check the username or password you have entered
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
                                            <button type="button" class="btn btn-secondary ps-5 pe-5" data-bs-dismiss="modal">OK</button>
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
export default LoginPage;