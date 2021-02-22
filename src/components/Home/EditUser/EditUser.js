import React, { useRef, useState } from 'react';
import './EditUser.css';

import Button from '../../UI/Button/Button';

import ProfileImg from '../../../assets/images/test.jpg';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';

const EditUser = ({ clickHandler }) => {
    const [currentProfilePic, setCurrentProfilePic] = useState(ProfileImg);

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
        } else {
            setCurrentProfilePic(ProfileImg);
        }
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
                    <form className='update-user-form'>
                        <input type='file' name='profilePic' ref={inputFile} onChange={fileDialogChange} style={{ display: 'none' }} />

                        <h2 className='title'>Edit Details</h2>
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
                            <input type='password' name='password' placeholder='Change Password' />
                        </div>
                        <div className='input-field'>
                            <EnhancedEncryptionIcon />
                            <input type='password' name='password' placeholder='Confirm Password' />
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
