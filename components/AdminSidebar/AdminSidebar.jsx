import Link from 'next/link';
import './AdminSidebar.scss';

export default function AdminSidebar({ tab, setTab}) {
    const handleTabChange = (index) => {
        setTab(index);
    };

    const handleBack = () => {
        window.location.href = '/home';
    }

    return (
        <>
        <div className="AdminSidebar-Wrapper"/>
        <div className="AdminSidebar">
            <div className="AdminSidebar-Title">
                <h1>Admin Panel</h1>
            </div>

            <p className={`AdminSidebar-Link ${tab === 0 ? 'AdminSidebar-Link_selected' : ''}`} onClick={() => handleTabChange(0)}>Abonementi</p>
            <p className={`AdminSidebar-Link ${tab === 1 ? 'AdminSidebar-Link_selected' : ''}`} onClick={() => handleTabChange(1)}>Klienti</p>
            <p className={`AdminSidebar-Link ${tab === 2 ? 'AdminSidebar-Link_selected' : ''}`} onClick={() => handleTabChange(2)}>Jaunumi</p>
            <p className={`AdminSidebar-Link ${tab === 3 ? 'AdminSidebar-Link_selected' : ''}`} onClick={() => handleTabChange(3)}>Zīņojumi</p>
            <button style={{ position: "absolute", bottom: "10%", backgroundColor: "pink", color: "black"}} className="Button px-10 w-60 h-16" onClick={handleBack}><Link href="/home">Atpakaļ</Link></button>

        </div>
        </>
    );
}