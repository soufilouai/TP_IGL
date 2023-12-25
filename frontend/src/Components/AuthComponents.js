import React from "react";

const Redirectbutton = ({content,page,handlebutton}) => {
    return (
          <button className="redirectbutton" onClick={()=>{
              handlebutton(page)
            }}>
            {content}
          </button>
      );
}
 
const Usernameinput=({username,handlechange}) =>{
  return(
    <div>
      <label id="usernamelabel">Username</label>
      <input className="usernameinput" type="text"  required value={username} onChange={(e) => handlechange(e.target.value)}>
      </input>
    </div>
  )
}

const  Emailinput= ({email,handlechange}) => {
  return ( 
    <div>
      <label id="emaillabel">E-mail</label>
      <input className="emailinput" type="text"  required value={email} onChange={(e) => handlechange(e.target.value)}>
      </input>
    </div>
   );
}
const Passwordinput= ({showpassword,password,handlechange}) =>{
  return(
    <div>
      <label id="passwordlabel">Password</label>
      <input className="passwordinput" type={showpassword ? "text":"password"} required value={password} onChange={(e) => handlechange(e.target.value)}>
      </input>
    </div>
  )
}
const Checkbox=({content,check,handlechange}) =>{
  return(
    <div>
      <label id="checkboxlabel">
        <input type="checkbox" className="checkbox" checked={check} onChange={handlechange}>
        </input>
        {content}
      </label>
    </div>
    
  )
}
const Submitbutton=({content,submitfunction}) =>{

  return(
    <button className="submitbutton" onClick={() =>{
      submitfunction()
    }}>
      {content}
    </button>
  )
}
const Authcomponennts = {
  Redirectbutton,
  Usernameinput,
  Emailinput,
  Passwordinput,
  Submitbutton,
  Checkbox,
}

export default Authcomponennts;


  
