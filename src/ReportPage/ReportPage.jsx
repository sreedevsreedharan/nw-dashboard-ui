import React, { useEffect, useState } from "react";
import './ReportPage.scss';
import { monthList, selectEmployee, tableHeader } from "../common/constants/constants";
import DashboardRestService from "../common/rest/DashboardRestService";
import { useSelector } from "react-redux";
import PublicHolidayReport from "./PublicHolidayReport/PublicHolidayReport";
import { useNavigate } from "react-router-dom";
import ShiftReport from "./ShiftReport/ShiftReport";

const ReportPage = () => {
    const [reportData, setReportData] = useState({});
    const [publicHolidayReportData, setPublicHolidayReportData] = useState({});
    const [currentMonth, setCurrentMonth] = useState();
    const [currentReportType, setCurrentReportType] = useState('none');
    const [nextMonth, setNextMonth] = useState();
    const [allDates, setAllDates] = useState(true);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const serviceUrl = process.env.REACT_APP_SERVICE;
    let currentState = useSelector((state) => state.users);
    const restService = new DashboardRestService();
    const [dropDownUsers, setDropdownUsers] = useState([])
    const [currentUser, setCurrentUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const date = new Date();
        setCurrentMonth(monthList[date.getMonth()]);
        setNextMonth(monthList[date.getMonth() + 1])
    }, [])

    useEffect(() => {
        let users = currentState.users;
        let sortedUsers = users.slice().sort(function (a, b) {
            var userA = a.userName.toUpperCase();
            var userB = b.userName.toUpperCase();
            return (userA < userB) ? -1 : (userA > userB) ? 1 : 0;
        });
        setDropdownUsers(sortedUsers);
    }, []);

    const fetchReport = () => {
        restService.getReport()
            .then(res => {
                setReportData(res.data.projects);
                setPublicHolidayReportData(res.data);
            })
    }

    const getLeaves = (leaves) => {
        let leaveString = "";
        leaves.forEach((leave, index) => {
            let ts1 = Date.parse(leave);
            let date1 = new Date(ts1);
            if (index === leaves.length - 1) {
                leaveString = leaveString + date1.getDate();
            } else {
                leaveString = leaveString + date1.getDate() + ",";
            }
        });
        return leaveString;
    }

    const getReportType = (e) => {
        setCurrentReportType(e.target.value);
        if (e.target.value === 'mail-report') {
            fetchReport();
        }
    }

    const fetchExcelReport = () => {
        const tempFromDate = allDates ? "" : fromDate;
        const tempToDate = allDates ? "" : toDate;
        restService.fetchExcelReport(tempFromDate, tempToDate, currentUser)
            .then(res => {
                if (res.status === 200) {
                    window.location = `${serviceUrl}/dashboard/v1/download-report`;
                }

            })
    }

    const copyReport = (e) => {
        var urlField = document.getElementById('sample')
        var range = document.createRange()
        range.selectNode(urlField)
        console.log(range)
        window.getSelection().addRange(range)
        document.execCommand('copy')
    }


    return (
        <div className="row p-3">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        Select type of report:
                    </div>
                    <div className="col-md-1">
                        <select className="drop-down" onChange={getReportType}>
                            <option value="">--Select an option--</option>
                            <option value="mail-report">Email Report</option>
                            <option value="excel-report">Excel Report</option>
                        </select>
                    </div>

                </div>
                {currentReportType === 'mail-report' && reportData && reportData.length > 0 && <div className="row mt-5">
                    <div className="row mb-5">
                        <ShiftReport />
                    </div>
                    <div className="row">
                        <PublicHolidayReport reportData={publicHolidayReportData}/>
                    </div>
                    <div>
                        <table id="sample" className="report-table">
                            <thead>
                                <tr>
                                    <td className="text-center bg-orange" colSpan={3}>{tableHeader}</td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th className="text-center bg-yellow">{currentMonth}</th>
                                    <th className="text-center bg-yellow">{nextMonth}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map(project => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="text-center fw-bold bg-yellow">{project.projectName}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {project.users.map(user => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="pe-3">{user.userName}</td>
                                                            <td className="ps-3 pe-3 text-center">{null != user.leaves ? getLeaves(user.leaves.currentMonth) : ""}</td>
                                                            <td className="ps-3 pe-3 text-center">{null != user.leaves ? getLeaves(user.leaves.nextMonth) : ""}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })}

                                        </>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>}
                {currentReportType === 'excel-report' &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <input type="checkbox" onChange={() => { setFromDate(null); setToDate(null); setAllDates(!allDates) }}></input>
                                    <label>Fetch report for specific dates</label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    From date
                                </div>
                                <div className="col-md-3">
                                    <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} disabled={allDates} type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    To date
                                </div>
                                <div className="col-md-3">
                                    <input value={toDate} onChange={(e) => setToDate(e.target.value)} disabled={allDates} type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    Select user
                                </div>
                                <div className="col-md-3">
                                    <select
                                        className="drop-down mb-3"
                                        onChange={(e) => setCurrentUser(e.target.value)}
                                    >
                                        <option selected>Select user</option>
                                        {dropDownUsers.map(user => {
                                            return (
                                                <option
                                                    key={user.userGPN}
                                                    value={user.userGPN}>{user.userName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="offset-md-3  mt-5 col-md-3">
                                    <button className="btn btn-success" onClick={fetchExcelReport}>Fetch report</button>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default ReportPage;