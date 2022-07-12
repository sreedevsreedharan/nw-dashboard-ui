import React from "react";
import { useSelector } from 'react-redux';
import { fullDay, half, halfDay, no, onHolidayHeaders, onLeaveToday, yes } from "../../common/constants/constants";

const OnHoliday = () => {
    let currentState = useSelector((state) => state.leaveToday);
    return (
        <div className="col-md-12">
            <div>
                <h5>{onLeaveToday}</h5>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        {onHolidayHeaders.map(header=>{
                            return(
                                <th>{header}</th>
                            )
                        })}                    
                    </tr>
                </thead>
                <tbody>
                    {currentState.leaveToday.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.leavefrom}</td>
                                <td>{user.leaveto}</td>
                                <td>{user.type===half?halfDay:fullDay}</td>
                                <td>{user.ph?yes:no}</td>
                                <td>{user.planned?yes:no}</td>
                            </tr>
                        )
                    })}                    
                </tbody>
            </table>
        </div>
    )
}
export default OnHoliday;