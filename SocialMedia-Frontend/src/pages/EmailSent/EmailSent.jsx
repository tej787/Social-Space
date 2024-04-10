import React, { useEffect, useState } from 'react'
import Logo from "../../img/logo.png";
import Email from "../../img/open-mail.png"
import { useParams } from "react-router-dom";



import './EmailSent.css'



function EmailSent() {
    const params = useParams();
    useEffect(() => {
        document.title = 'Social Space || Forgot Password';
      }, []);
    return (
        <div className="Auth">
            <div className="a-left" style={{cursor:'pointer'}} onClick={() => { window.location.href = '/auth' }}>
                <img src={Logo} alt=" Site Logo" />
                <div className="Webname">
                    <h1>Social Scape</h1>
                    <h6>Welcome to Social Scape, where every idea fits right in!</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm">
                    <img style={{ height: '140px', width: '140px' }} src={Email} alt="Email Icon" />
                    <h3 style={{ textAlign: 'center', marginBottom: '0px' }}>Email has been sent successfully!!</h3>
                    <h5 style={{ textAlign: 'center', marginTop: '0px' }}>You'll receive further instructions at <span style={{ color: 'blue' }}>{params.email}</span>. <br />Click the button below to open your mailbox</h5>


                    <div>

                        <button
                            className="button infoButton"
                            style={{ width: '150px' }}
                            onClick={() => window.open('https://mail.google.com', '_blank')}
                        >
                            Open MailBox
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "column", marginTop: '25px' }}>
                        <h5 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px' }}>Didn't receive the email?</h5>
                        <h5 style={{ textAlign: 'center', marginTop: '0px' }}>
                            <span style={{ color: 'blue'  ,cursor:'pointer'}} onClick={() => { window.location.href = '/forgotPassword' }}>
                                Click here to resend
                            </span>
                        </h5>

                    </div>
                </form>
            </div>
        </div>

    );
}
export default EmailSent