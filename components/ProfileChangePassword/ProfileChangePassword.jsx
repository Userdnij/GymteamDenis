import { useState } from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import { isPasswordInvalid } from '@/util/validate';

export const ProfileChangePassword = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState('');

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            window.localStorage.removeItem('user');
            router.push('/login')
        } catch (error) {
            console.log(error.message)
        }
    };

    const changePassword = async () => {
        if(isPasswordInvalid(form.newPassword)) {
            setError(isPasswordInvalid(form.newPassword));
            return;
        }

        axios.post('/api/users/change/password', {
            email: JSON.parse(window.localStorage.getItem('user')).email,
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
        }).then((res) => {
            console.log(res.data);
            logout();
        }).catch((error) => {
            console.log(error)
            setError(error.response.data.error);
        });
    };

    return (
        <>
            <div className="sm:w-full sm:max-w-sm mt-5 mb-5 text-xl" style={ { color: 'red', fontWeight: '600' } }>
                {error}
            </div>
            <div>
                <p className="InputLabel">Veca parole</p>
                <input
                    className="Input w-80"
                    type="password"
                    value={form.oldPassword}
                    onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                />
            </div>
            <div className="mt-5">
                <p className="InputLabel">Jauna parole</p>
                <input
                    className="Input w-80"
                    type="password"
                    value={form.newPassword}
                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                />
            </div>

            <div className="mt-10">
                <button className="Button w-80" onClick={changePassword}>Apstiprināt</button>
            </div>
        </>
    );
}

export default ProfileChangePassword;