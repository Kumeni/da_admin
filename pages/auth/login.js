import React, {useState, useRef,  useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Input from '../../components/formElements/Input'
import style from '../../components/auth/login.module.css'
import * as Validator from 'validatorjs'
import axios from 'axios'
import { useRouter} from 'next/router'

function Login(props) {

    const [identifier, setIdentifier] = useState();
    const [identifierError, setIdentifierError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [formError, setFormError] = useState();

    const router = useRouter();

    const handleIdentifier = event => {
        setIdentifier(event.target.value);
        setIdentifierError("");
        setFormError("");
    }

    const handlePassword = event => {
        setPassword(event.target.value);
        setPasswordError("");
        setFormError("");
    }

    const handleLogin = event => {
        setFormError("");
        //Form validation
        //Loging in

        event.preventDefault();
        // Form validation
        // Posting to the server
        let data = {
            identifier: identifier,
            password: password,
        };
          
        let rules = {
            identifier: 'required|string',
            password: 'required',
        };
          
        let validation = new Validator(data, rules);
          
        if(validation.fails()){
            if(validation.errors.get('identifier').length > 0)
                setIdentifierError(validation.errors.first('identifier'));
            if(validation.errors.get('password').length > 0)
                setPasswordError(validation.errors.first('password'));

            return null;
        }

        //make post request
        axios({
            url:props.server + '/api/auth/local',
            method:'post',
            data:{
                identifier:identifier,
                password:password
            }
        })
        .then(res => {
            if(res.status == 200 && res.statusText === 'OK'){
                props.setAuthorization(res.data);
                router.replace({
                    pathname:"/admin"
                })  
            }
        })
        .catch(err => {
            setFormError('Invalid email/username or password');
            //loadingAnimation.current.style.zIndex = '-1';
            console.log(err);
        })
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
                <h1 className={style.title}>Welcome back &#128540;</h1>
                <form className={style.form} onSubmit = { event => handleLogin(event)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <span>
                            <Input 
                                type="text"
                                id="email"
                                name="email"
                                handleChange = { event => handleIdentifier(event) }
                                value={identifier}
                            />
                            <span className="error">{identifierError}</span>
                        </span>
                        <label htmlFor="password">Password</label>
                        <span>
                            <Input 
                                type="password"
                                id="password"
                                name="password"
                                handleChange = { event => handlePassword(event) }
                                value={password}
                            />
                            <span className="error">{passwordError}</span>
                        </span>
                    </div>
                    <input type="submit" value = "LOGIN" />
                    <span className="error">{formError}</span>
                </form>

                <p className={style.supportText}>Not an associate yet? <Link href="/auth/signup"><a>Create an account</a></Link></p>
                <p className={style.supportText2}><Link href="/auth/forgot-password"><a>Forgot password?</a></Link></p>
            </div>
        </div>
    )
}

export default Login