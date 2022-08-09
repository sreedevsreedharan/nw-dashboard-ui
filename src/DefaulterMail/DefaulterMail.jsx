import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { body, cc, copyList, defaulterMailBody, defaulterSubject, noDefaulters, subject, to } from "../common/constants/constants";

const DefaulterMail = () => {


    let currentState = useSelector((state) => state.users);
    const [defaultersList, setDefaultersList] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        let emailList = "";
        currentState.users.forEach(user => {
            if(!user.vacation){
                emailList=emailList+user.userEmail+";";
            }      
        });
        setDefaultersList(emailList);
    },[])

    return (
        <div className="row mt-5">

            {defaultersList.length>0 && <div className="col-md-12">
                <div className="row">
                    <div className="col-md-1">
                        {to}
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" type="text" value={defaultersList}></input>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-1">
                        {cc}
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" type="text" value={copyList}></input>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-1">
                        {subject}
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" type="text" value={defaulterSubject}></input>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-1">
                        {body}
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" type="text" value={defaulterMailBody}></input>
                    </div>
                </div>
            </div>}
            {defaultersList.length===0 && <div className="col-md-12">
                {noDefaulters}
                </div>}
        </div>
    )
}
export default DefaulterMail;