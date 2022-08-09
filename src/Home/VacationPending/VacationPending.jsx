import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { vacationPending, vacationPendingHeaders } from "../../common/constants/constants";

const VacationPending = () => {
    let currentState = useSelector((state) => state.leaveToday);
    let currentIndex = 0;
    const [isUserPresent, setUserPresent] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        currentState.users.forEach(user => {
            if (!user.vacation) {
                setUserPresent(true);
            }
        });
    }, [])

    return (
        <div>
            {isUserPresent && <div className="col-md-12">
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

                            }else{
                                return(<></>)
                            }

                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}
export default VacationPending;