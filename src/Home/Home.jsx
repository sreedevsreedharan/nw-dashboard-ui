import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import './Home.scss';
import OnHoliday from "./OnHoliday/OnHoliday";
import { useSelector } from 'react-redux';
import { vacationPending, leaveCount } from "../common/constants/constants";
import { useState } from "react";
import { useEffect } from "react";
import VacationPending from "./VacationPending/VacationPending";

const Home = () => {
    let currentState = useSelector((state) => state.leaveToday);

    const [dashboardContent, setDashBoardContent] = useState([]);
    const [tableContent, setTableContent] = useState();

    const onDashBoardClick = (clicked) => {
        setTableContent(clicked);
    }

    useEffect(() => {
        let content = [
            {
                count: currentState.vacationPending.length,
                text: vacationPending,
                click: 'vacation'
            },
            {
                count: currentState.leaveToday.length,
                text: leaveCount,
                click: 'leave'
            }
        ];
        setDashBoardContent(content);
    }, [currentState]);

    return (
        <div className="row p-5">
            <div className="col-md-12">
                <div className="row">
                    {dashboardContent && dashboardContent.map(content => {
                        return (
                            <DashBoardBox count={content.count}
                                text={content.text} onDashBoardClick={onDashBoardClick}
                                click={content.click}
                            />
                        )
                    })}
                </div>
                <hr />
                <div className="row mt-5">
                    {(() => {
                        switch (tableContent) {
                            
                            case 'leave':
                               return <OnHoliday />;
                            
                            case 'vacation':
                                return <VacationPending/>;

                            default:
                                break;
                        }
                    })()
                    }
               
                </div>
            </div>
        </div>
    )
}
export default Home;