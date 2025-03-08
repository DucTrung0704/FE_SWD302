import axiosInstance from "../api/AxiosInstance";
import { handleError } from "../api/ErrorHandler";

const authApi = {
    login: async (userName, password) => {
        try {
           const response =  await axiosInstance.post('/auth/login', {userName, password});
           return response.data;
        } catch (error) {
            const errorMessage = handleError(error);
            throw new Error(errorMessage);
        }
    }
}

export default authApi;
