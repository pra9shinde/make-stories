import React, { useState } from 'react';
import './Home.css';

import Nav from '../Nav/Nav';
import Button from '../UI/Button/Button';

import MailIcon from '@material-ui/icons/Mail';
import ProfileImg from '../../assets/images/test.jpg';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const Home = () => {
    const [showEditUser, setShowEditUser] = useState(false);

    const toggleUserModel = () => {
        setShowEditUser(!showEditUser);
    };

    return (
        <div>
            <Nav />
            <div className='home-banner-area'>
                <div className='spacer'>&nbsp;</div>

                {/* User Details Modal */}
                {showEditUser && (
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
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem architecto quas iure eius quis provident
                                    quam a modi ducimus vel, necessitatibus ab, consequuntur veritatis libero explicabo facilis iste officiis.
                                </p>
                                <Button type='button' value='Edit Details' classesArr={['solid']} id='sign-up-btn' clickHandler={toggleUserModel} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Button type='button' value='Edit Details' classesArr={['solid']} id='sign-up-btn' clickHandler={toggleUserModel} />

            <div className='social-section'>
                <div className='max-window'>
                    <div className='social-warp'>
                        <div className='social-links'>
                            <FacebookIcon />
                            <TwitterIcon />
                            <LinkedInIcon />
                            <GitHubIcon />
                        </div>

                        <h2>My Social Profiles</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
