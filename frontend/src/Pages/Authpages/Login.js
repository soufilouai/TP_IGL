import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Authcomponennts from "../../Components/AuthComponents";
import { Loginrequest } from "../../Services/Api";
import "../../Styles/Authpages/login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const history = useHistory();
    const toRegister = (page) => {
        history.push(page);
    };

    const [usernameinput, setusernameinput] = useState("");
    const handleusernamechange = (username) => {
        setusernameinput(username);
    };

    const [passwordinput, setpasswordinput] = useState("");
    const handlpasswordchange = (password) => {
        setpasswordinput(password);
    };

    const [showpassword, setshowpassword] = useState(false);
    const handlecheckbox = () => {
        setshowpassword(!showpassword);
    };

    const [error, seterror] = useState(false);
    const [errormessage, seterrormessage] = useState("Error message");
    const handleclosebutton = () => {
        seterror(false);
    };

    const login = async () => {
        console.log("ur username is : ", usernameinput + " and your password is :", passwordinput);
        const response = await Loginrequest(usernameinput, passwordinput);
        const data = await response.json();
        
        if (response.status === 200) {
            localStorage.setItem("token", JSON.stringify(data.access));
            localStorage.setItem("refresh token", JSON.stringify(data.refresh));
            const decodedtoken= jwtDecode(data.access);
            // Redirect to the search page
            if(decodedtoken.is_admin){
                history.push({
                    pathname: "/SearchAdmin",
                    state: { username: usernameinput },
                });
            }else{
                if(decodedtoken.is_moderator){
                    history.push({
                    pathname: "/Search",
                    state: { username: usernameinput },
                });
            }else{
                history.push({
                pathname: "/Search",
                state: { username: usernameinput },
                });
            }
        }
        } else {
            console.log("there's some err", data);
            seterror(true);

            if (!("username" in data) && !("password" in data)) {
                seterrormessage("Non existing account");
            }
            if ("username" in data) {
                seterrormessage(data.username);
            }
            if (!("username" in data) && "password" in data) {
                seterrormessage(data.password);
            }
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
    };


    return (
        <body>
            <div id="Logincontainer">
                <div id="presentationbox">
                    <img id="loginimage" src="Sources/Images/loginimage.png" alt="loginpageimage" />
                    <h1 id="welcommessage">Welcome<br></br>back !</h1>
                    <h3 id="presentationmessage">Your geteway to a rich repository of academic<br></br> articles spanning diverse fields</h3>
                    <h3 id="accountmessage">Don't have an account yet?</h3>
                    <Authcomponennts.Redirectbutton content={'Sign up'} page={'/Register'} handlebutton={toRegister} />
                    <img id="logo" src="Sources/Images/logo.png" alt="logo" />
                </div>
                <div id="logininfobox">
                    <img id="textimage" src="Sources/Images/text.png" alt="text " />
                    <div id="infocontainer">
                        <form onSubmit={handlesubmit}>
                            {error && <Authcomponennts.Errormessage content={errormessage} handleclosebutton={handleclosebutton} />}
                            <Authcomponennts.Usernameinput username={usernameinput} handlechange={handleusernamechange} />
                            <Authcomponennts.Passwordinput showpassword={showpassword} password={passwordinput} handlechange={handlpasswordchange} />
                            <Authcomponennts.Checkbox content={"Show password"} check={showpassword} handlechange={handlecheckbox} />
                            <Authcomponennts.Submitbutton content={'Log in'} submitfunction={login} />
                        </form>
                    </div>
                </div>
            </div>
        </body>

    );
}

export default Login;