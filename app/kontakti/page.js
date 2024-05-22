"use client";

import { MdOutlineMailOutline } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from "@/components/Header/Header";
import './Kontakti.scss';
import { useState } from "react";
import axios from "axios";

export default function Kontakti() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSend = () => {
        axios.post("/api/messages/create", {
            name: name,
            surname: surname,
            email: email,
            text: message,
        }).then((res) => {
            setName("");
            setSurname("");
            setEmail("");
            setMessage("");
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const renderSend = () => {
        const isAllFilled = name !== "" && surname !== "" && email !== "" && message !== "";
        const isDisabled = !isAllFilled || !validateEmail(email);

        return (
            <>
                { isAllFilled && !validateEmail(email) && <p className="text-red-500 text-xl mt-5">Epasts nav pareizs</p>}
                <button
                    className={isDisabled ? "ButtonDisabled" : "Button"}
                    style={{width: "80%", marginTop: "30px"}}
                    disabled={isDisabled}
                    onClick={handleSend}
                >
                    Nosūtīt
                </button>
            </>

        )
    }

    return (
        <div>
            <Header />
            <div className="text-center text-5xl font-medium mt-10 mb-20">
                <h1>Kontakti</h1>
            </div>

            <div className="Kontakti">
                <div className="Kontakti-Left">
                    <div className="Kontakti-Block">
                        <div className="Kontakti-BlockText">
                            <p className="Kontakti-BlockTitle">Pasts</p>
                            <p className="Kontakti-BlockText">gymteam@gmail.com</p>
                        </div>

                        <div className="Kontakti-BlockLogo">
                            <MdOutlineMailOutline size={30} />
                        </div>
                    </div>

                    <div className="Kontakti-Block">
                        <div className="Kontakti-BlockText">
                            <p className="Kontakti-BlockTitle">Telefons</p>
                            <p className="Kontakti-BlockText">+371 27787949</p>
                            <p className="Kontakti-BlockText">Zvanu centra darba laiks:</p>
                            <p className="Kontakti-BlockText">Darba dienas: 8:00-21:00</p>
                            <p className="Kontakti-BlockText">Brīvdienas: 9:00-19:00</p>
                            <p className="Kontakti-BlockText">Svētku dienās: nestrādā</p>
                        </div>

                        <div className="Kontakti-BlockLogo">
                            <FaMobileAlt size={30} />
                        </div>
                    </div>

                    <div className="Kontakti-Block">
                        <div className="Kontakti-BlockText">
                            <p className="Kontakti-BlockTitle">Biroja adrese</p>
                            <p className="Kontakti-BlockText">Gustava Zemgala gatve 71</p>
                            <p className="Kontakti-BlockText">Rīga, LV-1039</p>
                            <p className="Kontakti-BlockText">Reg. NR. 40103878721</p>
                        </div>

                        <div className="Kontakti-BlockLogo">
                            <FaLocationDot size={30} />
                        </div>
                    </div>

                    <div className="Kontakti-Info">
                        <p className="Kontakti-BlockTitle">Trenažieru zāles darba laiks:</p>
                        <p className="Kontakti-BlockTitle">24/7 apmeklējumi</p>

                        <div className="Kontakti-Line" />

                        <p className="Kontakti-BlockTitle">Deniss Userdnijs</p>
                        <p className="Kontakti-BlockTitle">Vadītājs</p>
                        <p className="Kontakti-BlockTitle">userdnij@gmail.com</p>
                    </div>

                </div>

                <div className="Kontakti-Right">
                    <div className="flex">
                        <div style={{width: "35%", marginRight: "10%"}}>
                            <p className="mb-2">Vārds</p>
                            <input
                                className="Kontakti-InputHalf"
                                placeholder="Vārds"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div style={{width: "35%", marginRight: "10%"}}>
                            <p className="mb-2">Uzvārds</p>
                            <input
                                className="Kontakti-InputHalf"
                                placeholder="Uzvārds"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{width: "80%"}}>
                        <p className="mb-2">Epasts</p>
                        <input
                            className="Kontakti-Input"
                            placeholder="Epasts"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className="mb-2">Ziņojums</p>
                        <textarea
                            className="Kontakti-Textarea"
                            placeholder="Ziņojums"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    { renderSend() }
                </div>
            </div>
        </div>
    );
}