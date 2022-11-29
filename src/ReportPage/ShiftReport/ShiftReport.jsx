import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import temp from "./temp.json";
import './ShiftReport.scss';

const ShiftReport = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(temp.projects);
    }, []);

    return (
        <div>
            <table className="shift-report-table">
                {projects.map(project => {
                    return (
                        <>
                            <tr className='project-title'>
                                <td>
                                    {project.projectName}
                                </td>
                            </tr>
                            {project.shiftOptedUsers.map(user => {
                                return (
                                    <tr>
                                        <td>
                                            {user}
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )
                })}

            </table>
        </div>
    )
}
export default ShiftReport;