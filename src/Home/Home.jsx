import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import './Home.scss';
import OnHoliday from "./OnHoliday/OnHoliday";
import { useSelector } from 'react-redux';
import {vacationPending,leaveCount} from "../common/constants/constants";

const Home = () => {
    let currentState = useSelector((state) => state.leaveToday);
    return (
        <div className="row p-5">
            <div className="col-md-12">
                <div className="row">
                    <DashBoardBox count={currentState.vacationPending.length} text={vacationPending} />
                    <DashBoardBox count={currentState.leaveToday.length} text={leaveCount} />
                </div>
                <hr/>
                <div className="row mt-5">
                    <OnHoliday />
                </div>
            </div>
        </div>
    )
}
export default Home;