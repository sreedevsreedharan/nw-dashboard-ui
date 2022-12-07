import axios from "axios";


export default class DashboardRestService {

    constructor(){
        this.state = {
            accessToken: localStorage.getItem("accessToken")
        };
    }

    state={
        accessToken:""
    }
    
    
    serviceUrl = process.env.REACT_APP_SERVICE;

    getOnLoadData = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/load`,{params:{access_token:this.state.accessToken}});
    }

    getVacations = (gpn) => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/${gpn}/vacations`,{params:{access_token:this.state.accessToken}});
    }

    saveVacations = (saveObject) => {
        return axios.post(`${this.serviceUrl}/dashboard/v1/add/vacations`, saveObject,{params:{access_token:this.state.accessToken}});
    }

    getReport = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/fetch-report`,{params:{access_token:this.state.accessToken}});
    }

    getProjects = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/fetch-projects`,{params:{access_token:this.state.accessToken}});
    }

    saveUser = (saveObject) => {
        return axios.post(`${this.serviceUrl}/dashboard/v1/add/user`, saveObject,{params:{access_token:this.state.accessToken}});
    }

    fetchExcelReport = (startDate, endDate, userGPN) => {
        if (userGPN) {
            return axios.post(`${this.serviceUrl}/dashboard/v1/generate-report?startDate=${startDate}&endDate=${endDate}&userGPN=${userGPN}`,{params:{access_token:this.state.accessToken}});
        } else {
            return axios.post(`${this.serviceUrl}/dashboard/v1/generate-report?startDate=${startDate}&endDate=${endDate}`,{params:{access_token:this.state.accessToken}});
        }
    }

    userLogin = (userName, password) =>{
        let loginRequest = {
            "userName" : userName,
            "password" : password
        }
        return axios.post(`${this.serviceUrl}/dashboard/v1/user-log-in`, loginRequest);
    }

    userLogout = () =>{
        return axios.post(`${this.serviceUrl}/dashboard/v1/user-log-out`,"", {headers:{Authorization:this.state.accessToken}});
    }

    removeUser = (removeObject) => {
        return axios.post(`${this.serviceUrl}/dashboard/v1/remove/user`, removeObject,{params:{access_token:this.state.accessToken}});
    }

}

