import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import './Home.scss';
import OnHoliday from "./OnHoliday/OnHoliday";

const Home = () => {
    return (
        <div className="row p-5">
            <div className="col-md-12">
                <div className="row">
                    <DashBoardBox count="12" text="people yet to enter the data" />
                    <DashBoardBox count="2" text="people on leave today" />
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