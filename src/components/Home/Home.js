import React, { useState } from 'react';
import './Home.css';

import Nav from '../Nav/Nav';
import ShowUser from './ShowUser/ShowUser';
import EditUser from './EditUser/EditUser';

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
        <>
            <Nav />
            <div className='home-banner-area'>
                <div className='spacer'>&nbsp;</div>

                {/* User Details Modal */}
                {showEditUser ? <EditUser clickHandler={toggleUserModel} /> : <ShowUser clickHandler={toggleUserModel} />}
            </div>

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
        </>
    );
};

export default Home;
