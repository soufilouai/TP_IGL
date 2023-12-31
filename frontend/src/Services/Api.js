import axios from 'axios'

const MAIN_URL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL : '${MAIN_URL}',
});


export const RegisterRequest = async (username,email,password) => {
    let response  = fetch('http://127.0.0.1:8000/api/users/register/', {
        method:'POST',
        // mode: 'no-cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'username': username,'password':password,'email':email})
    })
    return response;
};

export const login = async () => {
    



};
 
