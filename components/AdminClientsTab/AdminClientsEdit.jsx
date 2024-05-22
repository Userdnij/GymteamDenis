import { useState, useEffect } from 'react';
import './AdminClientsTab.scss';
import axios from "axios";

export default function AdminClientsEdit({ user, handleSubmit }) {
    const [createForm, setCreateForm] = useState({});

    useEffect(() => {
        setCreateForm({
            vards: user.vards,
            uzvards: user.uzvards,
            email: user.email,
            role: user.role,
            talrunis: user.talrunis,
        })
    }, []);

    const editAbonement = async (abonement) => {
        console.log(abonement);
        axios.post('/api/users/edit', {
            _id: user._id,
            ...createForm
        })
            .then((res) => {
                console.log(res.data)
                handleSubmit(res.data.savedAbonement);
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleSubmitCreate = () => {
        editAbonement(createForm);
    }

    return (
        <div className="AdminClientsTab-CreateForm">
            <h1 className="text-3xl font-bold mb-10">Rediģēt Klientu</h1>
            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Vards</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.vards}
                    onChange={(e) => setCreateForm({ ...createForm, vards: e.target.value })}
                />
            </div>

            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Uzvards</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.uzvards}
                    onChange={(e) => setCreateForm({ ...createForm, uzvards: e.target.value })}
                />
            </div>

            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Epasts</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                />
            </div>

            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Tālrunis</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.talrunis}
                    onChange={(e) => setCreateForm({ ...createForm, talrunis: e.target.value })}
                />
            </div>

            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Role</p>
                <select
                    className="Input"
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="treneris">Treneris</option>
                </select>
            </div>

            <button style={ { marginTop: "20px"} } className="Button" onClick={handleSubmitCreate}>Apstiprināt</button>
        </div>
    );
}