import axios from 'axios'

const MAIN_URL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL : '${MAIN_URL}',
});


export const register = async (username,email,password) => {
try {
    const registerdata = [username,email,password];
    const response = await api.post('/api/users/register',registerdata);
    return response.data;
} catch (error) {
    
} 


};

export const login = async () => {
    



};
 
