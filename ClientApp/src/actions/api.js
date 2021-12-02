// handle all http requests
import axios from "axios";

const baseUrl = 'http://localhost:41478/api/';
// const baseUrl = 'http://localhost:41478/';

export default {
    employee(url = baseUrl + 'employees/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
}