import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import OnHoliday from "./OnHoliday/OnHoliday";
import { useDispatch, useSelector } from 'react-redux';
import { vacationPending, leaveCount } from "../common/constants/constants";
import { useState } from "react";
import { useEffect } from "react";
import VacationPending from "./VacationPending/VacationPending";
import DashboardRestService from "../common/rest/DashboardRestService";
import { addLeaveToday, addUsers } from "../common/redux/DashBoardSlice";

const Home = () => {
    const dispatch = useDispatch();
    let currentState = useSelector((state) => state.leaveToday);
    const restService = new DashboardRestService();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        restService.getOnLoadData()
        .then(res => {
            if(res.data.users){
                dispatch(addUsers(res.data.users));
            }
            if(res.data.onVacationToday){
                dispatch(addLeaveToday(res.data.onVacationToday));
            }    
        })
    },[]);

    const [dashboardContent, setDashBoardContent] = useState([]);
    const [tableContent, setTableContent] = useState();

    const onDashBoardClick = (clicked) => {
        setTableContent(clicked);
    }

    useEffect(() => {
        let vacationPendingCount = 0;
        if (currentState.users) {
            currentState.users.forEach(user => {
                if (!user.vacation) {
                    vacationPendingCount++;
                }
            });

            let content = [
                {
                    count: vacationPendingCount,
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
        }

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
                                return <VacationPending />;

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