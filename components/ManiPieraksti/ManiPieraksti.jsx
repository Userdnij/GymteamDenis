import axios from 'axios';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import './ManiPieraksti.scss';

export default function ManiPieraksti() {
    const [trainings, setTrainings] = useState([]);
    const user = JSON.parse(window.localStorage.getItem('user'));

    useEffect(() => {
        fetchTrainings();

    }, []);

    const fetchTrainings = () => {
        axios.get(`/api/trainings/get?client=${user?._id}`)
        .then(res => {
            console.log(res.data);
            setTrainings(res.data.trainings);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleUnsubscribe = (id) => {
        axios.post('/api/trainings/unsubscribe', {
            trainingId: id,
        }).then(res => {
            console.log(res.data)
            fetchTrainings();
        }).catch(err => {
            console.log(err)
        })
    }

    const renderButton = (id, trainingDate, trainingStartTime) => {
        const now = new Date();
        const trainingStart = new Date(`${trainingDate}T${trainingStartTime}:00`);

        const diff = trainingStart.getTime() - now.getTime();

        const hoursLeft = diff / 1000 / 60 / 60;

        if (hoursLeft < 24) {
            return <div  />
        }

        return <button className="Button" onClick={() => handleUnsubscribe(id)}>Atteikties</button>;
    }
    return (
        <div className="ManiPieraksti">
            <table className="ManiPieraksti-Table">
                <thead className="ManiPieraksti-Header">
                    <tr>
                        <th >Datums</th>
                        <th >Sākums</th>
                        <th >Beigums</th>
                        <th >Trenera vārds</th>
                        <th >Uzvārds</th>
                        <th >E-pasts</th>
                        <th >Telefons</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.length > 0 && trainings.map(training => (
                        <tr key={training._id}>
                            <td >{training.date}</td>
                            <td >{training.startTime}</td>
                            <td >{training.endTime}</td>
                            <td >{training.trener.vards}</td>
                            <td >{training.trener.uzvards}</td>
                            <td >{training.trener.email}</td>
                            <td >{training.trener.talrunis}</td>
                            <td >
                                {renderButton(training._id, training.date, training.startTime)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}