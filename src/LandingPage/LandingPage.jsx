/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Home from "../Home/Home";
import SidePanel from "../SidePanel/SidePanel";
import TrackVacation from "../TrackVacation/TrackVacation";
import './LandingPage.scss';
import initialLoad from '../temp/initialLoad.json';
import { useDispatch } from "react-redux";
import { addLeaveToday, addUsers } from "../common/redux/DashBoardSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardRestService from "../common/rest/DashboardRestService";

const LandingPage = () => {

    const dispatch = useDispatch();
    const dashboardName = process.env.REACT_APP_DASHBOARD_NAME;
    const restService = new DashboardRestService();


    useEffect(() => {
        restService.getOnLoadData()
        .then(res => {
            console.log(res.data);
            if(res.data.users){
                dispatch(addUsers(res.data.users));
            }
            if(res.data.onVacationToday){
                dispatch(addLeaveToday(res.data.onVacationToday));
            }    
        })
        
        
    }, []);


    return (
        <div className="row landing-page-parent">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 text-center p-4 header">
                        {dashboardName}
                    </div>
                </div>
                <BrowserRouter>
                    <div className="row">
                        <div className="col-md-2 side-panel-parent">
                            <SidePanel />
                        </div>
                        <div className="col-md-10">

                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/trackVacation" element={<TrackVacation />} />
                            </Routes>


                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}
export default LandingPage;