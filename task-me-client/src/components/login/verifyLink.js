import React from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";

const VerifyLink = () => {
    let history = useHistory();
    let {token} = useParams();
    const verify = () => {
        axios.post('http://localhost:5500/auth/email-activate', {
            token: token
        }).then((response => {
            history.push('/');
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