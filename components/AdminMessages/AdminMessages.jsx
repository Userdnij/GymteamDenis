import { useState, useEffect } from 'react';
import AdminSearch from '@/components/AdminSearch/AdminSearch';
import './AdminMessages.scss';
import axios from "axios";
import AdminNewsEdit from './AdminNewsEdit';
// import AdminClientsEdit from './AdminClientsEdit';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [search, setSearch] = useState("");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const getUsers = async () => {
        axios.get('/api/messages/get')
            .then((res) => {
                console.log(res.data.messages)
                setMessages(res.data.messages);
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleDelete = (id) => {
        axios.post('/api/messages/delete', {
            _id: id
        })
            .then((res) => {
                setSelectedItem({});
                console.log(res.data)
                getUsers();
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
    }, [search]);

    const handleSelectUser = (user) => {
        setIsCreateOpen(false);
        setSelectedItem(user);
    }

    const handleSubmit = () => {
        setSelectedItem({});
        setIsCreateOpen(false);
        getUsers();
    }

    const renderMessages = () => {
        if (!messages) {
            return null;
        }

        return (
            <div className="AdminClientsTab-Abonementi">
                {messages.map((item) => (
                    <div className={`AdminClientsTab-AbonementCard ${selectedItem._id === item._id ? 'AdminClientsTab-AbonementCard_selected' : ''}`} key={item._id} onClick={ () => handleSelectUser(item) }>
                        <p className="AdminClientsTab-AbonementCardTitle">{item.title}</p>
                        <div style={ { display: 'flex', flexDirection: 'row' } }>
                            <div className='flex'>
                                <p className="AdminClientsTab-AbonementCardPrice font-semibold">{item.email}</p>
                                <p className="AdminClientsTab-AbonementCardPrice">&nbsp; Datums: {formatDate(item.date)}</p>
                            </div>

                            {!item.answered && <p className="ml-auto mr-20 text-xl text-red-500 font-semibold">Nav atbildēts</p>}
                            <svg style={ { width: "50px", position: "absolute", top: "50%", transform: "translateY(-50%)", right: "20px" } } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb uo axo"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleAnswered = (abonement) => {
        axios.post('/api/messages/setAnswered', {
            _id: abonement._id
        })
            .then((res) => {
                console.log(res.data)
                setSelectedItem({});
                getUsers();
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleCreate = () => {
        setSelectedItem({});
        setIsCreateOpen(true)
    }

    return (
        <div className="AdminClientsTab">
            <div className="AdminClientsTab-Main">
                <AdminSearch search={search} setSearch={setSearch} />

                <div className="AdminClientsTab-Title">
                    <h1>Zīņojumi</h1>
                </div>

                { renderMessages() }
            </div>

            <div className="AdminClientsTab-RightTab">
                { isCreateOpen ? (
                    <AdminNewsEdit item={ selectedItem } handleSubmit={ handleSubmit } />
                ) : ( selectedItem._id ? (
                    <div className="AdminClientsTab-SelectedItem w-8/12">
                        <div className="AdminClientsTab-SelectedItemInfo">
                            <div className="AdminClientsTab-SelectedItemTitle mb-5">
                                <h1 className="font-semibold text-4xl">{selectedItem.title}</h1>
                            </div>
                            <div className="AdminClientsTab-SelectedItemContent font-medium text-2xl">
                                <p className='mb-5'>Epasts: {selectedItem.email}</p>

                                <p>Zīņojums: {selectedItem.message}</p>
                            </div>
                            <p className='mt-5'>Vārds: {selectedItem.name}</p>
                            <p>Uzvārds: {selectedItem.surname}</p>
                            <p>Datums: {formatDate(selectedItem.date)}</p>

                        </div>
                        <div className="w-full mt-10">
                            {!selectedItem.answered && <button className="Button w-full mb-5" onClick={() => handleAnswered(selectedItem)}>Atzīmet kā atbildēts</button>}
                            <button className="Button w-full mb-5" onClick={() => handleDelete(selectedItem._id)}>Delete</button>
                        </div>
                    </div>
                ) : (
                    <></>
                ))}
            </div>
        </div>
    );
}