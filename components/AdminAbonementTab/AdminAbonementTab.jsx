import { useState, useEffect } from 'react';
import AdminSearch from '@/components/AdminSearch/AdminSearch';
import './AdminAbonementTab.scss';
import axios from "axios";
import AdminAbonementTabForm from './AdminAbonementTabForm';

export default function AdminAbonementTab() {
    const [abonements, setAbonements] = useState([]);
    const [selectedAbonement, setSelectedAbonement] = useState({});
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [search, setSearch] = useState("");

    const getAbonements = async () => {
        axios.get('/api/abonementi/get?search=' + search)
            .then((res) => {
                setAbonements(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        getAbonements();
    }, []);

    useEffect(() => {
        getAbonements();
    }, [search]);

    const handleSelectAbonement = (abonement) => {
        setIsCreateOpen(false);
        setSelectedAbonement(abonement);
    }

    const handleCreate = () => {
        setSelectedAbonement({});
        setIsCreateOpen(true);
    }

    const renderAbonements = () => {
        return (
            <div className="AdminAbonementTab-Abonementi">
                {abonements.map((abonement) => (
                    <div className={`AdminAbonementTab-AbonementCard ${selectedAbonement._id === abonement._id ? 'AdminAbonementTab-AbonementCard_selected' : ''}`} key={abonement._id} onClick={ () => handleSelectAbonement(abonement) }>
                        <p className="AdminAbonementTab-AbonementCardTitle">{abonement.name}</p>
                        <div style={ { display: 'flex', flexDirection: 'row' } }>
                            <p className="AdminAbonementTab-AbonementCardPrice">€{abonement.price.$numberDecimal}</p>
                            <p className="AdminAbonementTab-AbonementCardPrice">&nbsp; Min. termiņš: {abonement.term}</p>
                            <svg style={ { width: "50px", position: "absolute", top: "50%", transform: "translateY(-50%)", right: "20px" } } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb uo axo"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleSubmitCreate = (savedAbonement) => {
        getAbonements();
        setIsCreateOpen(false);
        setSelectedAbonement(savedAbonement)
    }

    const handleDelete = (id) => {
        axios.post('/api/abonementi/delete', {
            _id: id
        })
            .then((res) => {
                console.log(res.data)
                getAbonements();
                setSelectedAbonement({});
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleEdit = (abonement) => {
        setSelectedAbonement(abonement);
        setIsCreateOpen(true);
    }

    return (
        <div className="AdminAbonementTab">
            <div className="AdminAbonementTab-Main">
                <AdminSearch search={search} setSearch={setSearch} />

                <div className="AdminAbonementTab-Title">
                    <h1>Abonementi</h1>
                    <button className="Button" onClick={handleCreate}>Izveidot</button>
                </div>

                { renderAbonements() }
            </div>

            <div className="AdminAbonementTab-RightTab">
                { isCreateOpen ? (
                    <AdminAbonementTabForm handleSubmit={handleSubmitCreate} abonementToEdit={selectedAbonement} />
                ) : ( selectedAbonement._id ? (
                    <div className="AdminAbonementTab-SelectedItem w-8/12">
                        <div className="AdminAbonementTab-SelectedItemInfo">
                            <div className="AdminAbonementTab-SelectedItemTitle mb-5">
                                <h1 className="font-semibold text-4xl">Name: {selectedAbonement.name}</h1>
                            </div>
                            <div className="AdminAbonementTab-SelectedItemContent font-medium text-xl">
                                <p>Cena: €{selectedAbonement.price.$numberDecimal}</p>
                                <p>Min. termiņš: {selectedAbonement.term} mēneši</p>
                                <p>Apraksts: </p>
                                <ul>
                                    {selectedAbonement.parameters.map((param, index) => (
                                        <li className="ml-10 list-disc" key={index}>&nbsp;&nbsp;{param}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full mt-10">
                            <button className="Button w-full mb-5" onClick={() => handleDelete(selectedAbonement._id)}>Delete</button>
                            <button className="Button w-full" onClick={() => handleEdit(selectedAbonement)}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <></>
                ))}
            </div>
        </div>
    );
}