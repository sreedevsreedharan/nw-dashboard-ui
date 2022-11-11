import React from "react";
import { useSelector } from 'react-redux';
import { fullDay, halfDay, no, onLeaveTodayHeaders, onLeaveToday, yes } from "../../common/constants/constants";
import './OnLeave.scss';

const OnLeave = () => {
    let currentState = useSelector((state) => state.leaveToday);



    return (
        <div>
            {currentState.leaveToday.length > 0 && <div className="col-md-12">
                <div>
                    <h5>{onLeaveToday}</h5>
                </div>
                <table className="table table-bordered mt-5">
                    {/* <thead>
                        <tr>
                            {onLeaveTodayHeaders.map(header => {
                                return (
                                    <th>{header}</th>
                                )
                            })}
                        </tr>
                    </thead> */}
                    <tbody className="tbody">
                        {currentState.leaveToday.map((user, index) => {
                            return (
                                <tr key={user.userGPN}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.team}</td>                         
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}
export default OnLeave;