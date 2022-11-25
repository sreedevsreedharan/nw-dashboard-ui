/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import './OnHoliday.scss';
import holiday from './temp.json'; //to be removed

const OnHoliday = () => {
    let currentState = useSelector((state) => state.leaveToday);
    let currentIndex = 0;
    const [filteredUserMap, setFilteredUserMap] = useState();


    useEffect(() => {
        let filteredMap = new Map();
        currentState.publicHolidayToday.publicHolidayToday.map(ph => {
            currentState.users.map(user => {
                if (user.userLocation === ph) {
                    if (filteredMap.has(user.userLocation)) {
                        let projectUsers = filteredMap.get(user.userLocation);
                        projectUsers.push(user);
                        filteredMap.set(user.userLocation, projectUsers);
                    } else {
                        let newArray = [];
                        newArray.push(user);
                        filteredMap.set(user.userLocation, newArray);
                    }
                }
            })
        })
        setFilteredUserMap(filteredMap);
    }, []);

    return (
        <div>
            <div>
                <h5>Holiday Today</h5>
            </div>
            <div>
                {filteredUserMap && Array.from(filteredUserMap.entries()).map(entry => {
                    const [key, value] = entry;
                    if (value.length > 0) {
                        return (
                            <table className="table table-bordered mt-5">
                                <thead >
                                    <th className="th" colSpan={3}>
                                        {key}
                                    </th>
                                </thead>
                                <tbody className="tbody">
                                    {value.map((user, index) => {
                                            return (
                                                <tr key={user.userGPN}>
                                                    <td className="fixed-width">{++currentIndex}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.userProjectName}</td>
                                                </tr>
                                            )
                                    })}
                                </tbody>
                            </table>
                        )
                    }
                })}
            </div>
        </div>

    )
}
export default OnHoliday;