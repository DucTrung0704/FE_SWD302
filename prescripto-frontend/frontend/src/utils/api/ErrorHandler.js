import { isAxiosError } from 'axios';

export const handleError = (error) => {
  if (isAxiosError(error)) {
    // Return the original error response if it has the expected structure
    console.log("handleError", error);
    if (error.response?.data?.StatusCode && error.response?.data?.Detailed) {
      //console.log("returning detailed", error.response.data.Detailed);
      return error.response.data.Detailed;
    }
    
    // Fallback error messages
    if (error.response?.data) {
      //console.log("returning fallback", typeof error.response.data === 'string' ? error.response.data : 'An error occurred');
      return typeof error.response.data === 'string' 
        ? error.response.data 
        : 'An error occurred';
    }
  }
  
  throw error; // Pass through the original error if it's not an Axios error
};
