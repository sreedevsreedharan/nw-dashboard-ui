/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { vacationPending, vacationPendingHeaders } from "../../common/constants/constants";
import './ShiftPending.scss';

const ShiftPending = () => {
    let currentState = useSelector((state) => state.leaveToday);
    let currentIndex = 0;
    const [isUserPresent, setUserPresent] = useState(false);
    const [filteredUserMap, setFilteredUserMap] = useState();

    useEffect(() => {
        currentState.users.forEach(user => {
            if (!user.vacation) {
                setUserPresent(true);
            }
        });
    }, []);

    useEffect(() => {
        let filteredMap = new Map();
        const tempUsers = currentState.users;
        tempUsers.map(user => {
            if (filteredMap.has(user.userProjectName)) {
                let projectUsers = filteredMap.get(user.userProjectName);
                if (!user.shift) {
                    projectUsers.push(user);
                    filteredMap.set(user.userProjectName, projectUsers);
                }
            } else {
                let newArray = [];
                if (!user.shift) {
                    newArray.push(user);
                    filteredMap.set(user.userProjectName, newArray);
                }
            }
        });
        setFilteredUserMap(filteredMap);
    }, []);

    return (
        <div>
            {isUserPresent && <div className="col-md-12">
                <div>
                    <h5>Pending Shift Tracker</h5>
                </div>
                <div>
                    {Array.from(filteredUserMap.entries()).map(entry => {
                        const [key, value] = entry;
                        if (value.length > 0) {
                            return (
                                <table className="table table-bordered mt-5">
                                    <thead >
                                        <th className="th" colSpan={2}>
                                            {key}
                                        </th>
                                    </thead>
                                    <tbody className="tbody">
                                        {value.map((user, index) => {
                                            if (!user.shift) {
                                                return (
                                                    <tr key={user.userGPN}>
                                                        <td className="fixed-width">{++currentIndex}</td>
                                                        <td>{user.userName}</td>
                                                    </tr>
                                                )

                                            } else {
                                                return (<></>)
                                            }

                                        })}
                                    </tbody>
                                </table>
                            )
                        }
                    })}
                </div>
            </div>

            }
        </div >
    )
}
export default ShiftPending;