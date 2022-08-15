import React, {useState, useRef} from 'react'
import Head from 'next/head'
import Input from '../../components/formElements/Input'
import style from '../../components/auth/resetPassword.module.css'
import * as Validator from 'validatorjs'

function ResetPassword() {

    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();

    const handlePassword = event => {
        setPassword(event.target.value);
        setPasswordError("");
        setConfirmPasswordError("");
    }

    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value);
        setPasswordError("");
        setConfirmPasswordError("");
    }

    const checkPassword = inputtxt => { 
        let paswd= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        
        if( inputtxt.search(paswd) !== -1/*.value.match(paswd)*/ ){ 
            /*alert('Correct, try another...');*/
            return true;
        } else { 
            console.log("Errored");
            setPasswordError("Password should have 8 to 15 characters, at least one lowercase letter, one uppercase letter, one numeric digit and one special character");
            /*alert('Wrong...!')*/
            return false;
        }
    }  

    const handlePasswordBlur = event => {
        checkPassword(password);
    }

    const handleResetPassword = event => {
        event.preventDefault();

        if(checkPassword(password)){
            if(password !== confirmPassword){
                setConfirmPasswordError("Not similar");
                return null;
            }

            //make the post request;
        }
    }
    return (
        <div className={style.container}>
            <Head>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />
                
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
                <h1 className={style.title}>Reset password &#129488;</h1>
                <form className={style.form} onSubmit = { event => handleResetPassword(event)}>
                    <div>
                        <label htmlFor="password">New Password</label>
                        <span>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                handleChange = { event => handlePassword(event)}
                                handleBlur = { event => handlePasswordBlur(event)}
                                required={true}
                            />
                            <span className="error">{passwordError}</span>
                        </span>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <span>
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                handleChange = { event => handleConfirmPassword(event)}
                                required={true}
                            />
                            <span className="error">{confirmPasswordError}</span>
                        </span>
                    </div>
                    <input type="submit" value = "RESET PASSWORD" />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword