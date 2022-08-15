import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Input from '../../components/formElements/Input'
import Submit from '../../components/formElements/Submit'
import style from '../../components/auth/signup.module.css'
import * as Validator from 'validatorjs'
import {useRouter} from 'next/router'
import axios from 'axios'

function Signup(props) {

    const [username, setUsername] = useState();
    const [usernameError, setUsernameError] = useState();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const [formError, setFormError] = useState("")

    const router = useRouter();

    const handleUsername = event => {
        setUsername(event.target.value);
        setUsernameError("");
        setFormError("");
    }

    const handleEmail = event => {
        setEmail(event.target.value);
        setEmailError("");
        setFormError("");
    }

    const handlePassword = event => {
        setPassword(event.target.value);
        setPasswordError("");
        setConfirmPasswordError("");
        setFormError("");
    }

    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value);
        setPasswordError("");
        setConfirmPasswordError("");
        setFormError("");
    }

    const checkPassword = inputtxt => { 
        let paswd= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        
        
        if( inputtxt && inputtxt.search(paswd) !== -1/*.value.match(paswd)*/ ){ 
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

    const handleSignup = event => {
        setFormError("")
        event.preventDefault();
        // Form validation
        // Posting to the server
        let data = {
            username: username,
            email: email,
        };
          
        let rules = {
            username: 'required|string',
            email: 'required|email',
        };
          
        let validation = new Validator(data, rules);
          
        if(validation.fails()){
            if(validation.errors.get('username').length > 0)
                setUsernameError(validation.errors.first('username'));
            if(validation.errors.get('email').length > 0)
                setEmailError(validation.errors.first('email'));

            return null;
        }

        // validation.passes()
        if(checkPassword(password)){
            if(password !== confirmPassword){
                setConfirmPasswordError("Not similar");
                return null;
            }

            //make the post request;
            axios({
                url:props.server + '/api/auth/local/register',
                method:'post',
                data:{
                    username:username,
                    email:email,
                    password:password,
                }
            })
            .then(res=>{
                props.setAuthorization(res.data);
                router.replace({
                    pathname:"/admin"
                })  
                return null;
            })
            .catch(error =>{
                //loadingAnimation.current.style.zIndex = '-1';
                //console.log(error.response.data);
                setFormError("Something went wrong");
                console.log(error.response);
                /*if (error.response.data.message[0]){
                    if(error.response.data.message[0].messages[0].message === "Email is already taken."){
                        setEmailError(error.response.data.message[0].messages[0].message);
                    } else if (error.response.data.message[0].messages[0].message === "Username already taken"){
                        setUsernameError(error.response.data.message[0].messages[0].message);
                    }
                }*/
                return error;
            })
        }
    }

    useEffect(()=>{
        if(router){
            router.prefetch("/admin");
        }
    }, [router])
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
                <h1 className={style.title}>Become an Associate &#129297;</h1>
                <form className={style.form} onSubmit = { event => handleSignup(event)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <span>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                handleChange = { event => handleUsername(event)}
                                required={true}
                                value={username}
                            />
                            <span className="error">{usernameError}</span>
                        </span>
                        

                        <label htmlFor="email">Email</label>
                        <span>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                handleChange = { event => handleEmail(event)}
                                required={true}
                                value={email}
                            />
                            <span className="error">{emailError}</span>
                        </span>

                        <label htmlFor="password">Password</label>
                        <span>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                handleChange = { event => handlePassword(event)}
                                handleBlur = { event => handlePasswordBlur(event)}
                                required={true}
                                value={password}
                                
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
                                value={confirmPassword}
                            />
                            <span className="error">{confirmPasswordError}</span>
                        </span>
                    </div>
                    
                    <Submit value={"CREATE ACCOUNT"} />
                    <span className="error">{formError}</span>
                </form>

                <p className={style.supportText}>Already an associate? <Link href="/auth/login"><a>Login</a></Link></p>
            </div>
        </div>
    )
}

export default Signup