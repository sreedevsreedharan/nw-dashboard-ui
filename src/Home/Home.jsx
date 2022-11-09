/* eslint-disable react-hooks/exhaustive-deps*/
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
import { Modal } from "bootstrap";

const Home = () => {
    const dispatch = useDispatch();
    let currentState = useSelector((state) => state.leaveToday);
    const restService = new DashboardRestService();

    useEffect(() => {
        restService.getOnLoadData()
            .then(res => {
                if (res.data.users) {
                    dispatch(addUsers(res.data.users));
                }
                if (res.data.onVacationToday) {
                    dispatch(addLeaveToday(res.data.onVacationToday));
                }
            })
    }, []);

    const [dashboardContent, setDashBoardContent] = useState([]);
    const [trackerContent, setTrackerContent] = useState([]);
    const [todayContent, setTodayContent] = useState([]);
    const [tableContent, setTableContent] = useState();

    const onDashBoardClick = (clicked) => {
        setTableContent(clicked);
        let myModal = new Modal(document.getElementById('messageModal'));
        myModal.show();
    }

    useEffect(() => {
        let vacationPendingCount = 0;
        if (currentState.users) {
            currentState.users.forEach(user => {
                if (!user.vacation) {
                    vacationPendingCount++;
                }
            });

            let trackercontent = [
                {
                    count: vacationPendingCount,
                    text: vacationPending,
                    click: 'vacation'
                }
            ];
            let todayContent = [
                {
                    count: currentState.leaveToday.length,
                    text: leaveCount,
                    click: 'leave'
                }
            ]
            setTrackerContent(trackercontent);
            setTodayContent(todayContent);
        }

    }, [currentState]);

    return (
        <div className="row p-5">
            <div className="col-md-12">
                <div className="row">
                    Trackers Pending
                    <hr />
                </div>
                <div className="row mt-2">
                    {trackerContent && trackerContent.map(content => {
                        return (
                            <DashBoardBox count={content.count}
                                text={content.text} onDashBoardClick={onDashBoardClick}
                                click={content.click}
                            />
                        )
                    })}
                </div>
                <div className="row mt-4">
                    Today
                    <hr />
                </div>
                <div className="row  mt-2">
                    {todayContent && todayContent.map(content => {
                        return (
                            <DashBoardBox count={content.count}
                                text={content.text} onDashBoardClick={onDashBoardClick}
                                click={content.click}
                            />
                        )
                    })}
                </div>

                <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-body p-5">
                                    {(() => {
                                        switch (tableContent) {

                                            case 'leave':
                                                return <OnHoliday />;

                                            case 'vacation':
                                                return <VacationPending />;

                                            default:
                                                break;
                                        }
                                    })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;