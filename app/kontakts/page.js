"use client";

import { MdOutlineMailOutline } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import './Kontakts.scss';
import { useState } from "react";
import axios from "axios";

export default function Kontakts() {
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
            <HomeHeader />
            <div className="text-center text-5xl font-medium mt-10 mb-20">
                <h1>Kontakts</h1>
            </div>

            <div className="Kontakts">
                <div className="Kontakts-Left">
                    <div className="Kontakts-Block">
                        <div className="Kontakts-BlockText">
                            <p className="Kontakts-BlockTitle">Pasts</p>
                            <p className="Kontakts-BlockText">gymteam@gmail.com</p>
                        </div>

                        <div className="Kontakts-BlockLogo">
                            <MdOutlineMailOutline size={30} />
                        </div>
                    </div>

                    <div className="Kontakts-Block">
                        <div className="Kontakts-BlockText">
                            <p className="Kontakts-BlockTitle">Telefons</p>
                            <p className="Kontakts-BlockText">+371 27787949</p>
                            <p className="Kontakts-BlockText">Zvanu centra darba laiks:</p>
                            <p className="Kontakts-BlockText">Darba dienas: 8:00-21:00</p>
                            <p className="Kontakts-BlockText">Brīvdienas: 9:00-19:00</p>
                            <p className="Kontakts-BlockText">Svētku dienās: nestrādā</p>
                        </div>

                        <div className="Kontakts-BlockLogo">
                            <FaMobileAlt size={30} />
                        </div>
                    </div>

                    <div className="Kontakts-Block">
                        <div className="Kontakts-BlockText">
                            <p className="Kontakts-BlockTitle">Biroja adrese</p>
                            <p className="Kontakts-BlockText">Gustava Zemgala gatve 71</p>
                            <p className="Kontakts-BlockText">Rīga, LV-1039</p>
                            <p className="Kontakts-BlockText">Reg. NR. 40103878721</p>
                        </div>

                        <div className="Kontakts-BlockLogo">
                            <FaLocationDot size={30} />
                        </div>
                    </div>

                    <div className="Kontakts-Info">
                        <p className="Kontakts-BlockTitle">Trenažieru zāles darba laiks:</p>
                        <p className="Kontakts-BlockTitle">24/7 apmeklējumi</p>

                        <div className="Kontakts-Line" />

                        <p className="Kontakts-BlockTitle">Deniss Userdnijs</p>
                        <p className="Kontakts-BlockTitle">Vadītājs</p>
                        <p className="Kontakts-BlockTitle">userdnij@gmail.com</p>
                    </div>

                </div>

                <div className="Kontakts-Right">
                    <div className="flex">
                        <div style={{width: "35%", marginRight: "10%"}}>
                            <p className="mb-2">Vārds</p>
                            <input
                                className="Kontakts-InputHalf"
                                placeholder="Vārds"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div style={{width: "35%", marginRight: "10%"}}>
                            <p className="mb-2">Uzvārds</p>
                            <input
                                className="Kontakts-InputHalf"
                                placeholder="Uzvārds"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{width: "80%"}}>
                        <p className="mb-2">Epasts</p>
                        <input
                            className="Kontakts-Input"
                            placeholder="Epasts"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className="mb-2">Ziņojums</p>
                        <textarea
                            className="Kontakts-Textarea"
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