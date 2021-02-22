import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import axios from '../../../axios';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';

import AvatarImg from '../../../assets/images/avatar.svg';

import Button from '../../UI/Button/Button';

const Register = () => {
    let history = useHistory();

    // States
    const [currentProfilePic, setCurrentProfilePic] = useState(AvatarImg);
    const [imageFileObj, setImageFileObj] = useState({});

    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }); //textfields
    const [errors, setErrors] = useState({});

    const inputFile = useRef(null);

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

            setImageFileObj(profilePic); //save as file object
        } else {
            setCurrentProfilePic(AvatarImg);
            setImageFileObj({});
        }
    };

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // Form Handlers
    const signupFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(); //Needed to post files
        formData.append('profilePic', imageFileObj);
        Object.keys(values).forEach(function (key) {
            formData.append(key, values[key]);
        });

        axios
            .post('/auth/register', formData)
            .then(function (response) {
                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    console.log('success');
                    const userId = response.data.user.id;
                    history.push('/user/' + userId);
                }
            })
            .catch(function (error) {
                setErrors(error);
            });
    };

    return (
        <form className='sign-up-form' onSubmit={signupFormHandler} encType='multipart/form-data'>
            <h2 className='title'>Sign up</h2>
            <div className='avatar-info'>
                <img src={currentProfilePic} alt='Profile Pic' />
                <Button type='button' value='Change Image' classesArr={['small']} clickHandler={showInputDialog} />
                <input type='file' name='profilePic' id='profilePic' ref={inputFile} onChange={fileDialogChange} style={{ display: 'none' }} />
            </div>

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
                <FaceIcon />
                <input type='text' name='name' placeholder='Name' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <MailIcon />
                <input type='email' name='email' placeholder='Email' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='password' placeholder='Password' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={textInputHandler} />
            </div>
            <Button type='submit' value='Sign up' classesArr={['solid']} />
        </form>
    );
};

export default Register;
