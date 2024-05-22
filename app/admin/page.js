"use client";

import './Admin.scss';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import AdminAbonementTab from '@/components/AdminAbonementTab/AdminAbonementTab';
import AdminClientsTab from '@/components/AdminClientsTab/AdminClientsTab';
import AdminNewsTab from '@/components/AdminNewsTab/AdminNewsTab';
import AdminMessages from '@/components/AdminMessages/AdminMessages';

const TABS = {
    0: <AdminAbonementTab />,
    1: <AdminClientsTab />,
    2: <AdminNewsTab />,
    3: <AdminMessages />,
}

export default function Admin() {
    const [tab, setTab] = useState(0);

    return (
        <div className="Admin">
            <div className="Admin-SideBar">
                <AdminSidebar tab={tab} setTab={setTab} />
            </div>
            <div className="Admin-Content">
                {TABS[tab]}
            </div>
        </div>
    );
}