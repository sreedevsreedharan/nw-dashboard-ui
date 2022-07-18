import axios from "axios";


export default class DashboardRestService {

    getOnLoadData = () => {
        return axios.get('http://localhost:8080/dashboard/v1/load');
    }

    

}

