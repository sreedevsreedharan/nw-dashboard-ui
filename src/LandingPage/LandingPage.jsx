/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Home from "../Home/Home";
import SidePanel from "../SidePanel/SidePanel";
import TrackVacation from "../TrackVacation/TrackVacation";
import './LandingPage.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LandingPage = () => {

   const dashboardName = process.env.REACT_APP_DASHBOARD_NAME;


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