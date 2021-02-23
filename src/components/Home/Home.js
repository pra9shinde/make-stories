import React, { useState, useEffect } from 'react';
import './Home.css';

import Nav from '../Nav/Nav';
import ShowUser from './ShowUser/ShowUser';
import EditUser from './EditUser/EditUser';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import axios from '../../axios';

// Redux
import { useSelector } from 'react-redux'; //redux

const Home = () => {
    // Access Redux State
    const auth = useSelector((state) => state);

    const [showEditUser, setShowEditUser] = useState(false);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        id: '',
        name: '',
        profilePic: '',
        username: '',
    });

    const toggleUserModel = () => {
        setShowEditUser(!showEditUser);
    };

    useEffect(() => {
        // effect
        axios
            .post(`/user/${auth.user.id}`, { token: auth.token })
            .then(function (response) {
                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    setValues({ ...values, ...response.data.user });
                }
            })
            .catch(function (error) {
                console.log('Home UseEffect');

                setErrors({ ...errors, failure: error.message });
            });
    }, [auth]);

    return (
        <>
            <Nav />

            <div className='home-banner-area'>
                <div className='spacer'>&nbsp;</div>

                {Object.keys(errors).length > 0 && (
                    <div className='form__errors'>
                        <ul className='errors-ul'>
                            {Object.values(errors).map((value, i) => (
                                <li key={i}>*{value}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* User Details Modal */}
                {showEditUser ? <EditUser user={values} clickHandler={toggleUserModel} /> : <ShowUser user={values} clickHandler={toggleUserModel} />}
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
