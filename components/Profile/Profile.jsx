import { useEffect, useState } from 'react';
import './Profile.scss';
import ProfileChangePassword from '../ProfileChangePassword/ProfileChangePassword';
import ProfileChangeInfo from '../ProfileChangeInfo/ProfileChangeInfo';

export const Profile = () => {
    const [user, setUser] = useState({});
    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isChangeInfoActive, setIsChangeInfoActive] = useState(false);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        console.log(user);
        setUser(user);
    }, []);

    const handleChangePasswordActive = () => {
        setIsChangeInfoActive(false);
        setIsChangePasswordActive(!isChangePasswordActive);
    }

    const handleChangeInfoActive = () => {
        setIsChangePasswordActive(false);
        setIsChangeInfoActive(!isChangeInfoActive);
    }

    return (
        <div className="Profile">
            <div className="Profile-Info">
                <h1 className="texthey-3xl font-semibold mb-10">Mana informacija</h1>
                {user?._id && (
                    <div className="text-lg">
                        <p>ID: {user._id}</p>
                        <p>Epasts: {user.email}</p>
                        <p>Vards: {user.vards}</p>
                        <p>Uzvards: {user.uzvards}</p>
                        <p>Tālrunis: {user.talrunis}</p>
                        {user.role !== 'user' && (
                            <p>Role: {user.role}</p>
                        )}
                    </div>
                )}

                <div className="mt-5">
                    <button className="Button mr-5" onClick={handleChangeInfoActive}>Mainīt personālo informāciju</button>
                    <button className="Button" onClick={handleChangePasswordActive}>Mainīt parole</button>
                </div>
            </div>

            <div className={`Profile-Change ${isChangePasswordActive && 'Profile-Change_isActive'} mt-5`}>
                <ProfileChangePassword />
            </div>

            <div className={`Profile-Change ${isChangeInfoActive && 'Profile-Change_isActive'} mt-5`}>
                <ProfileChangeInfo user={user} />
            </div>
        </div>
    );
}

export default Profile;