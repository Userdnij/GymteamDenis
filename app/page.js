"use client"

import axios from "axios";
import './home.scss';
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [abonements, setAbonements] = useState([]);

  const getAbonements = async () => {
    axios.get('/api/abonementi/get')
        .then((res) => {
            setAbonements(res.data);
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        })
};

useEffect(() => {
    getAbonements();
}, []);

  const renderAbonements = () => {
    return (
        <div className="flex-col mt-30">
            <h1 className="text-center text-3xl font-bold">Piejami abonementu plāni:</h1>
            <div className="Home-Abonements-Abonementi grid-cols-3 mt-20 mb-20">
                {abonements.map((abonement) => (
                    <div class="relative bg-white shadow-md rounded-sm border border-gray-200" key={abonement._id}>
                    <div class="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500" aria-hidden="true"></div>
                    <div class="px-5 pt-5 pb-6 border-b border-gray-200">
                        <header class="flex items-center mb-2">
                            <div class="w-6 h-6 rounded-full flex-shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3">
                                <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                                </svg>
                            </div>
                            <h3 class="text-lg text-gray-800 font-semibold">{abonement.name}</h3>
                        </header>
                        <div class="text-lg mb-2">Min. termiņš: <span className="font-bold">{abonement.term} mēneši</span></div>
                        <div class="text-gray-800 font-bold mb-4">
                            <span class="text-2xl">€</span><span class="text-3xl" x-text="annual ? '74' : '79'">{abonement.price.$numberDecimal}</span><span class="text-gray-500 font-medium text-sm">/mo</span>
                        </div>
                        <Link href="/login" class="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white w-full"> Abonēt</Link>
                    </div>
                    <div class="px-5 pt-4 pb-5">
                        <div class="text-xs text-gray-800 font-semibold uppercase mb-4">Apraksts</div>
                        <ul>
                            {abonement.parameters.map((parameter) => (
                                <li class="flex items-center py-1" key={parameter}>
                                    <svg class="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2" viewBox="0 0 12 12">
                                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                    </svg>
                                    <div class="text-sm">{parameter}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

  return (
    <div className="Home">
      <HomeHeader />
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{marginTop: "100px"}}>
          <h1 className="text-4xl font-bold">Laipni lūdzam GymTeam!</h1>
          <p className="text-3xl mt-5">Jūsu veselība un labsajūta ir mūsu galvenais mērķis!</p>

          <p className="text-2xl mt-5">GymTeam ir moderns fitnesa centrs,</p>
          <p className="text-2xl">kurā ikviens atradīs kaut ko sev tīkamu.</p>
          <p className="text-2xl">Mēs piedāvājam plašu pakalpojumu</p>
          <p className="text-2xl">un programmu klāstu gan iesācējiem,</p>
          <p className="text-2xl">gan pieredzējušiem sportistiem.</p>
        </div>
        <div className="LOGO">
        </div>
      </div>

      <div className="Home-Abonements" style={{marginTop: "100px"}}>
        { renderAbonements() }
      </div>

    </div>
  );
}