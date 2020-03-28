import axios from 'axios';
import { toast } from 'react-toastify';




export default class AxiosClass {

    getHeaders(options) {
        if (!options) {
            options = {}
        }
        if (!options.headers) {
            options.headers = {
                // Authorization : 'Bearer ' + getCookie('accessToken')
            };
        }
        if (!options.headers['Content-Type'] && !options.headers['skipSettingContentType']) {
            options.headers['Content-Type']= 'application/json';
        }
        return options;
    }


    get(url, options) {
        return this.responseHandler(axios.get(url, this.getHeaders(options)));
    }

    post(url, body, options) {
        return this.responseHandler(axios.post(url, body, this.getHeaders(options)));
    }

    put(url, body, options) {
        return this.responseHandler(axios.put(url, body, this.getHeaders(options)));
    }

    delete(url, options) {
        return this.responseHandler(axios.delete(url, this.getHeaders(options)));
    }

    async responseHandler(responsePromise) {
        try {
            const response = await responsePromise;
            return response['data'];
        } catch(error) {
            if(error.response.status === 401) {
                
            } else {
                toast.error(error.response.data.message ? error.response.data.message : error.response.data.errorMessage ?  error.response.data.errorMessage : 'Something went wrong.. try again!')
            }
            throw error;
        }
    }
    
}

export const AxiosService = new AxiosClass(); 
