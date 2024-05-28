import { useState, useEffect } from 'react';
import './AdminNewsTab.scss';
import axios from "axios";

export default function AdminNewsEdit({ item, handleSubmit }) {
    const [createForm, setCreateForm] = useState({});

    useEffect(() => {
        setCreateForm({
            title: item.title,
            text: item.text,
        })
        console.log(item)
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const editAbonement = async () => {
        axios.post('/api/news/edit', {
            _id: item._id,
            ...createForm
        })
            .then((res) => {
                console.log(res.data)
                handleSubmit();
            }).catch((err) => {
                console.log(err);
            })
    };

    const createAbonement = async () => {
        axios.post('/api/news/create', {
            ...createForm
        })
            .then((res) => {
                console.log(res.data)
                handleSubmit();
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleSubmitCreate = () => {
        if (!item._id) {
            createAbonement();
        } else {
            editAbonement();    
        }
    }

    return (
        <div className="AdminClientsTab-CreateForm">
            <h1 className="text-3xl font-bold mb-10">{!item._id ? 'Izveidot Jaunumu' : 'Rediģēt Jaunumu'}</h1>
            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Nosaukums</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.title}
                    onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                />

                <br />

                {item._id && (
                    <>
                        <p className="InputLabel">Datums</p>
                        <p className="InputLabel">{formatDate(item.date)}</p>
                    </>
                )}
            </div>

            <div className="AdminClientsTab-CreateFormItem">
                <p className="InputLabel">Teksts</p>
                <textarea
                    className="Input"
                    value={createForm.text}
                    onChange={(e) => setCreateForm({ ...createForm, text: e.target.value })}
                    style={{height:"500px"}}
                />
            </div>

            <button style={ { marginTop: "20px"} } className="Button" onClick={handleSubmitCreate}>Apstiprināt</button>
        </div>
    );
}