import React, { useState } from "react";
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState();
    const navigate = useNavigate();

    const submit = () =>{
        if(credentials.userName === 'su' && credentials.password=== 'gw'){
            navigate("/");
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
                                        onChange={(e) => setCredentials({...credentials, userName: e.target.value })}
                                        placeholder="Username" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4">
                                    <input type="password"
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value })}
                                        placeholder="Password" className="form-control text-box"></input>
                                </div>
                                <div className="row mt-4 title">
                                    <button className="btn btn-success" onClick={submit}>Submit</button>
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