import { useState, useEffect } from 'react';
import AdminSearch from '@/components/AdminSearch/AdminSearch';
import './AdminClientsTab.scss';
import axios from "axios";
import AdminClientsEdit from './AdminClientsEdit';

export default function AdminClientsTab() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedUserTrainings, setSelectedUserTrainings] = useState([]);

    const getUsers = async () => {
        axios.get('/api/users/getAll?search=' + search)
            .then((res) => {
                setUsers(res.data.users);
            }).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
    }, [search]);

    const handleSelectUser = (user) => {
        setIsCreateOpen(false);
        setSelectedUser(user);

        fetchSelectedUserTrainings(user)
    }

    const fetchSelectedUserTrainings = (user) => {
        const s = user.role === 'user' ? 'client' : 'trener';

        axios.get(`/api/trainings/get?${s}=${user._id}`)
            .then((res) => {
                console.log(res.data)
                setSelectedUserTrainings(res.data.trainings)
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleSubmitEdit = () => {
        setIsCreateOpen(false);
        getUsers();
    }

    const handleAtcelt = (training) => {
        if (selectedUser.role === 'user') {
            axios.post('/api/trainings/unsubscribe', {
                trainingId: training._id,
            }).then(res => {
                console.log(res.data)
                fetchSelectedUserTrainings(selectedUser);
            }).catch(err => {
                console.log(err)
            })
        } else {
            axios.post('/api/trainings/delete', {
                trainingId: training._id,
            }).then(res => {
                console.log(res.data)
                fetchSelectedUserTrainings(selectedUser);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const renderUsers = () => {
        if (!users) {
            return null;
        }

        return (
            <div className="AdminClientsTab-Abonementi">
                {users.map((user) => (
                    <div className={`AdminClientsTab-AbonementCard ${selectedUser._id === user._id ? 'AdminClientsTab-AbonementCard_selected' : ''}`} key={user._id} onClick={ () => handleSelectUser(user) }>
                        <p className="AdminClientsTab-AbonementCardTitle">{user.vards + ' ' + user.uzvards}</p>
                        <div style={ { display: 'flex', flexDirection: 'row' } }>
                            <p className="AdminClientsTab-AbonementCardPrice">{user.email}</p>
                            <p className="AdminClientsTab-AbonementCardPrice">&nbsp; Loma: {user.role}</p>
                            {user.is_locked ? <p className="AdminClientsTab-AbonementCardPrice bg-red-400 pl-5 pr-5 ml-20">Bloķēts</p> : null}
                            <svg style={ { width: "50px", position: "absolute", top: "50%", transform: "translateY(-50%)", right: "20px" } } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb uo axo"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderTraining = (training) => {
        if (selectedUser.role === 'user') {
            return (
                <div className="AdminClientsTab-TrainingCard" key={training._id}>
                    <div>
                        <p className="AdminClientsTab-TrainingCardTitle">{training.trener.vards + ' ' + training.trener.uzvards}</p>
                        <p className="AdminClientsTab-TrainingCardPrice">{training.date + ' ' + training.startTime}</p>
                    </div>

                    <button className="Button h-1/2 w-1/2" onClick={() => handleAtcelt(training)}>Atcelt un atgriezt naudu</button>
                </div>
            )
        }

        if (selectedUser.role === 'treneris') {
            const client = training.client ? training.client.vards + ' ' + training.client.uzvards : 'Brīvs';
            return (
                <div className="AdminClientsTab-TrainingCard" key={training._id}>
                    <div>
                        <p className="AdminClientsTab-TrainingCardTitle">{client}</p>
                        <p className="AdminClientsTab-TrainingCardPrice">{training.date + ' ' + training.startTime}</p>
                    </div>

                    <button className="Button h-1/2 w-1/2" onClick={() => handleAtcelt(training)}>{client === 'Brīvs' ? 'Atcelt' : 'Atcelt un atgriezt naudu'}</button>
                </div>
            )
        }

        return null;
    }

    const renderTrainings = () => {
        if (!selectedUser || !selectedUserTrainings) {
            return null;
        }

        return (
            <div className="AdminClientsTab-Trainings">
                <h1 className="text-center text-3xl font-bold mb-5 mt-5">Treniņi</h1>
                {selectedUserTrainings.map((training) => (
                    renderTraining(training)
                ))}
            </div>
        );
    }

    const handleEdit = (abonement) => {
        setSelectedUser(abonement);
        setIsCreateOpen(true);
    }

    const handleLock = () => {
        axios.post('/api/users/change/locked', {
            email: selectedUser.email,
        }).then(res => {
            console.log(res.data)
            setSelectedUser({});
            setSelectedUserTrainings([])
            getUsers();
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="AdminClientsTab">
            <div className="AdminClientsTab-Main">
                <AdminSearch search={search} setSearch={setSearch} />

                <div className="AdminClientsTab-Title">
                    <h1>Klienti</h1>
                </div>

                { renderUsers() }
            </div>

            <div className="AdminClientsTab-RightTab">
                { isCreateOpen ? (
                    <AdminClientsEdit user={ selectedUser } handleSubmit={ handleSubmitEdit } />
                ) : ( selectedUser._id ? (
                    <div className="AdminClientsTab-SelectedItem w-8/12">
                        <div className="AdminClientsTab-SelectedItemInfo">
                            <div className="AdminClientsTab-SelectedItemTitle mb-5">
                                <h1 className="font-semibold text-4xl">{selectedUser.vards +' ' + selectedUser.uzvards}</h1>
                            </div>
                            <div className="AdminClientsTab-SelectedItemContent font-medium text-xl">
                                <p>Epasts: {selectedUser.email}</p>
                                <p>Loma: {selectedUser.role}</p>
                                <p>Tālrunis: {selectedUser.talrunis}</p>
                            </div>
                        </div>
                        <div className="w-full mt-10">
                            {/* <button className="Button w-full mb-5" onClick={() => handleDelete(selectedUser._id)}>Delete</button> */}
                            <button className="Button w-full mb-5" onClick={handleLock}>{selectedUser.is_locked ? 'Unban' : 'Ban'}</button>
                            <button className="Button w-full" onClick={() => handleEdit(selectedUser)}>Edit</button>
                        </div>

                        { renderTrainings() }
                    </div>
                ) : (
                    <></>
                ))}
            </div>
        </div>
    );
}