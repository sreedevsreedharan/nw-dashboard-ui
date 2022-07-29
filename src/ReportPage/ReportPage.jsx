import React, { useEffect, useState } from "react";
import './ReportPage.scss';
import { monthList, reportButton, tableHeader } from "../common/constants/constants";
import DashboardRestService from "../common/rest/DashboardRestService";

const ReportPage = () => {
    const [reportData, setReportData] = useState({});
    const [currentMonth,setCurrentMonth] = useState();
    const [nextMonth, setNextMonth] = useState();
    const restService = new DashboardRestService();

    useEffect(()=>{
        const date = new Date();
        setCurrentMonth(monthList[date.getMonth()]);
        setNextMonth(monthList[date.getMonth()+1])
    },[])

    const fetchReport = () => {
        restService.getReport()
        .then(res=>{
            console.log(res.data)
            setReportData(res.data.projects);
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

   
    return (
        <div className="row p-3">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn bg-blue" onClick={fetchReport}>{reportButton}</button>
                    </div>
                </div>
                <div className="row mt-5">
                    {reportData && reportData.length > 0 &&
                        <div>
                            <table className="report-table">
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
                                                                <td className="ps-3 pe-3 text-center">{null!= user.leaves?getLeaves(user.leaves.currentMonth):""}</td>
                                                                <td className="ps-3 pe-3 text-center">{null!= user.leaves?getLeaves(user.leaves.nextMonth):""}</td>
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