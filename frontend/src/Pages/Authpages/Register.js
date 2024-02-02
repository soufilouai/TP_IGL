import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Authcomponennts from "../../Components/AuthComponents";
import { RegisterRequest, Loginrequest } from "../../Services/Api";
import "../../Styles/Authpages/register.css";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const history = useHistory();

  const toLogin = (page) => {
    history.push(page);
  };

  const [usernameinput, setusernameinput] = useState("");
  const handleusernamechange = (username) => {
    setusernameinput(username);
  };

  const [emailinput, setemailinput] = useState("");
  const handleemailchange = (email) => {
    setemailinput(email);
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

  const register = async () => {
    console.log(
      "ur username is :",
      usernameinput +
      "ur email is : " +
      emailinput +
      " and your password is :",
      passwordinput
    );
    const response = await RegisterRequest(
      usernameinput,
      emailinput,
      passwordinput
    );
    const data = await response.json();

    if (response.status === 201) {
      console.log("u r registered ", data);
      const response2 = await Loginrequest(usernameinput, passwordinput);
      const data2 = await response2.json();

      if (response2.status === 200) {
        localStorage.setItem("token", JSON.stringify(data2.access));
        localStorage.setItem("refresh token", JSON.stringify(data2.refresh));

        // Redirect to the search page
        const decodedtoken= jwtDecode(data2.access);
            
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
        console.log("there's some err", data2);
        seterror(true);
        seterrormessage("Non existing account");
      }
    } else {
      console.log("there's some err", data);
      seterror(true);

      if ("email" in data && "username" in data) {
        if (emailinput === "") {
          seterrormessage(data.email);
        } else {
          if (usernameinput === "") {
            seterrormessage(data.username);
          } else {
            seterrormessage("This user already exists");
          }
        }
      }
      if ("email" in data && !("username" in data)) {
        if (data.email[0] === "custom user with this email already exists.") {
          seterrormessage("Already existing email");
        } else {
          seterrormessage(data.email);
        }
      }
      if (!("email" in data) && "username" in data) {
        seterrormessage("Already existing username");
      }
      if (!("email" in data) && !("username" in data) && "password" in data) {
        seterrormessage("Short password");
      }
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <body>
      <div id="Registercontainer">
        <div id="presentationbox">
          <img id="registerimage" src="Sources/Images/loginimage.png" alt="loginpageimage" />
          <h1 id="welcommessage">Start your<br></br>journey</h1>
          <h3 id="presentationmessage">Your geteway to a rich repository of academic<br></br>articles spanning diverse fields</h3>
          <h3 id="accountmessage">Already have an account?</h3>
          <Authcomponennts.Redirectbutton content={'Log in'} page={'/Login'} handlebutton={toLogin} />
          <img id="logo" src="Sources/Images/logo.png" alt="logo" />

        </div>
        <div id="registerinfobox">
          <img id="textimage" src="Sources/Images/text2.png" alt="text " />
          <div id="infocontainer">
            <form onSubmit={handlesubmit}>
              {error && <Authcomponennts.Errormessage content={errormessage} handleclosebutton={handleclosebutton} />}
              <Authcomponennts.Emailinput email={emailinput} handlechange={handleemailchange} />
              <Authcomponennts.Usernameinput username={usernameinput} handlechange={handleusernamechange} />
              <Authcomponennts.Passwordinput showpassword={showpassword} password={passwordinput} handlechange={handlpasswordchange} />
              <Authcomponennts.Checkbox content={"Show password"} check={showpassword} handlechange={handlecheckbox} />
              <Authcomponennts.Submitbutton content={'Get started'} submitfunction={register} />
            </form>
          </div>
        </div>
      </div>
    </body>

  );
}

export default Register;