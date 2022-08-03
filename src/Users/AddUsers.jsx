import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { locationList } from "../common/constants/constants";
import DashboardRestService from "../common/rest/DashboardRestService";
import './AddUsers.scss';

const AddUsers = () => {
    const restService = new DashboardRestService();
    const [projects, setProjects] = useState([]);
    const [userGPN, setUserGPN] = useState('');
    const [userName, setUserName] = useState('');
    const [userProjectName, setUserProjectName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userLocation, setUserLocation] = useState('');

    const addUser = () => {
        const user = {
            "userGPN": userGPN,
            "userName": userName,
            "userProjectName": userProjectName,
            "userEmail": userEmail,
            "userActive": true,
            "userLocation": userLocation
        }
        console.log(user);
        
        restService.saveUser(user)
            .then(res => {
                console.log("Success");

            })
            .catch(er => {
                console.log("Error");
            })
        clearForm();
    }

    const clearForm = () =>{
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
                    console.log(res.data);
                    setProjects(res.data);
                }
            })
    }, [])
    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="row ms-2 mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    Name
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
                                    GPN
                                </div>
                            </div>
                            <div className="row">
                            {console.log('userGPN',userGPN)}
                                <div className="col-md-6">
                                    <input  onChange={(e) => setUserGPN(e.target.value)} value={userGPN}  type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ms-2 mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    Project
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <select onChange={(e) => setUserProjectName(e.target.value)} value={userProjectName} className="form-control fc-dropdown">
                                        <option value="">Select a Project</option>
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
                                    EY Email Id
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
                                    Base location
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
                            <button className="btn-success btn" onClick={addUser}>Submit</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn-secondary btn" onClick={()=>clearForm()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddUsers;