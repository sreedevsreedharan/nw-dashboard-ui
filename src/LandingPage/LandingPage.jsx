/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Home from "../Home/Home";
import SidePanel from "../SidePanel/SidePanel";
import TrackVacation from "../TrackVacation/TrackVacation";
import './LandingPage.scss';
import initialLoad from '../temp/initialLoad.json';
import { useDispatch } from "react-redux";
import { addLeaveToday, addUsers, addVacationPending } from "../common/redux/DashBoardSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LandingPage = () => {

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(addUsers(initialLoad.allUsers));
        dispatch(addLeaveToday(initialLoad.currentDayLeave));
        dispatch(addVacationPending(initialLoad.pendingVacationUser));
    }, []);


    return (
        <div className="row landing-page-parent">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 text-center p-4 header">
                        NW Dashboard
                    </div>
                </div>
                <BrowserRouter>
                    <div className="row">
                        <div className="col-md-2 side-panel-parent">
                            <SidePanel/>
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