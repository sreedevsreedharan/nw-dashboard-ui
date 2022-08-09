import axios from "axios";


export default class DashboardRestService {

    getOnLoadData = () => {
        return axios.get('http://localhost:8080/dashboard/v1/load');
    }

    getVacations = (gpn) => {
        return axios.get(`http://localhost:8080/dashboard/v1/${gpn}/vacations`);
    }

    saveVacations = (saveObject) => {
        return axios.post(`http://localhost:8080/dashboard/v1/add/vacations`,saveObject);
    }

    getReport = () => {
        return axios.get('http://localhost:8080/dashboard/v1/fetch-report');
    }

    getProjects = () => {
        return axios.get('http://localhost:8080/dashboard/v1/fetch-projects');
    }

    saveUser = (saveObject) => {
        return axios.post('http://localhost:8081/dashboard/v1/add/user',saveObject);
    }

}

