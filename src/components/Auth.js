import React, {  useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";


import signInImage from "../assets/signup.jpg";

const cookies = new Cookies()

const initialStateForm = {
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avatarURL:''
}

const Auth = () => {
    const [form, setForm] = useState(initialStateForm);
  const [isSignup, setIsSignup] = useState(true);


  const handleChange = (e) =>{
      setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    // setForm(initialStateForm)

const {username,password,phoneNumber,avatarURL} = form;

const URL = 'https://chat-react-web.herokuapp.com/auth';


    const {data:{token,userId,hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username,password,fullName:form.fullName,phoneNumber,avatarURL
    })
    
    cookies.set('token',token);
    cookies.set('username',username);
    cookies.set('fullName',fullName);
    cookies.set('userId',userId);

    if(isSignup){
      cookies.set('phoneNumber',phoneNumber);
      cookies.set('avatarURL',avatarURL);
      cookies.set('hashedPassword',hashedPassword);
  
    }

    window.location.reload();

}

  const switchMode = ()=>{
      setIsSignup((prev)=> !prev)
  }


  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
             <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">Username</label>
                <input
                id="username"
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (<>

              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                id="avatarURL"
                  type="text"
                  name="avatarURL"
                  placeholder="avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
              </>
              
            )}
               <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Password</label>
                <input
                id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (
                   <div className="auth__form-container_fields-content_input">
                   <label htmlFor="confirmPassword">Confirm password</label>
                   <input
                   id="confirmPassword"
                     name="confirmPassword"
                     type="password"
                     placeholder="Confirm password"
                     onChange={handleChange}
                     required
                   />
                 </div>
              )}

              <div className="auth__form-container_fields-content_button">
                <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button> 
              </div>
          </form>
          <div className="auth__form-container_fields-account">
                <p>{isSignup
                ?'Already have an account?'
                : "Don't have an account?"
            }
            <span onClick={switchMode}>
                {isSignup ? '  Sign In' : ' Sign Up'}
                </span></p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
          <img src={signInImage} alt="avatar" />
      </div>
    </div>
  );
};

export default Auth;
