import { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import { isEmailInvalid } from '@/util/validate';

export const ProfileChangeInfo = ({ user }) => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: user.email,
        vards: user.vards,
        uzvards: user.uzvards,
        talrunis: user.talrunis,
    });
    const [error, setError] = useState('');

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            localStorage.removeItem('user');
            router.push('/login')
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        setForm({
            email: user.email,
            vards: user.vards,
            uzvards: user.uzvards,
            talrunis: user.talrunis,
        });
    }, [user]);

    const updateInfo = async () => {
        const requiredFields = Object.keys(form);
        for (const field of requiredFields) {
            if (!form[field]) {
                if (field === 'email') {
                    setError("Epasts ir obligāts");
                    return;
                }

                setError(`${field.charAt(0).toUpperCase() + field.slice(1)} ir obligāts`);
                return;
            }
        }

        if (isEmailInvalid(form.email)) {
            setError(isEmailInvalid(form.email));
            return;
        }

        axios.post('/api/users/change/info', {
            oldEmail: JSON.parse(localStorage.getItem('user')).email,
            newEmail: form.email,
            vards: form.vards,
            uzvards: form.uzvards,
            talrunis: form.talrunis,
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
              <p className="InputLabel">Epasts</p>
              <input
                  className="Input w-80"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
          </div>
          <div className="mt-5">
              <p className="InputLabel">Vards</p>
              <input
                  className="Input w-80"
                  type="text"
                  value={form.vards}
                  onChange={(e) => setForm({ ...form, vards: e.target.value })}
              />
          </div>
          <div className="mt-5">
              <p className="InputLabel">Uzvards</p>
              <input
                  className="Input w-80"
                  type="text"
                  value={form.uzvards}
                  onChange={(e) => setForm({ ...form, uzvards: e.target.value })}
              />
          </div>
          <div className="mt-5">
              <p className="InputLabel">Tālrunis</p>
              <input
                  className="Input w-80"
                  type="text"
                  value={form.talrunis}
                  onChange={(e) => setForm({ ...form, talrunis: e.target.value })}
              />
          </div>

          <div className="mt-10">
              <button className="Button w-80" onClick={updateInfo}>Apstiprināt</button>
          </div>
      </>
    );
  }

export default ProfileChangeInfo;