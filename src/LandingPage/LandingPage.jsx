import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import SidePanel from "../SidePanel/SidePanel";
import TrackVacation from "../TrackVacation/TrackVacation";
import './LandingPage.scss';
import initialLoad from '../temp/initialLoad.json';
import { useDispatch } from "react-redux";
import { addLeaveToday, addUsers, addVacationPending } from "../common/redux/DashBoardSlice";

const LandingPage = () => {

    const dispatch = useDispatch();
    

    const[currentScreen, setCurrentScreen] = useState(true);

    useEffect(()=>{
        console.log('initialLoad',initialLoad);
        dispatch(addUsers(initialLoad.allUsers));
        dispatch(addLeaveToday(initialLoad.currentDayLeave));
        dispatch(addVacationPending(initialLoad.pendingVacationUser));

    },[]);

    const toggleScreen = () =>{
        setCurrentScreen(!currentScreen);
    }

    return(
        <div className="row landing-page-parent">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 text-center p-4 header">
                        NW Dashboard
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 side-panel-parent">
                        <SidePanel toggleScreen={toggleScreen}/>
                    </div>
                    <div className="col-md-10">
                        {currentScreen && <Home />}
                        {!currentScreen && <TrackVacation />}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage;