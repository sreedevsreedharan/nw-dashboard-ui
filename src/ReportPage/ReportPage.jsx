import React, { useState } from "react";
import report from './tempReport.json';
import './ReportPage.scss';

const ReportPage = () => {
    const [reportData, setReportData] = useState({});

    const fetchReport = () => {
        //API call
        setReportData(report.projects);
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
    return (
        <div className="row p-3">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn bg-blue" onClick={fetchReport}>Fetch Tabular Report</button>
                    </div>
                </div>
                <div className="row mt-5">
                    {reportData && reportData.length > 0 &&
                        <div>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <td className="text-center bg-orange" colSpan={3}>Tentative planned leave</td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="text-center bg-yellow">July</th>
                                        <th className="text-center bg-yellow">August</th>
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
                                                                <td className="ps-3 pe-3 text-center">{getLeaves(user.leaves.month1)}</td>
                                                                <td className="ps-3 pe-3 text-center">{getLeaves(user.leaves.month2)}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default ReportPage;