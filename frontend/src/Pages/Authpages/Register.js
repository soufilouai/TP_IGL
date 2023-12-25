import React ,{ useState }from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



import Authcomponennts from "../../Components/AuthComponents";


import "../../Styles/Authpages/register.css"

const Register = () => {
    const history = useHistory()
    const toLogin = (page) =>{
        history.push(page)
    }
const [usernameinput,setusernameinput] = useState('')
const handleusernamechange=(username) =>{
    setusernameinput(username)
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
const register= () =>{
    console.log("ur username is :",usernameinput+"ur email is : ",emailinput+" and your password is :",passwordinput)
}

const handlesubmit=(e) =>{
    e.preventDefault()
}
    return ( 
        <div id="container">
            <div id="presentationbox">
                <img id="registerimage" src="Sources/Images/loginimage.png" alt="loginpageimage"/>
                <h1 id="welcommessage">Start your<br></br>journey</h1>
                <h3 id="presentationmessage">Your geteway to a rich repository of academic<br></br>articles spanning diverse fields</h3>
                <h3 id="accountmessage">Already have an account?</h3>
                <Authcomponennts.Redirectbutton content={'Log in'} page={'/Login'} handlebutton = {toLogin}/>
                <img id="logo" src="Sources/Images/logo.png" alt="logo"/>
                
            </div>
            <div id="registerinfobox">
            <img id="textimage" src="Sources/Images/text2.png" alt="text "/>
                <div id="infocontainer">
                    <form onSubmit={handlesubmit}>
                        <Authcomponennts.Usernameinput username={usernameinput} handlechange={handleusernamechange}/>
                        <Authcomponennts.Emailinput email={emailinput} handlechange={handleemailchange}/>
                        <Authcomponennts.Passwordinput showpassword={showpassword} password={passwordinput} handlechange={handlpasswordchange}/>
                        <Authcomponennts.Checkbox content={"Show password"} check={showpassword} handlechange={handlecheckbox}/>
                        <Authcomponennts.Submitbutton content={'Get started'} submitfunction={register}/>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Register;