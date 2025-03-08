import { createContext, useEffect, useState } from 'react'
import authApi from '../utils/services/AuthService';
import { toast } from 'react-toastify';



export const UserContext = createContext(undefined);

const UserContextProvider = ({ children }) => {

    const [role, setRole] = useState();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        setToken(token);
    }, []);

    const loginUser = async (userName, password) => {
        try {
            const res = await authApi.login(userName, password);
            console.log(res);
            setRole(
                res.accessToken.split('.')[1] 
                    ? JSON.parse(atob(res.accessToken.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                    : null
            );
            localStorage.setItem('token', res.accessToken);
            setToken(res.accessToken);
            toast.success('Login Successfully.', {autoClose: 1500, position: 'top-center'})
            return true;
        } catch (error) {
            toast.error('Your userName or password are wrong.', {autoClose: 2000, position: 'top-center'})
            return false;
        }
    }
    console.log(role);

    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
        toast.success('Logged out successfully', {autoClose: 1500, position: 'top-center'});
    }

    return (
        <UserContext.Provider value={{loginUser, logoutUser, role, token}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider