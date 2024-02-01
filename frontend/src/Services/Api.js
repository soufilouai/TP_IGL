
export const RegisterRequest = async (username,email,password) => {
    let response  = fetch('http://127.0.0.1:8000/api/users/register/', {
        method:'POST',
        // mode: 'no-cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'username': username,'password':password,'email':email})
    })
    console.log("this is la reponse :",response);
    return response;
};

export const Loginrequest = async (username,password) => {
    

    let response  = fetch('http://127.0.0.1:8000/api/users/login/', {
        method:'POST',
        // mode: 'no-cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'username': username,'password':password})
    })
    return response;

};
 
