/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Home from "../Home/Home";
import SidePanel from "../SidePanel/SidePanel";
import TrackVacation from "../TrackVacation/TrackVacation";
import './LandingPage.scss';
import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import ReportPage from "../ReportPage/ReportPage";
import DefaulterMail from "../DefaulterMail/DefaulterMail";
import AddUsers from "../Users/AddUsers";
import icon from '../images/logo-color.png';
import LoginPage from "../Login/LoginPage";
import { useState } from "react";

const LandingPage = () => {

    const dashboardName = process.env.REACT_APP_DASHBOARD_NAME;
    const defaultersFeature = process.env.REACT_APP_DEFAULTERS_MAIL_TOGGLE;
    const loginFeature = process.env.REACT_APP_LOGIN_TOGGLE;
    const [isLoggedIn, setLoggedIn] = useState(false);



    return (
        <div className="row landing-page-parent">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12  header">
                        <div className="row">
                            <div className="ms-4 text-center col-md-12">
                                <img className="icon" src={icon} />
                            </div>
                        </div>

                    </div>
                </div>
                <BrowserRouter>
                    <div className="row">
                        <div className="col-md-2">
                            <SidePanel defaultersFeature={defaultersFeature} />
                        </div>
                        <div className="col-md-10">

                            <Routes>
                                {loginFeature && <Route path="/login" element={<LoginPage />} />}
                                <Route path="/" element={<Home />} />
                                <Route path="/trackVacation" element={<TrackVacation />} />
                                <Route path="/viewReport" element={<ReportPage />} />
                                <Route path="/defaulterMail" element={<DefaulterMail />} />
                                <Route path="/addUsers" element={<AddUsers editUser={false} />} />
                                <Route path="/editUsers" element={<AddUsers editUser={true} />} />
                            </Routes>


                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}
export default LandingPage;