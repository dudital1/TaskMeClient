import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useState } from "react";

const Home = () => {
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [nameReg, setNameReg] = useState("");

    const [emailLog, setEmailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    const register = () => {
        axios.post('http://localhost:5500/auth/signup', {
            email: emailReg,
            password: passwordReg,
            name: nameReg,
        }).then((response => {
            console.log(JSON.stringify(response));
        }))
    }
    const signIn = () => {
        axios.post('http://localhost:5500/auth/sign-in', {
            email: emailLog,
            password: passwordLog,
        }).then((response => {
            console.log(JSON.stringify(response));
        }))
    }

    const responseSuccessGoogle = (response) => {
        axios({
            method: "POST",
            url: "http://localhost:5500/auth/googlelogin",
            data: { tokenId: response.tokenId }
        }).then(response => {
            console.log(JSON.stringify(response.data));
        })
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }
    return (
        <div className="App">
            <div className="registration">
                <h1>Registeration</h1>
                <label>Email:</label>
                <input type="text"
                    onChange={(e) => {
                        setEmailReg(e.target.value)
                    }}></input>
                <label>Password</label>
                <input type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value)
                    }}></input>
                <label>Name:</label>
                <input type="text"
                    onChange={(e) => {
                        setNameReg(e.target.value)
                    }}></input>
                <button onClick={register}>Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <label>Email:</label>
                <input type="text" placeholder="Email..." 
                        onChange={(e) => {
                        setEmailLog(e.target.value)
                    }} />
                <label>password:</label>
                <input type="text" placeholder="Password..." 
                        onChange={(e) => {
                        setPasswordLog(e.target.value)
                    }}/>
                <button onClick={signIn}>login</button>
            </div>
            <h1>login with google</h1>
            <GoogleLogin
                clientId="797191547152-h2lf9jrigv5bmc3rv4cic2ph3vr42m45.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Home;