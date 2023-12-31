import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Authcomponennts from "../../Components/AuthComponents";


import "../../Styles/Authpages/login.css"



const Login = () => {

    const history = useHistory()
    const toRegister = (page) =>{
        history.push(page)
    }

    const [emailinput,setemailinput] = useState('')
    const handleemailchange= (email) => {
        setemailinput(email)
    } 

    const [passwordinput,setpasswordinput] = useState('')
    const handlpasswordchange= (password) => {
        setpasswordinput(password)
    } 
    const [showpassword,setshowpassword] = useState(false)
    const handlecheckbox=() =>{
        setshowpassword(!showpassword)
    }
    const login= () =>{
        console.log("ur email is : ",emailinput+" and your password is :",passwordinput)
    }

    const handlesubmit=(e) =>{
        e.preventDefault()
    }


    return (  

        

        <div id="container">
            <div id="presentationbox">
                <img id="loginimage" src="Sources/Images/loginimage.png" alt="loginpageimage"/>
                <h1 id="welcommessage">Welcome<br></br>back !</h1>
                <h3 id="presentationmessage">Your geteway to a rich repository of academic<br></br> articles spanning diverse fields</h3>
                <h3 id="accountmessage">Don't have an account yet?</h3>
                <Authcomponennts.Redirectbutton content={'Sign up'} page={'/Register'} handlebutton = {toRegister}/>
                <img id="logo" src="Sources/Images/logo.png" alt="logo"/>
            </div>
            <div id="logininfobox">
                <img id="textimage" src="Sources/Images/text.png" alt="text "/>
                <div id="infocontainer">
                    <form onSubmit={handlesubmit}>
                        <Authcomponennts.Emailinput email={emailinput} handlechange={handleemailchange}/>
                        <Authcomponennts.Passwordinput showpassword={showpassword} password={passwordinput} handlechange={handlpasswordchange}/>
                        <Authcomponennts.Checkbox content={"Show password"} check={showpassword} handlechange={handlecheckbox}/>
                        <Authcomponennts.Submitbutton content={'Log in'} submitfunction={login}/>
                    </form>
                </div>
                
            </div>
        </div>
    );
}
 
export default Login;