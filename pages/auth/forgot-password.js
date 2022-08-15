import React, {useState, useRef} from 'react'
import Head from 'next/head'
import Input from '../../components/formElements/Input'
import style from '../../components/auth/forgotPassword.module.css'
import * as Validator from 'validatorjs'

function ForgotPassword() {

    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();

    const handleEmail = event => {
        setEmail(event.target.value);
        setEmailError("");
    }

    const handleForgotPassword = event => {
        event.preventDefault();
        // Form validation
        // Posting to the server
        let data = {
            email: email,
        };
          
        let rules = {
            email: 'required|email',
        };
          
        let validation = new Validator(data, rules);
          
        if(validation.fails()){
            if(validation.errors.get('email').length > 0)
                setEmailError(validation.errors.first('email'));

            return null;
        }

        //make the post request
    }

    return (
        <div className={style.container}>
            <Head>
                <title>Dkut Associates | Hostels, Rentals, Events, Products and Services</title>
                <meta 
                    name="description" 
                    content="
                        On this platform, dedan kimathi students find vacant hostels and other stuff they
                        need to make their lives more easier.
                    "
                />
                <meta name = "theme-color" content = "white" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className={style.logo}>
                    <img src="/icons/dkutAssociatesSmall.png" alt="Dkut associates logo" />
                </div>
                <h1 className={style.title}>Forgot password &#128542;</h1>
                <form className={style.form} onSubmit = { event => handleForgotPassword(event)}>
                    <div>
                        <label htmlFor="username">Email</label>
                        <span>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                handleChange = { event => handleEmail(event)}
                                required = {true}
                            />
                            <span className="error">{emailError}</span>
                        </span>
                    </div>
                    
                    <input type="submit" value = "SEND RESET EMAIL" />
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword