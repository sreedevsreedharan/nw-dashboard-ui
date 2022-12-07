/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import DashBoardBox from "../DashBoardBox/DashBoardBox";
import OnLeave from "./OnLeave/OnLeave";
import { useDispatch, useSelector } from 'react-redux';
import { vacationPending, leaveCount, publicHolidayCount, shiftPending } from "../common/constants/constants";
import { useState } from "react";
import { useEffect } from "react";
import VacationPending from "./VacationPending/VacationPending";
import DashboardRestService from "../common/rest/DashboardRestService";
import { addLeaveToday, addPublicHolidayToday, addUsers } from "../common/redux/DashBoardSlice";
import { Modal } from "bootstrap";
import holiday from '../Home/OnHoliday/temp.json'; //to be removed
import OnHoliday from "./OnHoliday/OnHoliday";
import { useNavigate } from "react-router-dom";
import ShiftPending from "./ShiftPending/ShiftPending";

const Home = () => {
    const dispatch = useDispatch();
    let currentState = useSelector((state) => state.leaveToday);
    const restService = new DashboardRestService();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        restService.getOnLoadData()
            .then(res => {
                if (res.data.users) {
                    dispatch(addUsers(res.data.users));
                }
                if (res.data.onVacationToday) {
                    dispatch(addLeaveToday(res.data.onVacationToday));
                }
                if (res.data.publicHolidayToday) {
                    dispatch(addPublicHolidayToday(res.data.publicHolidayToday));
                } else {
                    dispatch(addPublicHolidayToday({}));
                }
            })
            .catch(error=>{
                localStorage.setItem('accessToken','');
                localStorage.setItem('role',""); 
                navigate("/");            
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

    const getCurrentPublicHolidayUserCount = () => {
        let count = 0;
        // to be taken from on load
        if (currentState.publicHolidayToday && currentState.publicHolidayToday.publicHolidayToday && currentState.publicHolidayToday.publicHolidayToday.length > 0) {
            currentState.publicHolidayToday.publicHolidayToday.map(ph => {
                currentState.users.map(user => {
                    if (user.userLocation === ph) {
                        count++;
                    }
                })

            })
        }
        return count;
    }

    useEffect(() => {
        let vacationPendingCount = 0;
        let shiftPendingCount = 0;
        if (currentState.users) {
            currentState.users.forEach(user => {
                if (!user.vacation) {
                    vacationPendingCount++;
                }
                if(!user.shift){
                    shiftPendingCount++;
                }
            });

            let trackercontent = [
                {
                    count: vacationPendingCount,
                    text: vacationPending,
                    click: 'vacation'
                },
                // {
                //     count: shiftPendingCount,
                //     text: shiftPending,
                //     click: 'shift'
                // }
            ];
            let todayContent = [
                {
                    count: currentState.leaveToday.length,
                    text: leaveCount,
                    click: 'leave'
                },
                {
                    count: getCurrentPublicHolidayUserCount(),
                    text: publicHolidayCount,
                    click: 'ph'
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
                        if(content.count>0){
                            return (
                                <DashBoardBox count={content.count}
                                    text={content.text} onDashBoardClick={onDashBoardClick}
                                    click={content.click}
                                />
                            )
                        }else{
                            <></>
                        }
                    })}
                </div>

                <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body p-5">
                                {(() => {
                                    switch (tableContent) {

                                        case 'leave':
                                            return <OnLeave />;

                                        case 'vacation':
                                            return <VacationPending />;
                                        case 'ph':
                                            return <OnHoliday />
                                        case 'shift':
                                            return <ShiftPending />;
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