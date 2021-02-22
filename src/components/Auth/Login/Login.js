import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from '../../../axios';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

// Compnents
import Button from '../../UI/Button/Button';

const Login = () => {
    let history = useHistory();

    const [values, setValues] = useState({
        username: '',
        password: '',
    }); //textfields
    const [errors, setErrors] = useState({});

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const loginFormHandler = (e) => {
        e.preventDefault();

        axios
            .post('/auth/login', values)
            .then(function (response) {
                console.log(response);

                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    const userId = response.data.user.id;
                    history.push('/user/' + userId);
                }
            })
            .catch(function (error) {
                setErrors(error);
            });
    };

    return (
        <form className='sign-in-form' onSubmit={loginFormHandler}>
            <h2 className='title'>Sign in</h2>

            {Object.keys(errors).length > 0 && (
                <div className='form__errors'>
                    <ul className='errors-ul'>
                        {Object.values(errors).map((value, i) => (
                            <li key={i}>*{value}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className='input-field'>
                <PersonIcon />
                <input type='text' name='username' placeholder='Username' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='password' placeholder='Password' onChange={textInputHandler} />
            </div>

            <Button type='submit' value='Login' classesArr={['solid']} />

            <p className='social-text'>Or Sign in with social platforms</p>
            <div className='social-media'>
                <a href='#' className='social-icon'>
                    <FacebookIcon />
                </a>
                <a href='#' className='social-icon'>
                    <TwitterIcon />
                </a>
                <a href='#' className='social-icon'>
                    <LinkedInIcon />
                </a>
                <a href='#' className='social-icon'>
                    <GitHubIcon />
                </a>
            </div>
        </form>
    );
};

export default Login;
