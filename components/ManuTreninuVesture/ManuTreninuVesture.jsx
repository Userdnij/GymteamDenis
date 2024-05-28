import axios from 'axios';
import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import './ManuTreninuVesture.scss';

export default function ManuTreninuVesture() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        axios.get(`/api/trainings/get?client=${user._id}&history=true`)
            .then(res => {
                console.log(res.data);
                setTrainings(res.data.trainings);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="ManuTreninuVesture">
            <table className="ManuTreninuVesture-Table">
                <thead className="ManuTreninuVesture-Header">
                    <tr>
                        <th >Datums</th>
                        <th >Sākums</th>
                        <th >Beigums</th>
                        <th >Trenera vārds</th>
                        <th >Uzvārds</th>
                        <th >E-pasts</th>
                        <th >Telefons</th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.length > 0 && trainings.map(training => (
                        <tr key={training._id}>
                            <td >{training.date}</td>
                            <td >{training.startTime}</td>
                            <td >{training.endTime}</td>
                            <td >{training.trener?.vards}</td>
                            <td >{training.trener?.uzvards}</td>
                            <td >{training.trener?.email}</td>
                            <td >{training.trener?.talrunis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}