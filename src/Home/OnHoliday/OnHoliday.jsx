import React from "react";
import { useSelector } from 'react-redux';

const OnHoliday = () => {
    let currentState = useSelector((state) => state.leaveToday);
    return (
        <div className="col-md-12">
            <div>
                <h5>On Leave today</h5>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee name</th>
                        <th>Leave from</th>
                        <th>Leave to</th>
                        <th>Type</th>
                        <th>Public Holiday?</th>
                        <th>Planned?</th>
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
                                <td>{user.type?"Full Day":"Half Day"}</td>
                                <td>{user.ph?"Yes":"No"}</td>
                                <td>{user.planned?"Yes":"No"}</td>
                            </tr>
                        )
                    })}                    
                </tbody>
            </table>
        </div>
    )
}
export default OnHoliday;