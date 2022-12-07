import React, { useState } from 'react';
import { useEffect } from 'react';
import { monthList } from '../../common/constants/constants';
import './PublicHolidayReport.scss';

const PublicHolidayReport = ({reportData}) => {

    const [totalSpan, setTotalSpan] = useState(0);
    const [monthSpan, setMonthSpan] = useState();
    const [holidayData, setHolidayData] = useState();

    const getMaxOfEachMonths = () => {
        const locations = reportData.publicHolidays.locations;
        let monthMap = new Map();
        let tSpan = 0;
        for (let i = 0; i < locations.length; i++) {
            locations[i].holidays.map((h, index) => {
                if (monthMap.has(h.month)) {
                    let currentColSpan = monthMap.get(h.month);
                    if (currentColSpan < h.dates.length) {
                        monthMap.set(h.month, h.dates.length);
                    }
                } else {
                    monthMap.set(h.month, h.dates.length);
                }
            })
        }
        for (let [key, value] of monthMap) {
            tSpan = tSpan + value;
        }
        setTotalSpan(tSpan + 2);
        setMonthSpan(monthMap);
        return monthMap;
    }

    const addEmptyToMonths = (monthMap) => {
        let tempHolidayData = reportData;
        if (tempHolidayData) {
            for (let i = 0; i < tempHolidayData.publicHolidays.locations.length; i++) {
                let tempHolidays = tempHolidayData.publicHolidays.locations[i].holidays;
                for(let k=0;k<tempHolidays.length;k++){
                    if (tempHolidays[k].dates &&
                        tempHolidays[k].dates.length < monthMap.get(tempHolidays[k].month)) {
                        const iterate = monthMap.get(tempHolidays[k].month) - tempHolidays[k].dates.length;
                        for (let j = 0; j < iterate; j++) {
                            tempHolidays[k].dates.push("");
                        }
                    }
                }              
            }
        }
        setHolidayData(tempHolidayData);
    }
    useEffect(() => {
        const monthMap = getMaxOfEachMonths();
        addEmptyToMonths(monthMap);
        
    }, []);

    const transformDates = (date) =>{
        if(date){
            let displayDate ="";
            if(new Date(date).getDate()<10){
                displayDate = `0${new Date(date).getDate()}`;
            }else{
                displayDate =new Date(date).getDate();
            }
            return (`${displayDate}-${monthList[new Date(date).getMonth()].substr(0,3)}`)
        }        
        return date;
    }

    const getClassName = (index) =>{
        if(index%2===0){
            return'text-center oddColor';
        }else {
            return'text-center evenColor';
        }
    }

    const getColumnClassName = (index) =>{
        if(index%2===0){
            return'pe-2 ps-2 oddColor';
        }else {
            return'pe-2 ps-2 evenColor';
        }
    }

    return (
        <div className='mt-3 mb-5'>
            {totalSpan > 2 &&
            <table id="sample" className="report-table">
                <thead>
                    <tr>
                        <td className="text-center bg-orange" colSpan={totalSpan}>Public Holidays</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        {holidayData && holidayData.publicHolidays.months.map((ph,index) => {
                            return (
                                <th colSpan={monthSpan && monthSpan.get(ph)} className={getClassName(index)}>{ph}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {holidayData && holidayData.publicHolidays.locations.map(ph => {
                        return (
                            <tr>
                                <td>{ph.location}</td>
                                {ph.holidays.map((h,index1) => {
                                    return (
                                        <>
                                            {h.dates.map((date, index) => {
                                                return (
                                                    <>
                                                        <td className={getColumnClassName(index1)}>{transformDates(date)}</td>                                                        
                                                    </>
                                                )
                                            })}

                                        </>
                                    )
                                })}
                            </tr>
                        )
                    })}

                </tbody>
            </table>}
        </div>
    )
}
export default PublicHolidayReport;