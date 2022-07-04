import React from "react";

const OnHoliday = () => {
    return (
        <div className="col-md-12">
            <div>
                <h5>On Leave today</h5>
            </div>
            <table className="table mt-5">
                <thead>
                    <th>#</th>
                    <th>Employee name</th>
                    <th>GPN</th>
                    <th>Leave from</th>
                    <th>Leave to</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sreedev Sreedharan</td>
                        <td>IN010M78138</td>
                        <td>27/06/2022</td>
                        <td>28/06/2022</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Shivam Kale</td>
                        <td>IN010M78139</td>
                        <td>27/06/2022</td>
                        <td>28/06/2022</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default OnHoliday;