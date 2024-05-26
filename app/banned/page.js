"use client";

import axios from "axios";
import {useRouter} from "next/navigation";

export default function BannedPage  () {
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            localStorage.removeItem('user');
            router.push('/');
        } catch (error) {
            console.log(error.message)
        }
      };

    return(
        <div className="text-center pt-80">
            <h1>Jūsu konts ir bloķets</h1>
            <button className="Button" onClick={logout}>Atgriezties Galvēnā</button>
        </div>
    )
}