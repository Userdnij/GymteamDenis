"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import './ProfilePage.scss';
import Profile from "@/components/Profile/Profile";
import MansGrafiks from "@/components/MansGrafiks/MansGrafiks";
import ManiPieraksti from "@/components/ManiPieraksti/ManiPieraksti";
import ManuTreninuVesture from "@/components/ManuTreninuVesture/ManuTreninuVesture";
import Abonementi from "@/components/Abonementi/Abonementi";
import axios from "axios";

const TABS = {
    0: <Profile />,
    1: <Abonementi />,
    2: <ManiPieraksti />,
    3: <ManuTreninuVesture />,
    4: <MansGrafiks />,
}

export default function ProfilePage() {
    const [tab, setTab] = useState(0)
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        axios.get('/api/users/getById?id=' + user._id)
            .then((res) => {
                console.log(res.data)
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    return(
        <>
            <Header />
            <div className="ProfilePage">
                <div className="ProfilePage-Sidebar min-w-72 w-2/12 max-w-96">
                    <h1 className="font-semibold text-2xl mb-10">Account</h1>
                    <ul>
                        <li className={`ProfilePage-SidebarLink ${tab === 0 ? 'ProfilePage-SidebarLink_selected' : ''}`} onClick={() => setTab(0)}>Profile</li>
                        <li className={`ProfilePage-SidebarLink ${tab === 1 ? 'ProfilePage-SidebarLink_selected' : ''}`} onClick={() => setTab(1)}>Abonementi</li>
                        <li className={`ProfilePage-SidebarLink ${tab === 2 ? 'ProfilePage-SidebarLink_selected' : ''}`} onClick={() => setTab(2)}>Mani pieraksti</li>
                        <li className={`ProfilePage-SidebarLink ${tab === 2 ? 'ProfilePage-SidebarLink_selected' : ''}`} onClick={() => setTab(3)}>Manu treniņu vēsture</li>
                        {user.role === 'treneris' && <li className={`ProfilePage-SidebarLink ${tab === 3 ? 'ProfilePage-SidebarLink_selected' : ''}`} onClick={() => setTab(4)}>Mans grafiks</li>}
                    </ul>
                </div>

                <div className="ProfilePage-Content w-full">
                    {TABS[tab]}
                </div>
            </div>
        </>
    )
}