import React from 'react';

import ProfileImg from '../../../assets/images/test.jpg';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';

import Button from '../../UI/Button/Button';

const ShowUser = ({ clickHandler }) => {
    return (
        <div className='user-content'>
            <div className='user-details'>
                <div className='user-picture'>
                    <img src={ProfileImg} alt='' className='user-image' />
                </div>
                <div className='user-data'>
                    <h2>Pranav Shinde</h2>

                    <div className='email-address'>
                        <MailIcon fontSize='large' />
                        <h3>pranav@alacritylabs.com</h3>
                    </div>

                    <div className='email-address'>
                        <FaceIcon fontSize='large' />
                        <h3>pra9shinde</h3>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem architecto quas iure eius quis provident quam a modi
                        ducimus vel, necessitatibus ab, consequuntur veritatis libero explicabo facilis iste officiis.
                    </p>
                    <Button type='button' value='Edit Details' classesArr={['solid']} id='sign-up-btn' clickHandler={clickHandler} />
                </div>
            </div>
        </div>
    );
};

export default ShowUser;
