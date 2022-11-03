import axios from "axios";


export default class DashboardRestService {

    serviceUrl = process.env.REACT_APP_SERVICE;

    getOnLoadData = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/load`);
    }

    getVacations = (gpn) => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/${gpn}/vacations`);
    }

    saveVacations = (saveObject) => {
        return axios.post(`${this.serviceUrl}/dashboard/v1/add/vacations`, saveObject);
    }

    getReport = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/fetch-report`);
    }

    getProjects = () => {
        return axios.get(`${this.serviceUrl}/dashboard/v1/fetch-projects`);
    }

    saveUser = (saveObject) => {
        return axios.post(`${this.serviceUrl}/dashboard/v1/add/user`, saveObject);
    }

    fetchExcelReport = (startDate, endDate, userGPN) => {
        if (userGPN) {
            return axios.post(`${this.serviceUrl}/dashboard/v1/generate-report?startDate=${startDate}&endDate=${endDate}&userGPN=${userGPN}`);
        } else {
            return axios.post(`${this.serviceUrl}/dashboard/v1/generate-report?startDate=${startDate}&endDate=${endDate}`);
        }

    }



}

