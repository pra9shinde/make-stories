import React, { useRef, useState } from 'react';
import './EditUser.css';
import axios from '../../../axios';

import Button from '../../UI/Button/Button';

import ProfileImg from '../../../assets/images/test.jpg';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';

const EditUser = ({ clickHandler }) => {
    const [currentProfilePic, setCurrentProfilePic] = useState(ProfileImg);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }); //textfields
    const [errors, setErrors] = useState({});
    const [imageFileObj, setImageFileObj] = useState({});

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
            setCurrentProfilePic(ProfileImg);
            setImageFileObj({});
        }
    };

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const updateFormHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(); //Needed to post files
        formData.append('profilePic', imageFileObj);
        formData.append('id', '6033eabcea3b9d2b502718ce'); //Dynamic Id from state

        Object.keys(values).forEach(function (key) {
            formData.append(key, values[key]);
        });

        axios
            .post('/user/updateUser', formData)
            .then(function (response) {
                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                setErrors(error);
            });
    };

    return (
        <div className='user-content'>
            <div className='user-details'>
                <div className='user-picture edit-user'>
                    <img src={currentProfilePic} alt='' className='user-image' />
                    <div className='overlay'>
                        <Button type='submit' value='Change' classesArr={['small', 'overlay-btn', 'transparent']} clickHandler={showInputDialog} />
                    </div>
                </div>
                <div className='user-data'>
                    <form className='update-user-form' onSubmit={updateFormHandler} encType='multipart/form-data'>
                        <input type='file' name='profilePic' ref={inputFile} onChange={fileDialogChange} style={{ display: 'none' }} />

                        <h2 className='title'>Edit Details</h2>

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
                            <FaceIcon />
                            <input type='text' name='name' placeholder='Name' onChange={textInputHandler} />
                        </div>
                        <div className='input-field'>
                            <MailIcon />
                            <input type='email' name='email' placeholder='Email' onChange={textInputHandler} />
                        </div>
                        <div className='input-field'>
                            <LockIcon />
                            <input type='password' name='password' placeholder='Change Password' onChange={textInputHandler} />
                        </div>
                        <div className='input-field'>
                            <EnhancedEncryptionIcon />
                            <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={textInputHandler} />
                        </div>
                        <div className='user-btns'>
                            <Button type='button' value='Back' classesArr={['solid']} clickHandler={clickHandler} />
                            <Button type='submit' value='Update' classesArr={['solid']} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
