import { useEffect, useState } from 'react';
import './Abonementi.scss';
import QRCode from "react-qr-code";
import AbonementExtendModal from '../AbonementExtendModal/AbonementExtendModal';

export const Abonementi = () => {
    // const [user, setUser] = useState();
    const user = JSON.parse(localStorage.getItem('user'))
    const [qr, setQr] = useState({
        email: user?.email,
        date: new Date(),
        abonement: user?.abonement?.name,
        abonement_id: user?.abonement?._id,
        abonement_payed_until: user?.abonement_payed_until,
    })
    const [isAbonementExtendModalOpen, setIsAbonementExtendModalOpen] = useState(false);

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     setUser(user)
    // }, [])

    const renderDate = () => {
        if (!user.abonement_payed_until) return 'nav';

        const date = (new Date(user.abonement_payed_until)).toISOString().slice(0, 10);
        return date;
    }

    const refreshQr = () => {
        console.log(qr)
        setQr({
            ...qr,
            date: new Date(),
        })
    }

    const renderQr = () => {
        if (!user.abonement_payed_until) return null;

        return (
            <div className="Abonementi-QR">
                <button className='Button h-12' onClick={refreshQr}>Atjaunināt</button>
                <QRCode value={JSON.stringify(qr)} />
                <p className='text-3xl'>QR kods darbojas 5 minūtes, tad tas ir jāatjaunina</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="Abonementi">
            <AbonementExtendModal open={isAbonementExtendModalOpen} setOpen={setIsAbonementExtendModalOpen} abonement={user.abonement} userId={user._id}/>
            <div className="Abonementi-Info">
                <p>Mans abonements: {user.abonement?.name || 'nav'}</p>
                <p>Apmaksāts līdz: { renderDate() }</p>
                {user?.abonement?.name && <button className="Button mt-2" onClick={() => setIsAbonementExtendModalOpen(true)}>Pagarināt abonementu</button>}
            </div>

            { renderQr() }
        </div>
    );
}

export default Abonementi;