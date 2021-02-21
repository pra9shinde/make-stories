import React, { useState, useRef } from 'react';
import './Auth.css';

// Icons
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';

import LoginImg from '../../assets/images/login.svg';
import RegisterImg from '../../assets/images/register.svg';
import AvatarImg from '../../assets/images/avatar.svg';

// Compnents
import Button from '../UI/Button/Button';

const Auth = () => {
    const [showSignUp, setSignUp] = useState(false);
    const [currentProfilePic, setCurrentProfilePic] = useState(AvatarImg);

    const inputFile = useRef(null);

    const toggleSignup = () => {
        setSignUp(!showSignUp);
    };

    const showInputDialog = () => {
        inputFile.current.click();
    };

    const fileDialogChange = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            // change src of profilePic
            const profilePic = files[0];

            var oFReader = new FileReader();
            oFReader.readAsDataURL(profilePic);
            oFReader.onload = function (oFREvent) {
                setCurrentProfilePic(oFREvent.target.result);
            };
        } else {
            setCurrentProfilePic(AvatarImg);
        }
    };

    return (
        <div className={`container ${showSignUp ? 'sign-up-mode' : ''}`}>
            <div className='forms-container'>
                <div className='sigin-signup'>
                    <form className='sign-in-form'>
                        <h2 className='title'>Sign in</h2>
                        <div className='input-field'>
                            <PersonIcon />
                            <input type='text' name='username' placeholder='Username' />
                        </div>
                        <div className='input-field'>
                            <LockIcon />
                            <input type='password' name='password' placeholder='Password' />
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

                    <form className='sign-up-form'>
                        <h2 className='title'>Sign up</h2>
                        <div className='avatar-info'>
                            <img src={currentProfilePic} alt='Profile Pic' />
                            <Button type='button' value='Change Image' classesArr={['small']} clickHandler={showInputDialog} />
                            <input type='file' name='profilePic' ref={inputFile} onChange={fileDialogChange} style={{ display: 'none' }} />
                        </div>
                        <div className='input-field'>
                            <PersonIcon />
                            <input type='text' name='username' placeholder='Username' />
                        </div>
                        <div className='input-field'>
                            <FaceIcon />
                            <input type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='input-field'>
                            <MailIcon />
                            <input type='email' name='email' placeholder='Email' />
                        </div>
                        <div className='input-field'>
                            <LockIcon />
                            <input type='password' name='password' placeholder='Password' />
                        </div>
                        <Button type='submit' value='Sign up' classesArr={['solid']} />
                    </form>
                </div>
            </div>

            <div className='panels-container'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New here?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam odio eligendi quisquam?</p>
                        <Button type='button' value='Sign up' classesArr={['transparent']} id='sign-up-btn' clickHandler={toggleSignup} />
                    </div>

                    <img src={LoginImg} alt='Login' className='image' />
                </div>

                <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam odio eligendi quisquam?</p>
                        <Button type='button' value='Sign in' classesArr={['transparent']} id='sign-in-btn' clickHandler={toggleSignup} />
                    </div>

                    <img src={RegisterImg} alt='Login' className='image' />
                </div>
            </div>
        </div>
    );
};

export default Auth;
