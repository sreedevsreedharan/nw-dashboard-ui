import axios from "axios";


export default class DashboardRestService {

    getOnLoadData = () => {
        return axios.get('https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/load');
    }

    getVacations = (gpn) => {
        return axios.get(`https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/${gpn}/vacations`);
    }

    saveVacations = (saveObject) => {
        return axios.post(`https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/add/vacations`,saveObject);
    }

    getReport = () => {
        return axios.get('https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/fetch-report');
    }

    getProjects = () => {
        return axios.get('https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/fetch-projects');
    }

    saveUser = (saveObject) => {
        return axios.post('https://nw-dashboard-service-app.herokuapp.com/dashboard/v1/add/user',saveObject);
    }

}

