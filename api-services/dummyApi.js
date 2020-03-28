import { AxiosService } from "./axios.service";


export const dummyGetApi = async (payload) => {
    return await AxiosService.get('http://dummy.restapiexample.com/api/v1/employees')
};