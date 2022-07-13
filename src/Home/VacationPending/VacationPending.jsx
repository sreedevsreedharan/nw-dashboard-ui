import React from "react";
import { useSelector } from 'react-redux';
import { vacationPending, vacationPendingHeaders } from "../../common/constants/constants";

const VacationPending = () => {
    let currentState = useSelector((state) => state.leaveToday);
    
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
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.team}</td>
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