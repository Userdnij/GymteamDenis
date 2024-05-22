import { useState, useEffect } from 'react';
import AdminSearch from '@/components/AdminSearch/AdminSearch';
import './AdminNewsTab.scss';
import axios from "axios";
import AdminNewsEdit from './AdminNewsEdit';
// import AdminClientsEdit from './AdminClientsEdit';

export default function AdminNewsTab() {
    const [news, setNews] = useState([]);
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
        axios.get('/api/news/get')
            .then((res) => {
                console.log(res.data.news)
                setNews(res.data.news);
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleDelete = (id) => {
        axios.post('/api/news/delete', {
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

    const renderNews = () => {
        if (!news) {
            return null;
        }

        return (
            <div className="AdminClientsTab-Abonementi">
                {news.map((item) => (
                    <div className={`AdminClientsTab-AbonementCard ${selectedItem._id === item._id ? 'AdminClientsTab-AbonementCard_selected' : ''}`} key={item._id} onClick={ () => handleSelectUser(item) }>
                        <p className="AdminClientsTab-AbonementCardTitle">{item.title}</p>
                        <div style={ { display: 'flex', flexDirection: 'row' } }>
                            <p className="AdminClientsTab-AbonementCardPrice">{item.email}</p>
                            <p className="AdminClientsTab-AbonementCardPrice">&nbsp; Datums: {formatDate(item.date)}</p>
                            <svg style={ { width: "50px", position: "absolute", top: "50%", transform: "translateY(-50%)", right: "20px" } } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb uo axo"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleEdit = (abonement) => {
        setSelectedItem(abonement);
        setIsCreateOpen(true);
    }

    const handleCreate = () => {
        setSelectedItem({});
        setIsCreateOpen(true)
    }

    const renderNewsText = (text) => {
        return text.replace(/\n/g, '<br />');
    }

    return (
        <div className="AdminClientsTab">
            <div className="AdminClientsTab-Main">
                <AdminSearch search={search} setSearch={setSearch} />

                <div className="AdminClientsTab-Title">
                    <h1>Jaunumi</h1>
                    <button className="Button" onClick={handleCreate}>Izveidot</button>
                </div>

                { renderNews() }
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
                            <div className="AdminClientsTab-SelectedItemContent font-medium text-xl">
                                <p>Datums: {formatDate(selectedItem.date)}</p>
                                <p>Teksts:</p>
                                <p dangerouslySetInnerHTML={{ __html: renderNewsText(selectedItem.text) }} />
                            </div>
                        </div>
                        <div className="w-full mt-10">
                            <button className="Button w-full mb-5" onClick={() => handleDelete(selectedItem._id)}>Delete</button>
                            <button className="Button w-full mb-5" onClick={() => handleEdit(selectedItem)}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <></>
                ))}
            </div>
        </div>
    );
}