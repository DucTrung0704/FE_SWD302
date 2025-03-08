import { UpdateBackgroundDoctor } from "../../Models/Doctor";
import axiosInstance from "../api/AxiosInstance";
import { handleError } from "../api/ErrorHandler";

const doctorApi = {
    getMyProfile: async () => {
        try {
            const response = await axiosInstance.get('/doctor/myProfile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
            );
            return response.data;
        } catch (error) {
            const errorMessage = handleError(error);
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (UpdateBackgroundDoctor) => {
        try {
            const response = await axiosInstance.put('/doctor/update/profile', UpdateBackgroundDoctor, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
            );
            return response.data;
        } catch (error) {
            const errorMessage = handleError(error);
            throw new Error(errorMessage);
        }
    }
}

export default doctorApi;