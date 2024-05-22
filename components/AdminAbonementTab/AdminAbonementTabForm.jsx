import { useState, useEffect } from 'react';
import './AdminAbonementTab.scss';
import axios from "axios";

export default function AdminAbonementTabForm({ handleSubmit, abonementToEdit }) {
    const [paramsCount, setParamsCount] = useState(1);
    const [createForm, setCreateForm] = useState({
        name: '',
        price: 0,
        term: 0,
        parameters: ['']
    });

    useEffect(() => {
        if (paramsCount < createForm.parameters.length) {
            setCreateForm({
                ...createForm,
                parameters: createForm.parameters.slice(0, paramsCount)
            });
        }
    }, [paramsCount]);

    useEffect(() => {
        if (abonementToEdit?._id) {
            setCreateForm({
                ...abonementToEdit,
                price: parseFloat(abonementToEdit.price.$numberDecimal)
            });
            setParamsCount(abonementToEdit.parameters.length);
        }
    }, []);

    const createAbonement = async (abonement) => {
        console.log(abonement);
        axios.post('/api/abonementi/create', {
            name: abonement.name,
            price: parseFloat(abonement.price),
            term: abonement.term,
            parameters: abonement.parameters
        })
            .then((res) => {
                console.log(res.data)
                handleSubmit(res.data.savedAbonement);
            }).catch((err) => {
                console.log(err);
            })
    };

    const editAbonement = async (abonement) => {
        console.log(abonement);
        axios.post('/api/abonementi/edit', {
            _id: abonementToEdit._id,
            name: abonement.name,
            price: parseFloat(abonement.price),
            term: abonement.term,
            parameters: abonement.parameters
        })
            .then((res) => {
                console.log(res.data)
                handleSubmit(res.data.savedAbonement);
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleSubmitCreate = () => {
        if (abonementToEdit?._id) {
            editAbonement(createForm);
        } else {
            createAbonement(createForm);
        }
    }

    return (
        <div className="AdminAbonementTab-CreateForm">
            <h1 className="text-3xl font-bold mb-10">{abonementToEdit?._id ? 'Rediģēt Abonementu' : 'Izveidot Abonementu'}</h1>
            <div className="AdminAbonementTab-CreateFormItem">
                <p className="InputLabel">Nosaukums</p>
                <input
                    className="Input"
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                />
            </div>

            <div className="AdminAbonementTab-CreateFormItem">
                <p className="InputLabel">Cena</p>
                <input
                    className="Input"
                    type="number"
                    value={createForm.price}
                    onChange={(e) => setCreateForm({ ...createForm, price: e.target.value })}
                />
            </div>

            <div className="AdminAbonementTab-CreateFormItem">
                <p className="InputLabel">Min. term. (mēneši)</p>
                <input
                    className="Input"
                    type="number"
                    value={createForm.term}
                    onChange={(e) => setCreateForm({ ...createForm, term: e.target.value })}
                />
            </div>

            <div className="AdminAbonementTab-CreateFormItem">
                <div style={ { display: "flex" } }>
                    <p className="InputLabel">Parametri</p>
                    <button style={ { marginLeft: "10px" } } className="ButtonCircle" onClick={ () => setParamsCount(Math.min(paramsCount + 1, 20)) }>+</button>
                    <button style={ { marginLeft: "10px" } }  className="ButtonCircle" onClick={ () => setParamsCount(Math.max(paramsCount - 1, 1)) }>-</button>
                </div>
                {Array.from({ length: paramsCount }).map((_, index) => (
                    <input
                        key={index}
                        className="Input"
                        type="text"
                        style={ { marginBottom: "10px"}}
                        value={createForm.parameters[index]}
                        onChange={(e) => {
                            const updatedParameters = [...createForm.parameters];
                            updatedParameters[index] = e.target.value;
                            setCreateForm({ ...createForm, parameters: updatedParameters });
                        }}
                    />
                ))}

                <button style={ { marginTop: "20px"} } className="Button" onClick={handleSubmitCreate}>Apstiprināt</button>
            </div>
        </div>
    );
}