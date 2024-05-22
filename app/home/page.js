"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Header from "@/components/Header/Header";
import './Home.scss';
import Link from "next/link";

export default function Home() {
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, [])

    const fetchNews = async () => {
        axios.get('/api/news/get')
        .then((res) => {
            setNews(res.data.news);
        }).catch((error) => {
            console.log(error.message)
        });
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const renderNewsText = (text) => {
        return text.replace(/\n/g, '<br />');
    }

    const renderNews = () => {
        if (news.length === 0) return (<h1>Nav jaunumu</h1>);

        return news.map((news, index) => {
            return (
                <div key={index} className="HomePage-News">
                    <h1 className="text-center font-semibold text-xl mb-5">{news.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: renderNewsText(news.text) }} />
                    {/* <p>{news.text}</p> */}
                    <p className="HomePage-NewsDate">{formatDate(news.date)}</p>
                </div>
            )
        });
    }

    return (
        <div>
            <Header />
            <div className={`text-center text-5xl font-medium mt-10 mb-20 ${isMobile ? 'flex flex-col px-10' : ''}`} >
                <Link href='/abonementi' className="Button px-10 py-5">Nopirkt Abonementu</Link>
                <Link href='/trainings' className={`Button px-10 py-5 ${isMobile ? 'mt-10' : 'ml-20'}`}>Pierakstities Uz Treniņu</Link>
            </div>

            <div className={`HomePage ${isMobile ? 'flex flex-col' : ''}`}>
                { renderNews() }
            </div>
        </div>
    );
}