"use client";

import React, { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';


export default function QR() {
    const [res, setRes] = useState();
    const handleResult = (result) => {
        if (result) {
            try {
                const data = JSON.parse(result);
                console.log(data);

                axios.post('/api/qr', {
                    data: data
                })
                    .then((res) => {
                        if (res.data.message === 'Success') {
                            setRes('OK')
                        } else {
                            setRes('NO')
                        }


                        setTimeout(() => {
                            setRes(null)
                        }, 3000)
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const renderRes = () => {
        if (res === 'OK') {
            return (
                <h1 style={{color: "green"}}>OK</h1>
            )
        } else if (res === 'NO') {
            return (
                <h1 style={{color: "red"}}>NO</h1>
            )
        }
    }

    return (
        <div style={{height: "100%"}}>
            <Scanner
                onResult={(text, result) => handleResult(text)}
                onError={(error) => console.log(error?.message)}
                className="custom-scanner" // Add a custom class name for the scanner
                styles={{ container: {
                    position: 'initial',
                    paddingTop: '0px',
                }}}
            />
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: 300,
                color: "green",
                fontWeight: 800,
                transform: "translate(-50%, -50%)"
            }}>
                {renderRes()}
            </div>
        </div>
    );
}