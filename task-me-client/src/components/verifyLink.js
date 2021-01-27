import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const VerifyLink = () => {
    let { token } = useParams();
    //impliment axios req here 
    const verify = () => {
        axios.post('http://localhost:5500/auth/email-activate', {
            token: token
        }).then((response => {
            console.log(JSON.stringify(response.data));
        }))
    }
    return (
        <div className="verifyComponent">
            <h1>thank you for joining us!</h1>
            <h3>please press the button to create your account</h3>
            <button onClick={verify}>Click Me</button>
        </div>
    )
}
export default VerifyLink;