import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { error, ok, success } from '../common/constants/constants';
import DashboardRestService from '../common/rest/DashboardRestService';

const AddProject = () => {

    let currentState = useSelector((state) => state.users);
    const restService = new DashboardRestService();

    const [projectName, setProjectName] = useState();
    const [dropDownUsers, setDropdownUsers] = useState([]);
    const [dropDownLines, setDropdownLines] = useState([]);
    const [line, setLine] = useState(null);
    const [lead, setLead] = useState(null);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const navigate = useNavigate();

    const userChanged = (e) => {
        setLead(e);
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
        setDropdownLines([
            {
                label: "T&M",
                value: "T&M"
            },
            {
                label: "Pricing",
                value: "Pricing"
            },
            {
                label: "QA",
                value: "QA"
            }
        ])

    }, []);

    const submitProject = () => {
        restService.addProject([
            {
                "projectName": projectName,
                "leadName": line?line.value:null,
                "line": lead?lead.value:null
            }
        ]
        ).then(() => {
            setModalHeader(success);
            setModalBody("Project Added");
            let myModal = new Modal(document.getElementById('messageModal'));
            myModal.show();
        }).catch(() => {
            setModalHeader(error);
            setModalBody("An error occured. Please try after sometime");
            let myModal = new Modal(document.getElementById('messageModal'));
            myModal.show();
        })
    }

    const messageModalClick = () => {
        navigate("/");
    }
    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="row ms-2 mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    Project Name*
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ms-2 mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    Lead name
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Select placeholder="Select a lead" options={dropDownUsers}
                                        onChange={(e) => userChanged(e)}
                                        value={lead} />
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="row ms-2 mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2">
                                    Line
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Select placeholder="Select a line" options={dropDownLines}
                                        onChange={(e) => setLine(e)}
                                        value={line} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <button className='btn btn-success' onClick={submitProject}>Save</button>
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
export default AddProject;