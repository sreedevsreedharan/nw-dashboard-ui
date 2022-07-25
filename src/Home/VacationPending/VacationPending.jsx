import React from "react";
import { useSelector } from 'react-redux';
import { vacationPending, vacationPendingHeaders } from "../../common/constants/constants";

const VacationPending = () => {
    let currentState = useSelector((state) => state.leaveToday);
    let currentIndex = 0;
    
    return (
        <div className="col-md-12">
            <div>
                <h5>{vacationPending}</h5>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        {vacationPendingHeaders.map(header => {
                            return (
                                <th>{header}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentState.users.map((user, index) => {
                        if (!user.vacation) {
                            return (
                                <tr key={user.userGPN}>
                                    <td>{++currentIndex}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.userGPN}</td>
                                    <td>{user.userProjectName}</td>
                                </tr>
                            )

                        }

                    })}
                </tbody>
            </table>
        </div>
    )
}
export default VacationPending;