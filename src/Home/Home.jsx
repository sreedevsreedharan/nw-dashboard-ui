import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import './Home.scss';
import OnHoliday from "./OnHoliday/OnHoliday";
import { useSelector } from 'react-redux';

const Home = () => {
    let currentState = useSelector((state) => state.leaveToday);
    return (
        <div className="row p-5">
            <div className="col-md-12">
                <div className="row">
                    <DashBoardBox count={currentState.vacationPending.length} text="people yet to enter the data" />
                    <DashBoardBox count={currentState.leaveToday.length} text="people on leave today" />
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